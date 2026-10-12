/** Nest keeps its own home so it never touches a DeepSeek Harness install's ~/.dsh. The Host inherits this env. */
import { homedir } from 'node:os'
import { join } from 'node:path'

process.env.DSH_HOME ??= join(homedir(), '.nest')
