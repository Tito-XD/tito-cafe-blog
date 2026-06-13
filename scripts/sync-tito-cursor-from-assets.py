#!/usr/bin/env python3
"""Sync Tito cursor pack from src/assets/cursor into public/tito-cursor."""

from __future__ import annotations

import json
import struct
import zipfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src' / 'assets' / 'cursor'
OUT = ROOT / 'public' / 'tito-cursor'
PREVIEW_DIR = OUT / 'previews'
PACK_DIR = OUT / 'pack'
DOWNLOAD_DIR = OUT / 'downloads'

CURSOR_ROWS = [
	('arrow', 'Normal.cur', '正常选择', 'Normal Select', 'Arrow'),
	('help', 'Help.cur', '帮助选择', 'Help Select', 'Help'),
	('appstarting', 'Working.cur', '后台运行中', 'Working in Background', 'AppStarting'),
	('wait', 'Busy.cur', '忙碌', 'Busy', 'Wait'),
	('crosshair', 'Precision.cur', '精确选择', 'Precision Select', 'Crosshair'),
	('ibeam', 'Text.cur', '文本选择', 'Text Select', 'IBeam'),
	('nwpens', 'Handwriting.cur', '手写', 'Handwriting', 'NWPen'),
	('no', 'Unavailable.cur', '不可用', 'Unavailable', 'No'),
	('sizens', 'Vertical.cur', '垂直调整大小', 'Vertical Resize', 'SizeNS'),
	('sizewe', 'Horizontal.cur', '水平调整大小', 'Horizontal Resize', 'SizeWE'),
	('sizenwse', 'Diagonal1.cur', '对角调整大小 1', 'Diagonal Resize 1', 'SizeNWSE'),
	('sizenesw', 'Diagonal2.cur', '对角调整大小 2', 'Diagonal Resize 2', 'SizeNESW'),
	('sizeall', 'Move.cur', '移动', 'Move', 'SizeAll'),
	('uparrow', 'Alternate.cur', '备用选择', 'Alternate Select', 'UpArrow'),
	('hand', 'Link.cur', '链接选择', 'Link Select', 'Hand'),
	('pin', 'Pin.cur', '位置选择', 'Location Select', 'Pin'),
	('person', 'Person.cur', '人员选择', 'Person Select', 'Person'),
]


def cur_to_image_and_hotspot(data: bytes) -> tuple[Image.Image, tuple[int, int]]:
	offset = 6
	w, h, _, _, hx, hy, _, image_offset = struct.unpack_from('<BBBBHHII', data, offset)
	bi_offset = image_offset
	bi_size, bi_w, bi_h = struct.unpack_from('<III', data, bi_offset)
	_, bpp = struct.unpack_from('<HH', data, bi_offset + 12)
	pixel_h = bi_h // 2
	bpp = bpp or 32
	bytes_per_pixel = max(1, bpp // 8)
	xor_size = bi_w * pixel_h * bytes_per_pixel
	and_row = ((bi_w + 31) // 32) * 4
	xor_start = bi_offset + bi_size
	and_start = xor_start + xor_size
	xor_bytes = data[xor_start:xor_start + xor_size]
	and_bytes = data[and_start:and_start + and_row * pixel_h]

	img = Image.new('RGBA', (bi_w, pixel_h), (0, 0, 0, 0))
	for y in range(pixel_h):
		src_y = pixel_h - 1 - y
		for x in range(bi_w):
			if bpp == 32:
				i = (src_y * bi_w + x) * 4
				b, g, r = xor_bytes[i], xor_bytes[i + 1], xor_bytes[i + 2]
			elif bpp == 16:
				i = (src_y * bi_w + x) * 2
				px = xor_bytes[i] | (xor_bytes[i + 1] << 8)
				r = ((px >> 11) & 0x1f) * 255 // 31
				g = ((px >> 5) & 0x3f) * 255 // 63
				b = (px & 0x1f) * 255 // 31
			else:
				r, g, b = 255, 255, 255

			and_byte = and_bytes[(pixel_h - 1 - y) * and_row + x // 8]
			and_bit = (and_byte >> (7 - (x % 8))) & 1
			if and_bit:
				img.putpixel((x, y), (0, 0, 0, 0))
			else:
				img.putpixel((x, y), (r, g, b, 255))

	return img, (hx, hy)


def build_preview_sheet(preview_paths: list[Path]) -> None:
	cols, rows = 5, 4
	cell = 96
	pad = 16
	sheet = Image.new('RGBA', (cols * cell + pad * 2, rows * cell + pad * 2), (245, 247, 250, 255))
	for i, path in enumerate(preview_paths):
		im = Image.open(path).convert('RGBA')
		im = im.resize((64, 64), Image.Resampling.NEAREST)
		x = pad + (i % cols) * cell + (cell - 64) // 2
		y = pad + (i // cols) * cell + (cell - 64) // 2
		sheet.paste(im, (x, y), im)
	sheet.save(OUT / 'preview-sheet.png')


def main() -> None:
	zip_src = SRC / 'Tito-Cursor.zip'
	exe_src = SRC / 'Tito-Cursor.exe'
	if not zip_src.is_file():
		raise SystemExit(f'Missing source zip: {zip_src}')

	for d in (PREVIEW_DIR, PACK_DIR, DOWNLOAD_DIR):
		d.mkdir(parents=True, exist_ok=True)

	# Downloads
	import shutil

	shutil.copy2(zip_src, DOWNLOAD_DIR / 'Tito-Cursor.zip')
	if exe_src.is_file():
		shutil.copy2(exe_src, DOWNLOAD_DIR / 'Tito-Cursor.exe')

	# Legacy filenames used on the showcase page
	shutil.copy2(zip_src, DOWNLOAD_DIR / 'Tito-cursor.zip')
	if exe_src.is_file():
		shutil.copy2(exe_src, DOWNLOAD_DIR / 'Tito-cursor.exe')

	# Extract pack
	with zipfile.ZipFile(zip_src) as zf:
		zf.extractall(PACK_DIR)

	catalog = []
	preview_paths: list[Path] = []

	with zipfile.ZipFile(zip_src) as zf:
		for id_, cur_name, name_cn, name_en, _ in CURSOR_ROWS:
			data = zf.read(cur_name)
			img, hotspot = cur_to_image_and_hotspot(data)
			preview_path = PREVIEW_DIR / f'{id_}.png'
			img.save(preview_path)
			preview_paths.append(preview_path)
			catalog.append(
				{
					'id': id_,
					'name': name_cn,
					'nameEn': name_en,
					'preview': f'/tito-cursor/previews/{id_}.png',
					'hotspot': [hotspot[0], hotspot[1]],
					'file': cur_name,
				}
			)

	build_preview_sheet(preview_paths)
	(OUT / 'cursors.json').write_text(
		json.dumps(catalog, ensure_ascii=False, indent='\t') + '\n',
		encoding='utf-8',
	)
	print(f'Synced {len(catalog)} cursors from {zip_src}')


if __name__ == '__main__':
	main()
