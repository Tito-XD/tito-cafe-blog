#!/usr/bin/env python3
"""Sync Pokémon 30th anniversary logos from Serebii; build artId → key mapping."""

from __future__ import annotations

import html as html_lib
import json
import re
import shutil
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'src' / 'data' / 'pokemon.json'
OUT_KEYS = ROOT / 'src' / 'data' / 'pokemon30-art-keys.json'
SRC_DIR = ROOT / 'src' / 'assets' / 'pokemon30' / 'artwork'
OUT_DIR = ROOT / 'public' / 'pokemon30' / 'artwork'
PAGE_URL = 'https://www.serebii.net/pokemon30/'
REMOTE_BASE = 'https://www.serebii.net/pokemon30'
UA = 'Mozilla/5.0 (compatible; tito-cafe/1.0)'

REGION_SUFFIX = {
	'阿罗拉': '-a',
	'伽勒尔': '-g',
	'洗翠': '-h',
	'帕底亚': '-p',
}


def fetch_html() -> str:
	req = urllib.request.Request(PAGE_URL, headers={'User-Agent': UA})
	with urllib.request.urlopen(req, timeout=120) as resp:
		return resp.read().decode('utf-8', 'replace')


def scrape_alt_to_key(html: str) -> dict[str, str]:
	pattern = re.compile(
		r'data-key="([^"]+)"[^>]*><img[^>]+alt="([^"]*)"',
		re.IGNORECASE,
	)
	alt_to_key: dict[str, str] = {}
	for key, alt in pattern.findall(html):
		if not re.match(r'^\d', key):
			continue
		clean = html_lib.unescape(alt).strip()
		if clean:
			alt_to_key[clean.lower()] = key
	return alt_to_key


def alt_candidates(name_en: str, form_label_cn: str, is_regional: bool) -> list[str]:
	names = [name_en]
	if is_regional:
		for prefix in ('Alolan', 'Galarian', 'Hisuian', 'Paldean'):
			names.append(f'{prefix} {name_en}')
	names.extend([f'Male {name_en}', f'Female {name_en}'])
	return [name.lower() for name in names]


def heuristic_key(species_id: int, variety: dict) -> str:
	base = f'{species_id:03d}'
	if variety.get('isDefault'):
		return base
	label = variety.get('formLabelCn') or ''
	for region, suffix in REGION_SUFFIX.items():
		if label == region or label.startswith(region):
			return f'{base}{suffix}'
	return base


def build_art_key_map(alt_to_key: dict[str, str]) -> tuple[dict[int, str], set[str]]:
	rows = json.loads(DATA.read_text(encoding='utf-8'))
	by_art_id: dict[int, str] = {}
	keys_needed: set[str] = set()

	for species in rows:
		species_id = species['id']
		for variety in species.get('varieties', []):
			matched = None
			for alt in alt_candidates(
				variety['nameEn'],
				variety.get('formLabelCn', ''),
				variety.get('isRegional', False),
			):
				if alt in alt_to_key:
					matched = alt_to_key[alt]
					break
			key = matched or heuristic_key(species_id, variety)
			by_art_id[variety['artId']] = key
			keys_needed.add(key)

	return by_art_id, keys_needed


def download(url: str, dest: Path) -> None:
	req = urllib.request.Request(url, headers={'User-Agent': UA})
	with urllib.request.urlopen(req, timeout=60) as resp:
		dest.write_bytes(resp.read())


def main() -> None:
	import sys

	download_missing = '--download' in sys.argv
	print('Fetching Serebii Pokémon 30 page...')
	html = fetch_html()
	alt_to_key = scrape_alt_to_key(html)
	by_art_id, keys_needed = build_art_key_map(alt_to_key)

	OUT_KEYS.write_text(
		json.dumps({'byArtId': by_art_id}, ensure_ascii=False, indent=2) + '\n',
		encoding='utf-8',
	)
	print(
		f'Wrote {len(by_art_id)} mappings to {OUT_KEYS.relative_to(ROOT)} '
		f'({len(keys_needed)} unique logo keys)'
	)

	SRC_DIR.mkdir(parents=True, exist_ok=True)
	OUT_DIR.mkdir(parents=True, exist_ok=True)
	downloaded = 0
	cached = 0
	published = 0
	for key in sorted(keys_needed):
		filename = f'{key}.png'
		src = SRC_DIR / filename
		if not src.is_file():
			if not download_missing:
				continue
			url = f'{REMOTE_BASE}/{key}.png'
			print(f'downloading {filename}...')
			try:
				download(url, src)
				downloaded += 1
				time.sleep(0.05)
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
