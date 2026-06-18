#!/usr/bin/env python3
"""Download official artwork to src/assets and publish to public/pokemon."""

from __future__ import annotations

import json
import shutil
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'src' / 'data' / 'pokemon.json'
SRC_DIR = ROOT / 'src' / 'assets' / 'pokemon' / 'artwork'
OUT_DIR = ROOT / 'public' / 'pokemon' / 'artwork'
REMOTE_BASE = (
	'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
)
UA = 'Mozilla/5.0 (compatible; tito-cafe/1.0)'


def download(url: str, dest: Path) -> None:
	req = urllib.request.Request(url, headers={'User-Agent': UA})
	with urllib.request.urlopen(req, timeout=60) as resp:
		dest.write_bytes(resp.read())


def collect_art_ids() -> list[int]:
	if not DATA.is_file():
		return list(range(1, 1026))
	rows = json.loads(DATA.read_text(encoding='utf-8'))
	ids: set[int] = set()
	for row in rows:
		ids.add(row.get('defaultArtId', row['id']))
		for variety in row.get('varieties', []):
			ids.add(variety['artId'])
	return sorted(ids)


def main() -> None:
	import sys

	download_missing = '--download' in sys.argv
	SRC_DIR.mkdir(parents=True, exist_ok=True)
	OUT_DIR.mkdir(parents=True, exist_ok=True)
	art_ids = collect_art_ids()
	downloaded = 0
	skipped = 0
	for art_id in art_ids:
		name = f'{art_id}.png'
		src = SRC_DIR / name
		if not src.is_file():
			if not download_missing:
				continue
			url = f'{REMOTE_BASE}/{art_id}.png'
			print(f'downloading {name}...')
			try:
				download(url, src)
				downloaded += 1
				time.sleep(0.04)
			except Exception as err:  # noqa: BLE001
				print(f'skip {name}: {err}')
				continue
		else:
			skipped += 1
		if src.is_file():
			shutil.copy2(src, OUT_DIR / name)
	print(
		f'Done: {downloaded} downloaded, {skipped} cached, '
		f'{len(art_ids)} ids tracked in public/pokemon/artwork/'
	)


if __name__ == '__main__':
	main()
