#!/usr/bin/env sh
# apps/desktop/nest/release.sh   -> uploads the last build to https://nest-releases.fly.storage.tigris.dev/nest.zip
set -eu

here=$(cd "$(dirname "$0")" && pwd)
zip=$here/../.desktop-build/targets/mac-arm64/artifacts/mac-arm64/nest.zip

set -a; . "$here/.env"; set +a
aws s3 cp --no-progress "$zip" s3://nest-releases/nest.zip
echo "https://nest-releases.fly.storage.tigris.dev/nest.zip"
