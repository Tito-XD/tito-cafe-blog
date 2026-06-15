#!/usr/bin/env python3
"""Generate src/data/pokemon151.json from PokeAPI (zh-hans names, types, weaknesses)."""

from __future__ import annotations

import json
import time
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'src' / 'data' / 'pokemon151.json'
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


def fetch(url: str) -> dict:
	req = urllib.request.Request(url, headers={'User-Agent': UA})
	with urllib.request.urlopen(req, timeout=30) as resp:
		return json.load(resp)


def type_cn(name: str) -> str:
	return TYPE_CN.get(name, name)


def load_type_chart() -> dict[str, dict[str, float]]:
	"""For each defending type, map attacking type -> damage multiplier."""
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


def main() -> None:
	print('Loading type chart from PokeAPI...')
	type_chart = load_type_chart()
	rows = []
	for i in range(1, 152):
		species = fetch(f'https://pokeapi.co/api/v2/pokemon-species/{i}')
		names = {n['language']['name']: n['name'] for n in species['names']}
		pokemon = fetch(f'https://pokeapi.co/api/v2/pokemon/{i}')
		types = [t['type']['name'] for t in pokemon['types']]
		weaknesses = pokemon_weaknesses(types, type_chart)
		rows.append(
			{
				'id': i,
				'nameEn': names.get('en', ''),
				'nameCn': names.get('zh-hans') or names.get('zh-hant') or '',
				'slug': pokemon['name'],
				'types': types,
				'typesCn': [type_cn(t) for t in types],
				'weaknesses': weaknesses,
				'weaknessesCn': [type_cn(w) for w in weaknesses],
			}
		)
		time.sleep(0.03)
	OUT.write_text(json.dumps(rows, ensure_ascii=False, indent='\t') + '\n', encoding='utf-8')
	print(f'Wrote {len(rows)} entries to {OUT}')


if __name__ == '__main__':
	main()
