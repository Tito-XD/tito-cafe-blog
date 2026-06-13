#!/usr/bin/env python3
"""Import local Tito cursor installer files into public/tito-cursor/downloads."""

from __future__ import annotations

import shutil
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOWNLOAD = ROOT / 'public' / 'tito-cursor' / 'downloads'
PACK = ROOT / 'public' / 'tito-cursor' / 'pack'


def usage() -> None:
	print('Usage: python3 scripts/import-tito-cursor-local.py <zip-path> [exe-path]')
	print('Example: python3 scripts/import-tito-cursor-local.py "/path/Tito 光标.zip" "/path/Tito 光标.exe"')


def main() -> None:
	if len(sys.argv) < 2:
		usage()
		sys.exit(1)

	zip_src = Path(sys.argv[1]).expanduser()
	exe_src = Path(sys.argv[2]).expanduser() if len(sys.argv) > 2 else None

	if not zip_src.is_file():
		print(f'Missing zip: {zip_src}')
		sys.exit(1)

	DOWNLOAD.mkdir(parents=True, exist_ok=True)
	shutil.copy2(zip_src, DOWNLOAD / 'Tito-cursor.zip')

	if exe_src and exe_src.is_file():
		shutil.copy2(exe_src, DOWNLOAD / 'Tito-cursor.exe')
	else:
		shutil.copy2(zip_src, DOWNLOAD / 'Tito-cursor.exe')

	# Optional: unpack for inspection / cur extraction
	try:
		with zipfile.ZipFile(zip_src) as zf:
			zf.extractall(PACK)
		print(f'Extracted archive to {PACK}')
	except zipfile.BadZipFile:
		print('Zip is not a plain archive (maybe installer-only); downloads copied only.')

	print('Imported downloads to public/tito-cursor/downloads/')


if __name__ == '__main__':
	main()
