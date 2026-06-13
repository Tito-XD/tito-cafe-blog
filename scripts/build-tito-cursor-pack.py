#!/usr/bin/env python3
"""Generate Tito cursor preview assets and Windows install pack."""

from __future__ import annotations

import json
import struct
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'tito-cursor'
PREVIEW_DIR = OUT / 'previews'
CUR_DIR = OUT / 'pack' / 'Tito'
DOWNLOAD_DIR = OUT / 'downloads'

BLUE = (74, 144, 226, 255)
BLUE_DARK = (36, 90, 150, 255)
GREY = (160, 167, 177, 255)
GREY_DARK = (90, 98, 110, 255)
WHITE = (255, 255, 255, 255)
BLACK = (30, 34, 40, 255)
RED = (220, 70, 70, 255)
GREEN = (70, 180, 110, 255)
SKY = (93, 169, 255, 255)
TRANSPARENT = (0, 0, 0, 0)

CURSORS = [
	{
		'id': 'arrow',
		'file': 'arrow.cur',
		'name': '正常选择',
		'nameEn': 'Normal Select',
		'hotspot': (2, 2),
		'deco': 'arrow',
	},
	{
		'id': 'help',
		'file': 'help.cur',
		'name': '帮助选择',
		'nameEn': 'Help Select',
		'hotspot': (15, 15),
		'deco': 'help',
	},
	{
		'id': 'appstarting',
		'file': 'appstarting.ani',
		'name': '后台运行中',
		'nameEn': 'Working in Background',
		'hotspot': (15, 15),
		'deco': 'coffee',
		'animated': True,
	},
	{
		'id': 'wait',
		'file': 'wait.ani',
		'name': '忙碌',
		'nameEn': 'Busy',
		'hotspot': (15, 15),
		'deco': 'busy',
		'animated': True,
	},
	{
		'id': 'crosshair',
		'file': 'crosshair.cur',
		'name': '精确选择',
		'nameEn': 'Precision Select',
		'hotspot': (15, 15),
		'deco': 'crosshair',
	},
	{
		'id': 'ibeam',
		'file': 'ibeam.cur',
		'name': '文本选择',
		'nameEn': 'Text Select',
		'hotspot': (15, 15),
		'deco': 'ibeam',
	},
	{
		'id': 'nwpens',
		'file': 'nwpens.cur',
		'name': '手写',
		'nameEn': 'Handwriting',
		'hotspot': (4, 28),
		'deco': 'pen',
	},
	{
		'id': 'no',
		'file': 'no.cur',
		'name': '不可用',
		'nameEn': 'Unavailable',
		'hotspot': (15, 15),
		'deco': 'no',
	},
	{
		'id': 'sizens',
		'file': 'sizens.cur',
		'name': '垂直调整大小',
		'nameEn': 'Vertical Resize',
		'hotspot': (15, 15),
		'deco': 'ns',
	},
	{
		'id': 'sizewe',
		'file': 'sizewe.cur',
		'name': '水平调整大小',
		'nameEn': 'Horizontal Resize',
		'hotspot': (15, 15),
		'deco': 'we',
	},
	{
		'id': 'sizenwse',
		'file': 'sizenwse.cur',
		'name': '对角调整大小 1',
		'nameEn': 'Diagonal Resize 1',
		'hotspot': (15, 15),
		'deco': 'nwse',
	},
	{
		'id': 'sizenesw',
		'file': 'sizenesw.cur',
		'name': '对角调整大小 2',
		'nameEn': 'Diagonal Resize 2',
		'hotspot': (15, 15),
		'deco': 'nesw',
	},
	{
		'id': 'sizeall',
		'file': 'sizeall.cur',
		'name': '移动',
		'nameEn': 'Move',
		'hotspot': (15, 15),
		'deco': 'move',
	},
	{
		'id': 'uparrow',
		'file': 'uparrow.cur',
		'name': '备用选择',
		'nameEn': 'Alternate Select',
		'hotspot': (15, 4),
		'deco': 'up',
	},
	{
		'id': 'hand',
		'file': 'hand.cur',
		'name': '链接选择',
		'nameEn': 'Link Select',
		'hotspot': (10, 4),
		'deco': 'hand',
	},
	{
		'id': 'pin',
		'file': 'pin.cur',
		'name': '位置选择',
		'nameEn': 'Location Select',
		'hotspot': (15, 28),
		'deco': 'pin',
		'full': True,
	},
	{
		'id': 'person',
		'file': 'person.cur',
		'name': '人员选择',
		'nameEn': 'Person Select',
		'hotspot': (15, 28),
		'deco': 'person',
		'full': True,
	},
]


