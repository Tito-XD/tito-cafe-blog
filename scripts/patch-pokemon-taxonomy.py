#!/usr/bin/env python3
"""Patch pokemon.json with taxonomy fields used by dex filters."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POKEMON = ROOT / 'src' / 'data' / 'pokemon.json'
CHAINS = ROOT / 'src' / 'data' / 'pokemon-chains.json'

PARADOX = {
	984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995,
	1005, 1006, 1009, 1010, 1020, 1021, 1022, 1023,
}
PSEUDO = {149, 248, 373, 376, 445, 635, 706, 784, 887, 998}
ULTRA = {793, 794, 795, 796, 797, 798, 799, 803, 804, 805, 806}
BABY = {
	172, 173, 174, 175, 236, 238, 239, 240, 298, 360, 406, 433, 438, 439, 440,
	446, 447, 458,
}
FOSSIL = {
	138, 139, 140, 141, 142, 345, 346, 347, 348, 408, 409, 410, 411, 564, 565,
	566, 567, 696, 697, 698, 699, 880, 881, 882, 883,
}
STARTER_LINES = {
	1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	2: [152, 153, 154, 155, 156, 157, 158, 159, 160],
	3: [252, 253, 254, 255, 256, 257, 258, 259, 260],
	4: [387, 388, 389, 390, 391, 392, 393, 394, 395],
	5: [495, 496, 497, 498, 499, 500, 501, 502, 503],
	6: [650, 651, 652, 653, 654, 655, 656, 657, 658],
	7: [722, 723, 724, 725, 726, 727, 728, 729, 730],
	8: [810, 811, 812, 813, 814, 815, 816, 817, 818],
	9: [906, 907, 908, 909, 910, 911, 912, 913, 914],
}
STARTER_ID_TO_GEN: dict[int, int] = {}
for gen, ids in STARTER_LINES.items():
	for sid in ids:
		STARTER_ID_TO_GEN[sid] = gen

GEN_REGION = {
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


def variety_flags(slug: str) -> dict[str, bool]:
	return {
		'isMega': 'mega' in slug and 'gmax' not in slug,
		'isGmax': 'gmax' in slug,
		'isTotem': 'totem' in slug,
	}


def evolution_stage(chain: list[int], species_id: int) -> str:
	if species_id not in chain:
		return 'single'
	if len(chain) == 1:
		return 'single'
	index = chain.index(species_id)
	if index == 0:
		return 'basic'
	if index == len(chain) - 1:
		return 'final'
	return 'middle'


def main() -> None:
	rows = json.loads(POKEMON.read_text(encoding='utf-8'))
	chains = json.loads(CHAINS.read_text(encoding='utf-8'))
	stage_by_id: dict[int, str] = {}
	for chain in chains:
		for sid in chain:
			stage_by_id[sid] = evolution_stage(chain, sid)

	for row in rows:
		sid = row['id']
		gen = row.get('generation', 0)
		row['regionCn'] = GEN_REGION.get(gen, row.get('regionCn', ''))
		row['isParadox'] = sid in PARADOX
		row['isBaby'] = sid in BABY
		row['isPseudoLegendary'] = sid in PSEUDO
		row['isUltraBeast'] = sid in ULTRA
		row['isFossil'] = sid in FOSSIL
		row['isStarter'] = sid in STARTER_ID_TO_GEN
		row['starterGen'] = STARTER_ID_TO_GEN.get(sid, 0)
		row['evolutionStage'] = stage_by_id.get(sid, 'single')

		has_mega = False
		has_gmax = False
		has_totem = False
		for variety in row['varieties']:
			flags = variety_flags(variety['slug'])
			variety['isMega'] = flags['isMega']
			variety['isGmax'] = flags['isGmax']
			variety['isTotem'] = flags['isTotem']
			if flags['isMega']:
				has_mega = True
			if flags['isGmax']:
				has_gmax = True
			if flags['isTotem']:
				has_totem = True
		row['hasMega'] = has_mega
		row['hasGmax'] = has_gmax
		row['hasTotem'] = has_totem

	POKEMON.write_text(
		json.dumps(rows, ensure_ascii=False, separators=(',', ':')) + '\n',
		encoding='utf-8',
	)
	print(f'Patched taxonomy on {len(rows)} species')


if __name__ == '__main__':
	main()
