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

# PokeAPI damage_relations.double_damage_from (for TYPE_CN keys only)
TYPE_WEAKNESS: dict[str, list[str]] = {
	'normal': ['fighting'],
	'fire': ['water', 'ground', 'rock'],
	'water': ['grass', 'electric'],
	'electric': ['ground'],
	'grass': ['fire', 'ice', 'poison', 'flying', 'bug'],
	'ice': ['fire', 'fighting', 'rock', 'steel'],
	'fighting': ['flying', 'psychic', 'fairy'],
	'poison': ['ground', 'psychic'],
	'ground': ['water', 'grass', 'ice'],
	'flying': ['rock', 'electric', 'ice'],
	'psychic': ['bug', 'ghost', 'dark'],
	'bug': ['fire', 'flying', 'rock'],
	'rock': ['water', 'grass', 'fighting', 'ground', 'steel'],
	'ghost': ['ghost', 'dark'],
	'dragon': ['ice', 'dragon', 'fairy'],
	'dark': ['fighting', 'bug', 'fairy'],
	'steel': ['fire', 'fighting', 'ground'],
	'fairy': ['poison', 'steel'],
}


def fetch(url: str) -> dict:
	req = urllib.request.Request(url, headers={'User-Agent': UA})
	with urllib.request.urlopen(req, timeout=30) as resp:
		return json.load(resp)


def type_cn(name: str) -> str:
	return TYPE_CN.get(name, name)


def pokemon_weaknesses(types: list[str]) -> list[str]:
	weak: set[str] = set()
	for t in types:
		weak.update(TYPE_WEAKNESS.get(t, []))
	return sorted(weak)


def main() -> None:
	rows = []
	for i in range(1, 152):
		species = fetch(f'https://pokeapi.co/api/v2/pokemon-species/{i}')
		names = {n['language']['name']: n['name'] for n in species['names']}
		pokemon = fetch(f'https://pokeapi.co/api/v2/pokemon/{i}')
		types = [t['type']['name'] for t in pokemon['types']]
		weaknesses = pokemon_weaknesses(types)
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