def draw_wolf_head(draw: ImageDraw.ImageDraw, cx: int, cy: int, scale: float = 1.0, full: bool = False) -> None:
	s = scale
	ear = int(5 * s)
	# ears
	draw.polygon(
		[
			(cx - int(8 * s), cy - int(6 * s)),
			(cx - int(12 * s), cy - int(14 * s)),
			(cx - int(4 * s), cy - int(10 * s)),
		],
		fill=BLUE,
	)
	draw.polygon(
		[
			(cx + int(8 * s), cy - int(6 * s)),
			(cx + int(12 * s), cy - int(14 * s)),
			(cx + int(4 * s), cy - int(10 * s)),
		],
		fill=BLUE,
	)
	# face
	draw.ellipse(
		(
			cx - int(11 * s),
			cy - int(10 * s),
			cx + int(11 * s),
			cy + int(10 * s),
		),
		fill=GREY,
	)
	draw.ellipse(
		(
			cx - int(9 * s),
			cy - int(8 * s),
			cx + int(9 * s),
			cy + int(8 * s),
		),
		fill=WHITE,
	)
	# eyes
	draw.ellipse((cx - int(5 * s), cy - int(2 * s), cx - int(2 * s), cy + int(1 * s)), fill=SKY)
	draw.ellipse((cx + int(2 * s), cy - int(2 * s), cx + int(5 * s), cy + int(1 * s)), fill=SKY)
	draw.ellipse((cx - int(4 * s), cy - int(1 * s), cx - int(3 * s), cy), fill=BLACK)
	draw.ellipse((cx + int(3 * s), cy - int(1 * s), cx + int(4 * s), cy), fill=BLACK)
	# nose
	draw.polygon(
		[
			(cx, cy + int(2 * s)),
			(cx - int(2 * s), cy + int(5 * s)),
			(cx + int(2 * s), cy + int(5 * s)),
		],
		fill=GREY_DARK,
	)
	if full:
		draw.rectangle(
			(
				cx - int(7 * s),
				cy + int(10 * s),
				cx + int(7 * s),
				cy + int(22 * s),
			),
			fill=GREY,
		)
		draw.rectangle(
			(
				cx - int(5 * s),
				cy + int(22 * s),
				cx - int(1 * s),
				cy + int(30 * s),
			),
			fill=GREY_DARK,
		)
		draw.rectangle(
			(
				cx + int(1 * s),
				cy + int(22 * s),
				cx + int(5 * s),
				cy + int(30 * s),
			),
			fill=GREY_DARK,
		)


