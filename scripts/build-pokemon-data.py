#!/usr/bin/env python3
"""Generate src/data/pokemon.json and pokemon-chains.json from PokeAPI."""

from __future__ import annotations

import json
import re
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'src' / 'data' / 'pokemon.json'
CHAINS_OUT = ROOT / 'src' / 'data' / 'pokemon-chains.json'
MAX_SPECIES_ID = 1025
UA = 'Mozilla/5.0 (compatible; tito-cafe/1.0)'

TYPE_CN: dict[str, str] = {
	'normal': '一般',
	'fire': '火',
	'water': '水',
	'electric': '电',
	'grass': '草',
	'ice': '冰',
	'fighting': '格斗',
	'poison': '毒',
	'ground': '地',
	'flying': '飞',
	'psychic': '超能',
	'bug': '虫',
	'rock': '岩',
	'ghost': '幽灵',
	'dragon': '龙',
	'dark': '恶',
	'steel': '钢',
	'fairy': '妖',
}

TYPE_NAMES = list(TYPE_CN.keys())

REGIONAL_MARKERS = ('alola', 'galar', 'paldea', 'hisui')

GENERATION_RANGES: dict[int, tuple[int, int]] = {
	1: (1, 151),
	2: (152, 251),
	3: (252, 386),
	4: (387, 493),
	5: (494, 649),
	6: (650, 721),
	7: (722, 809),
	8: (810, 905),
	9: (906, 1025),
}

GENERATION_HOME_REGION_CN: dict[int, str] = {
	1: '关都',
	2: '城都',
	3: '丰缘',
	4: '神奥',
	5: '合众',
	6: '卡洛斯',
	7: '阿罗拉',
	8: '伽勒尔',
	9: '帕底亚',
}

PARADOX_SPECIES_IDS = frozenset(
	{
		984,
		985,
		986,
		987,
		988,
		989,
		990,
		991,
		992,
		993,
		994,
		995,
		1005,
		1006,
		1009,
		1010,
		1020,
		1021,
		1022,
		1023,
	},
)


def fetch(url: str) -> dict:
	req = urllib.request.Request(url, headers={'User-Agent': UA})
	with urllib.request.urlopen(req, timeout=60) as resp:
		return json.load(resp)


def type_cn(name: str) -> str:
	return TYPE_CN.get(name, name)


def species_id_from_url(url: str) -> int:
	return int(url.rstrip('/').split('/')[-1])


def generation_for_id(species_id: int) -> int:
	for gen, (lo, hi) in GENERATION_RANGES.items():
		if lo <= species_id <= hi:
			return gen
	return 0


def load_type_chart() -> dict[str, dict[str, float]]:
	chart: dict[str, dict[str, float]] = {}
	for def_type in TYPE_NAMES:
		data = fetch(f'https://pokeapi.co/api/v2/type/{def_type}')
		multipliers = {name: 1.0 for name in TYPE_NAMES}
		for entry in data['damage_relations']['no_damage_from']:
			name = entry['name']
			if name in multipliers:
				multipliers[name] = 0.0
		for entry in data['damage_relations']['half_damage_from']:
			name = entry['name']
			if name in multipliers:
				multipliers[name] = 0.5
		for entry in data['damage_relations']['double_damage_from']:
			name = entry['name']
			if name in multipliers:
				multipliers[name] = 2.0
		chart[def_type] = multipliers
		time.sleep(0.02)
	return chart


def pokemon_weaknesses(types: list[str], chart: dict[str, dict[str, float]]) -> list[str]:
	weaknesses: list[str] = []
	for attack_type in TYPE_NAMES:
		multiplier = 1.0
		for def_type in types:
			multiplier *= chart[def_type].get(attack_type, 1.0)
		if multiplier >= 2.0:
			weaknesses.append(attack_type)
	return weaknesses


def localized_names(names: list[dict]) -> dict[str, str]:
	return {n['language']['name']: n['name'] for n in names}


def localized_genera(genera: list[dict]) -> dict[str, str]:
	return {g['language']['name']: g['genus'] for g in genera}


def form_label_cn(slug: str, is_regional: bool) -> str:
	if is_regional:
		if 'alola' in slug:
			return '阿罗拉'
		if 'galar' in slug:
			return '伽勒尔'
		if 'paldea' in slug:
			return '帕底亚'
		if 'hisui' in slug:
			return '洗翠'
		return '地区'
	parts = slug.split('-')
	if len(parts) <= 1:
		return ''
	tail = parts[-1]
	if tail in ('mega', 'gmax', 'totem', 'busted', 'dusk', 'midday', 'midnight', 'dawn'):
		label_map = {
			'mega': '超级',
			'gmax': '超极巨',
			'totem': '霸主',
			'busted': '现形',
			'dusk': '黄昏',
			'midday': '白昼',
			'midnight': '黑夜',
			'dawn': '黎明',
		}
		return label_map.get(tail, tail)
	return ''


def is_regional_slug(slug: str) -> bool:
	return any(marker in slug for marker in REGIONAL_MARKERS)


def form_key_from_slug(slug: str, default_slug: str) -> str:
	if slug == default_slug:
		return 'default'
	if slug.startswith(default_slug + '-'):
		return slug[len(default_slug) + 1:]
	return slug


