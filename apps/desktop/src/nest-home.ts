import { cpSync, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const home = join(homedir(), '.nest')
const shipped = join(process.resourcesPath, 'nest')

process.env.DSH_HOME ??= home

if (existsSync(shipped)) {
  const plugins = join(home, 'profiles', 'desktop', 'node_modules')
  mkdirSync(plugins, { recursive: true })
  cpSync(join(shipped, 'nest-brand'), join(plugins, 'nest-brand'), { recursive: true })
  const patch = join(home, 'cordis.patch.yml')
  if (!existsSync(patch)) copyFileSync(join(shipped, 'cordis.patch.yml'), patch)
}