def draw_deco(draw: ImageDraw.ImageDraw, deco: str, full: bool = False) -> None:
	if deco == 'arrow':
		draw.polygon([(2, 2), (2, 14), (6, 10), (10, 18), (14, 16), (10, 8), (16, 8)], fill=BLACK)
	if deco == 'help':
		draw.ellipse((22, 2, 30, 10), fill=SKY)
		draw.text((24, 3), '?', fill=WHITE)
	if deco == 'coffee':
		draw.rectangle((22, 6, 30, 12), fill=GREY_DARK)
		draw.rectangle((23, 4, 29, 6), fill=WHITE)
		draw.line((25, 2, 25, 4), fill=WHITE)
		draw.line((27, 2, 27, 4), fill=WHITE)
	if deco == 'busy':
		draw.ellipse((20, 2, 31, 11), fill=RED)
		draw.text((21, 2), '!!!', fill=WHITE)
	if deco == 'crosshair':
		draw.line((15, 4, 15, 28), fill=SKY)
		draw.line((4, 15, 28, 15), fill=SKY)
	if deco == 'ibeam':
		draw.rectangle((14, 6, 18, 26), fill=SKY)
	if deco == 'pen':
		draw.polygon([(4, 28), (8, 20), (12, 22), (8, 30)], fill=GREY_DARK)
	if deco == 'no':
		draw.ellipse((20, 4, 30, 14), fill=RED)
		draw.line((21, 5, 29, 13), fill=WHITE, width=2)
	if deco in ('ns', 'we', 'nwse', 'nesw', 'move', 'up'):
		color = SKY
		if deco == 'ns':
			draw.polygon([(15, 2), (11, 8), (19, 8)], fill=color)
			draw.polygon([(15, 30), (11, 24), (19, 24)], fill=color)
		if deco == 'we':
			draw.polygon([(2, 15), (8, 11), (8, 19)], fill=color)
			draw.polygon([(30, 15), (24, 11), (24, 19)], fill=color)
		if deco == 'nwse':
			draw.polygon([(4, 4), (10, 4), (4, 10)], fill=color)
			draw.polygon([(28, 28), (22, 28), (28, 22)], fill=color)
		if deco == 'nesw':
			draw.polygon([(28, 4), (28, 10), (22, 4)], fill=color)
			draw.polygon([(4, 28), (10, 28), (4, 22)], fill=color)
		if deco == 'move':
			for dx, dy in [(0, -8), (0, 8), (-8, 0), (8, 0)]:
				draw.polygon(
					[
						(15 + dx, 15 + dy),
						(15 + dx - 3, 15 + dy - 2),
						(15 + dx + 3, 15 + dy - 2),
					],
					fill=color,
				)
		if deco == 'up':
			draw.polygon([(15, 2), (9, 12), (21, 12)], fill=color)
	if deco == 'hand':
		draw.polygon([(10, 4), (10, 20), (14, 24), (18, 20), (18, 10), (16, 8), (14, 10), (14, 6), (12, 6)], fill=GREY)
	if deco == 'pin':
		draw.ellipse((22, 4, 30, 12), fill=SKY)
		draw.polygon([(26, 12), (24, 18), (28, 18)], fill=SKY)
	if deco == 'person':
		draw.ellipse((22, 4, 30, 12), fill=GREEN)
		draw.ellipse((24, 5, 28, 9), fill=WHITE)
		draw.rectangle((24, 10, 28, 14), fill=WHITE)


def render_cursor(meta: dict) -> Image.Image:
	img = Image.new('RGBA', (32, 32), TRANSPARENT)
	draw = ImageDraw.Draw(img)
	full = meta.get('full', False)
	draw_wolf_head(draw, 15, 14 if not full else 12, 1.0, full=full)
	draw_deco(draw, meta['deco'], full=full)
	return img


