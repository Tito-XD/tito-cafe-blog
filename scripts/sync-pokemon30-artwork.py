#!/usr/bin/env python3
"""Sync Pokémon 30th anniversary logos from the official Pokémon Japan site."""

from __future__ import annotations

import json
import shutil
import time
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'src' / 'data' / 'pokemon.json'
OUT_KEYS = ROOT / 'src' / 'data' / 'pokemon30-art-keys.json'
OUT_INDEX = ROOT / 'src' / 'data' / 'pokemon30-official-index.json'
SRC_DIR = ROOT / 'src' / 'assets' / 'pokemon30' / 'artwork'
OUT_DIR = ROOT / 'public' / 'pokemon30' / 'artwork'
OFFICIAL_DATA_URL = 'https://www.pokemon.co.jp/ex/30th_logo/assets/json/data.json'
REMOTE_BASE = 'https://www.pokemon.co.jp/ex/30th_logo/assets/img/download'
UA = 'Mozilla/5.0 (compatible; tito-cafe/1.0)'

REGION_MARKERS = {
	'阿罗拉': 'アローラ',
	'伽勒尔': 'ガーラル',
	'洗翠': 'ヒスイ',
	'帕底亚': 'パルデア',
}


def fetch_json(url: str) -> list[dict]:
	req = urllib.request.Request(url, headers={'User-Agent': UA})
	with urllib.request.urlopen(req, timeout=120) as resp:
		return json.loads(resp.read().decode('utf-8'))


def download(url: str, dest: Path) -> None:
	req = urllib.request.Request(url, headers={'User-Agent': UA})
	with urllib.request.urlopen(req, timeout=60) as resp:
		dest.write_bytes(resp.read())


def group_official_entries(rows: list[dict]) -> dict[int, list[dict]]:
	grouped: dict[int, list[dict]] = defaultdict(list)
	for row in rows:
		grouped[row['No']].append(row)
	return grouped


def match_varieties_to_files(species: dict, official_entries: list[dict]) -> dict[int, str]:
	by_art_id: dict[int, str] = {}
	default_entry = next((row for row in official_entries if row.get('branch') is None), None)
	default_file = default_entry['file'] if default_entry else f'{species["id"]:04d}'

	for variety in species.get('varieties', []):
		if variety.get('isDefault'):
			by_art_id[variety['artId']] = default_file

	non_default_official = [row for row in official_entries if row.get('branch') is not None]
	non_default_varieties = [v for v in species.get('varieties', []) if not v.get('isDefault')]

	matched_official: set[str] = set()
	unmatched_varieties: list[dict] = []

	for variety in non_default_varieties:
		label = variety.get('formLabelCn') or ''
		matched = False
		for region, marker in REGION_MARKERS.items():
			if label != region and not label.startswith(region):
				continue
			for entry in non_default_official:
				sub_name = entry.get('sub_name') or ''
				if marker in sub_name and entry['file'] not in matched_official:
					by_art_id[variety['artId']] = entry['file']
					matched_official.add(entry['file'])
					matched = True
					break
			if matched:
				break
		if not matched:
			unmatched_varieties.append(variety)

	remaining_official = sorted(
		[row for row in non_default_official if row['file'] not in matched_official],
		key=lambda row: row.get('branch') or 0,
	)
	unmatched_varieties.sort(key=lambda row: row['artId'])

	for variety, entry in zip(unmatched_varieties, remaining_official, strict=False):
		by_art_id[variety['artId']] = entry['file']

	for variety in unmatched_varieties[len(remaining_official):]:
		by_art_id[variety['artId']] = default_file

	return by_art_id


def build_art_key_map(official_rows: list[dict]) -> tuple[dict[int, str], set[str]]:
	grouped = group_official_entries(official_rows)
	species_rows = json.loads(DATA.read_text(encoding='utf-8'))
	by_art_id: dict[int, str] = {}
	files_needed: set[str] = set()

	for species in species_rows:
		entries = grouped.get(species['id'], [])
		mapped = match_varieties_to_files(species, entries)
		by_art_id.update(mapped)
		files_needed.update(mapped.values())

	return by_art_id, files_needed


def main() -> None:
	import sys

	download_missing = '--download' in sys.argv
	print('Fetching official Pokémon 30th logo index...')
	official_rows = fetch_json(OFFICIAL_DATA_URL)
	OUT_INDEX.write_text(
		json.dumps(official_rows, ensure_ascii=False, indent=2) + '\n',
		encoding='utf-8',
	)
	print(f'Cached {len(official_rows)} official entries to {OUT_INDEX.relative_to(ROOT)}')

	by_art_id, files_needed = build_art_key_map(official_rows)
	OUT_KEYS.write_text(
		json.dumps(
			{
				'source': 'pokemon.co.jp',
				'remoteBase': REMOTE_BASE,
				'byArtId': by_art_id,
			},
			ensure_ascii=False,
			indent=2,
		) + '\n',
		encoding='utf-8',
	)
	print(
		f'Wrote {len(by_art_id)} mappings to {OUT_KEYS.relative_to(ROOT)} '
		f'({len(files_needed)} unique logo files)'
	)

	SRC_DIR.mkdir(parents=True, exist_ok=True)
	OUT_DIR.mkdir(parents=True, exist_ok=True)
	downloaded = 0
	cached = 0
	published = 0
	for file_stem in sorted(files_needed):
		filename = f'{file_stem}.png'
		src = SRC_DIR / filename
		if not src.is_file():
			if not download_missing:
				continue
			url = f'{REMOTE_BASE}/{filename}'
			print(f'downloading {filename}...')
			try:
				download(url, src)
				downloaded += 1
				time.sleep(0.04)
			except Exception as err:  # noqa: BLE001
				print(f'skip {filename}: {err}')
				continue
		else:
			cached += 1
		if src.is_file():
			shutil.copy2(src, OUT_DIR / filename)
			published += 1

	print(
		f'Done: {downloaded} downloaded, {cached} cached, '
		f'{published} files in public/pokemon30/artwork/'
	)


if __name__ == '__main__':
	main()
