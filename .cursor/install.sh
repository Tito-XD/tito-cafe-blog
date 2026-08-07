#!/usr/bin/env bash
set -euo pipefail

BUN_VERSION='1.3.10'
BUN_INSTALL="${BUN_INSTALL:-$HOME/.bun}"
export BUN_INSTALL
export PATH="$BUN_INSTALL/bin:$PATH"

if ! command -v bun >/dev/null 2>&1; then
	curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}"
	export PATH="$BUN_INSTALL/bin:$PATH"
fi

bun install --frozen-lockfile