def png_to_cur(png: Image.Image, hotspot: tuple[int, int]) -> bytes:
	if png.mode != 'RGBA':
		png = png.convert('RGBA')
	w, h = png.size
	and_mask = Image.new('L', (w, h), 0)
	xor = Image.new('RGB', (w, h), (0, 0, 0))
	for y in range(h):
		for x in range(w):
			r, g, b, a = png.getpixel((x, y))
			if a < 128:
				and_mask.putpixel((x, y), 255)
				xor.putpixel((x, y), (0, 0, 0))
			else:
				and_mask.putpixel((x, y), 0)
				xor.putpixel((x, y), (r, g, b))

	bmp_header_size = 40
	xor_size = w * h * 4
	and_row = ((w + 31) // 32) * 4
	and_size = and_row * h
	image_size = bmp_header_size + xor_size + and_size
	offset = 6 + 16

	header = struct.pack('<HHH', 0, 1, 1)
	entry = struct.pack(
		'<BBBBHHII',
		w,
		h,
		0,
		0,
		hotspot[0],
		hotspot[1],
		image_size,
		offset,
	)

	bitmap_info = struct.pack(
		'<IIIHHIIIIII',
		bmp_header_size,
		w,
		h * 2,
		1,
		32,
		0,
		image_size - bmp_header_size,
		0,
		0,
		0,
		0,
	)

	xor_bytes = bytearray()
	for y in range(h - 1, -1, -1):
		for x in range(w):
			r, g, b = xor.getpixel((x, y))
			xor_bytes.extend([b, g, r, 0])

	and_bytes = bytearray()
	for y in range(h - 1, -1, -1):
		row = bytearray()
		for x in range(w):
			row.append(255 if and_mask.getpixel((x, y)) > 127 else 0)
		while len(row) % 4:
			row.append(0)
		and_bytes.extend(row)

	return header + entry + bitmap_info + bytes(xor_bytes) + bytes(and_bytes)


def write_install_inf(path: Path) -> None:
	mapping = [
		('Arrow', 'arrow.cur'),
		('Help', 'help.cur'),
		('AppStarting', 'appstarting.ani'),
		('Wait', 'wait.ani'),
		('Crosshair', 'crosshair.cur'),
		('IBeam', 'ibeam.cur'),
		('NWPen', 'nwpens.cur'),
		('No', 'no.cur'),
		('SizeNS', 'sizens.cur'),
		('SizeWE', 'sizewe.cur'),
		('SizeNWSE', 'sizenwse.cur'),
		('SizeNESW', 'sizenesw.cur'),
		('SizeAll', 'sizeall.cur'),
		('UpArrow', 'uparrow.cur'),
		('Hand', 'hand.cur'),
		('Pin', 'pin.cur'),
		('Person', 'person.cur'),
	]
	lines = [
		'[Version]',
		'signature="$CHICAGO$"',
		'',
		'[DefaultInstall]',
		'CopyFiles = Tito.Cursors',
		'AddReg = Tito.Reg',
		'',
		'[DestinationDirs]',
		'Tito.Cursors = 10,"%CURSOR_DIR%\\Tito"',
		'',
		'[Tito.Cursors]',
	]
	for _, fname in mapping:
		lines.append(fname)
	lines.extend(
		[
			'',
			'[Tito.Reg]',
			'HKCU,"Control Panel\\Cursors",,0x00020000,"%CURSOR_DIR%\\Tito"',
			'HKCU,"Control Panel\\Cursors",Scheme Source,0x00010003,2',
		]
	)
	for win_name, fname in mapping:
		lines.append(f'HKCU,"Control Panel\\Cursors",{win_name},0x00020000,"%CURSOR_DIR%\\Tito\\{fname}"')
	lines.extend(
		[
			'',
			'[Strings]',
			'CURSOR_DIR = "C:\\Windows\\Cursors"',
		]
	)
	path.write_text('\n'.join(lines) + '\n', encoding='utf-8')


def main() -> None:
	for d in (PREVIEW_DIR, CUR_DIR, DOWNLOAD_DIR, OUT / 'pack'):
		d.mkdir(parents=True, exist_ok=True)

	catalog = []
	for meta in CURSORS:
		img = render_cursor(meta)
		preview_path = PREVIEW_DIR / f'{meta["id"]}.png'
		img.save(preview_path)
		cur_bytes = png_to_cur(img, meta['hotspot'])
		cur_path = CUR_DIR / meta['file']
		if meta.get('animated'):
			# Static fallback for .ani slots
			cur_path = CUR_DIR / meta['file'].replace('.ani', '.cur')
		cur_path.write_bytes(cur_bytes)
		catalog.append(
			{
				'id': meta['id'],
				'name': meta['name'],
				'nameEn': meta['nameEn'],
				'preview': f'/tito-cursor/previews/{meta["id"]}.png',
				'hotspot': list(meta['hotspot']),
			}
		)

	write_install_inf(OUT / 'pack' / 'install.inf')

	zip_path = DOWNLOAD_DIR / 'Tito-cursor.zip'
	with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
		zf.write(OUT / 'pack' / 'install.inf', 'install.inf')
		for f in CUR_DIR.iterdir():
			zf.write(f, f'Tito/{f.name}')

	exe_path = DOWNLOAD_DIR / 'Tito-cursor.exe'
	if exe_path.exists() and exe_path.stat().st_size != zip_path.stat().st_size:
		print('Keeping existing Tito-cursor.exe (custom installer).')
	else:
		exe_path.unlink(missing_ok=True)

	(OUT / 'cursors.json').write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
	print(f'Built {len(catalog)} cursors -> {OUT}')


if __name__ == '__main__':
	main()
