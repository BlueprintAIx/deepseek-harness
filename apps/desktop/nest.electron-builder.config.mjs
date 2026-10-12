// Nest desktop build: upstream's electron-builder config minus Developer ID signing, notarization and auto-update.
// The upstream factory validates release credentials before it returns, so it gets placeholders, and the
// result is then overridden. Signing later = pass the real values in the environment and drop these overrides.
import { createElectronBuilderConfig } from './scripts/electron-builder-config.mjs'

const placeholders = {
  DSH_DESKTOP_MACOS_SIGNING_IDENTITY: 'unsigned',
  DSH_DESKTOP_MACOS_TEAM_ID: 'UNSIGNED00',
  APPLE_KEYCHAIN_PROFILE: 'unsigned',
  DSH_DESKTOP_AUTO_UPDATE_ENV: 'production',
  DSH_DESKTOP_MANDATORY_UPDATE_PROD_ORIGIN: 'https://unused.invalid',
}
const env = { ...process.env, ...placeholders }
delete env.DSH_DESKTOP_UNSIGNED // the factory only accepts it for Windows; the overrides below do the same job for macOS
const upstream = createElectronBuilderConfig(env)
const { dshMandatoryUpdatePolicy, ...extraMetadata } = upstream.extraMetadata // no policy: the app skips the mandatory-update check

export default {
  ...upstream,
  productName: 'Nest',
  artifactName: 'nest-${version}-${os}-${arch}.${ext}',
  // productName inside the packaged package.json is what Electron names the app after: it decides the
  // user-data folder and single-instance lock, which must not collide with an installed DeepSeek Harness.
  extraMetadata: { ...extraMetadata, productName: 'Nest' },
  mac: { ...upstream.mac, identity: null, forceCodeSigning: false, hardenedRuntime: false, notarize: false, target: ['zip'] },
  dmg: { ...upstream.dmg, sign: false },
  publish: null,
  // upstream's afterPack writes the updater feed and afterSign verifies the Developer ID signature: neither applies.
  afterPack: async () => {},
  afterSign: async () => {},
}
