#!/usr/bin/env python3
"""Download Gen 1 official artwork to src/assets and publish to public/pokemon151."""

from __future__ import annotations

import shutil
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / 'src' / 'assets' / 'pokemon151' / 'artwork'
OUT_DIR = ROOT / 'public' / 'pokemon151' / 'artwork'
REMOTE_BASE = (
	'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
)
UA = 'Mozilla/5.0 (compatible; tito-cafe/1.0)'


def download(url: str, dest: Path) -> None:
	req = urllib.request.Request(url, headers={'User-Agent': UA})
	with urllib.request.urlopen(req, timeout=60) as resp:
		dest.write_bytes(resp.read())


def main() -> None:
	SRC_DIR.mkdir(parents=True, exist_ok=True)
	OUT_DIR.mkdir(parents=True, exist_ok=True)
	downloaded = 0
	skipped = 0
	for i in range(1, 152):
		name = f'{i}.png'
		src = SRC_DIR / name
		if not src.is_file():
			url = f'{REMOTE_BASE}/{i}.png'
			print(f'downloading {name}...')
			download(url, src)
			downloaded += 1
			time.sleep(0.05)
		else:
			skipped += 1
		shutil.copy2(src, OUT_DIR / name)
	print(
		f'Done: {downloaded} downloaded, {skipped} cached in assets, '
		f'151 files in public/pokemon151/artwork/'
	)


if __name__ == '__main__':
	main()
