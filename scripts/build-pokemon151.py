#!/usr/bin/env python3
"""Generate src/data/pokemon151.json from PokeAPI (zh-hans names)."""

from __future__ import annotations

import json
import time
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'src' / 'data' / 'pokemon151.json'
UA = 'Mozilla/5.0 (compatible; tito-cafe/1.0)'


def fetch(url: str) -> dict:
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def main() -> None:
    rows = []
    for i in range(1, 152):
        species = fetch(f'https://pokeapi.co/api/v2/pokemon-species/{i}')
        names = {n['language']['name']: n['name'] for n in species['names']}
        pokemon = fetch(f'https://pokeapi.co/api/v2/pokemon/{i}')
        rows.append(
            {
                'id': i,
                'nameEn': names.get('en', ''),
                'nameCn': names.get('zh-hans') or names.get('zh-hant') or '',
                'slug': pokemon['name'],
            }
        )
        time.sleep(0.03)
    OUT.write_text(json.dumps(rows, ensure_ascii=False, indent='\t') + '\n', encoding='utf-8')
    print(f'Wrote {len(rows)} entries to {OUT}')


if __name__ == '__main__':
    main()
