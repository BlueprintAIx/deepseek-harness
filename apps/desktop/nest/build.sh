#!/usr/bin/env sh
# apps/desktop/nest/build.sh   -> unsigned Apple Silicon Nest.app + nest.zip
set -eu

desktop=$(cd "$(dirname "$0")/.." && pwd)
out=$desktop/.desktop-build/targets/mac-arm64/artifacts/mac-arm64
app=$out/Nest.app

cd "$desktop/../.."
pnpm install --frozen-lockfile

export DSH_DESKTOP_UNSIGNED=1 DSH_DESKTOP_APP_ID=io.otus.nest CSC_IDENTITY_AUTO_DISCOVERY=false
export DSH_DESKTOP_TARGET_PLATFORM=darwin DSH_DESKTOP_TARGET_ARCH=arm64
pnpm --dir "$desktop" run package:mac:arm64 -- --prepare-only --unsigned
pnpm --dir "$desktop" exec electron-builder --config nest.electron-builder.config.mjs --mac --arm64 --dir --publish never
codesign --force --deep -s - "$app"

rm -f "$out/nest.zip"
(cd "$out" && ditto -c -k --norsrc --keepParent Nest.app nest.zip)
echo "built $out/nest.zip"
