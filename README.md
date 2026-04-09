## Installation

```sh
# Check prerequisites
$ node --version
v24.14.0

$ pnpm --version
10.30.3

# Install with pnpm
# npm install -g pnpm@latest-10
$ pnpm install
```

## How to build

- `pnpm run build` — Copy required files in `dist/luatools`.
- `pnpm run build:zip` — Same as build but also create `dist/luatools.zip`.
- `pnpm run dev` — Live development

## How to clone

```bash
# Repo clone:
git clone git@github.com-luatools:muttape/luatools.git

# Add upstream
git remote add upstream git@github.com:madoiscool/ltsteamplugin.git

# Disable push to upstream:
git remote set-url --push upstream DISABLE
```

## Credits

- Original repo: https://github.com/madoiscool/ltsteamplugin
- Discord: https://discord.gg/luatools
