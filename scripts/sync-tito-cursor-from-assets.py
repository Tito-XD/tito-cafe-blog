#!/usr/bin/env python3
"""Publish Tito cursor showcase assets from src/assets/cursor to public/tito-cursor."""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src' / 'assets' / 'cursor'
OUT = ROOT / 'public' / 'tito-cursor'
DOWNLOAD = OUT / 'downloads'

FILES = {
	'Tito-Cursor-Preview.png': OUT / 'preview.png',
	'Tito-Cursor.zip': DOWNLOAD / 'Tito-Cursor.zip',
	'Tito-Cursor.exe': DOWNLOAD / 'Tito-Cursor.exe',
	'SoftCursor-1.0.zip': DOWNLOAD / 'SoftCursor-1.0.zip',
}


def main() -> None:
	DOWNLOAD.mkdir(parents=True, exist_ok=True)
	for name, dest in FILES.items():
		src = SRC / name
		if not src.is_file():
			raise SystemExit(f'Missing source file: {src}')
		shutil.copy2(src, dest)
		print(f'copied {name} -> {dest.relative_to(ROOT)}')


if __name__ == '__main__':
	main()