def build_variety(
	species_names: dict[str, str],
	pokemon: dict,
	default_slug: str,
	chart: dict[str, dict[str, float]],
) -> dict:
	slug = pokemon['name']
	types = [t['type']['name'] for t in pokemon['types']]
	weaknesses = pokemon_weaknesses(types, chart)
	is_regional = is_regional_slug(slug)
	pokemon_names = localized_names(pokemon['names']) if pokemon.get('names') else {}
	name_cn = (
		pokemon_names.get('zh-hans')
		or pokemon_names.get('zh-hant')
		or species_names.get('zh-hans')
		or species_names.get('zh-hant')
		or ''
	)
	name_en = pokemon_names.get('en') or species_names.get('en') or slug
	form_key = form_key_from_slug(slug, default_slug)
	return {
		'formKey': form_key,
		'artId': pokemon['id'],
		'slug': slug,
		'nameCn': name_cn,
		'nameEn': name_en,
		'formLabelCn': form_label_cn(slug, is_regional),
		'isRegional': is_regional,
		'isDefault': slug == default_slug,
		'types': types,
		'typesCn': [type_cn(t) for t in types],
		'weaknesses': weaknesses,
		'weaknessesCn': [type_cn(w) for w in weaknesses],
	}


def flatten_evolution_chain(node: dict) -> list[int]:
	ids: list[int] = []
	sid = species_id_from_url(node['species']['url'])
	if sid <= MAX_SPECIES_ID:
		ids.append(sid)
	for child in node.get('evolves_to', []):
		ids.extend(flatten_evolution_chain(child))
	return ids


def build_evolution_chains(chain_urls: set[str]) -> list[list[int]]:
	cache: dict[str, list[int]] = {}
	for url in sorted(chain_urls):
		data = fetch(url)
		cache[url] = flatten_evolution_chain(data['chain'])
		time.sleep(0.04)
	chains = sorted(cache.values(), key=lambda row: row[0])
	all_ids: list[int] = []
	for row in chains:
		all_ids.extend(row)
	expected = list(range(1, MAX_SPECIES_ID + 1))
	if sorted(all_ids) != expected:
		missing = set(expected) - set(all_ids)
		extra = set(all_ids) - set(expected)
		raise SystemExit(f'Evolution chain mismatch. missing={missing} extra={extra}')
	return chains


def main() -> None:
	print('Loading type chart from PokeAPI...')
	type_chart = load_type_chart()
	rows: list[dict] = []
	chain_urls: set[str] = set()

	for species_id in range(1, MAX_SPECIES_ID + 1):
		species = fetch(f'https://pokeapi.co/api/v2/pokemon-species/{species_id}')
		chain_urls.add(species['evolution_chain']['url'])
		species_names = localized_names(species['names'])
		genera = localized_genera(species['genera'])
		default_variety = next(
			(v for v in species['varieties'] if v.get('is_default')),
			species['varieties'][0],
		)
		default_pokemon = fetch(default_variety['pokemon']['url'])
		default_slug = default_pokemon['name']
		types = [t['type']['name'] for t in default_pokemon['types']]
		weaknesses = pokemon_weaknesses(types, type_chart)
		varieties: list[dict] = []

		for variety in species['varieties']:
			pokemon = fetch(variety['pokemon']['url'])
			varieties.append(
				build_variety(species_names, pokemon, default_slug, type_chart),
			)
			time.sleep(0.02)

		has_regional = any(v['isRegional'] for v in varieties)
		has_alt_forms = len(varieties) > 1
		default_variety = next(v for v in varieties if v['isDefault'])

		gen = generation_for_id(species_id)
		rows.append(
			{
				'id': species_id,
				'nameEn': species_names.get('en', ''),
				'nameCn': species_names.get('zh-hans') or species_names.get('zh-hant') or '',
				'nameJa': species_names.get('ja', ''),
				'genusCn': genera.get('zh-hans') or genera.get('zh-hant') or genera.get('en') or '',
				'slug': default_slug,
				'types': default_variety['types'],
				'typesCn': default_variety['typesCn'],
				'weaknesses': default_variety['weaknesses'],
				'weaknessesCn': default_variety['weaknessesCn'],
				'generation': gen,
				'regionCn': GENERATION_HOME_REGION_CN.get(gen, ''),
				'isLegendary': species.get('is_legendary', False),
				'isMythical': species.get('is_mythical', False),
				'isParadox': species_id in PARADOX_SPECIES_IDS,
				'hasAltForms': has_alt_forms,
				'hasRegionalForm': has_regional,
				'defaultArtId': default_variety['artId'],
				'varieties': varieties,
			},
		)
		time.sleep(0.02)
		if species_id % 50 == 0:
			print(f'  ... species {species_id}/{MAX_SPECIES_ID}')

	OUT.write_text(
		json.dumps(rows, ensure_ascii=False, separators=(',', ':')) + '\n',
		encoding='utf-8',
	)
	print(f'Wrote {len(rows)} species to {OUT}')

	print('Building evolution chains...')
	chains = build_evolution_chains(chain_urls)
	CHAINS_OUT.write_text(
		json.dumps(chains, ensure_ascii=False, separators=(',', ':')) + '\n',
		encoding='utf-8',
	)
	print(f'Wrote {len(chains)} chains to {CHAINS_OUT}')


if __name__ == '__main__':
	main()
