const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const repositoryRoot = path.resolve(__dirname, '..')

if (!fs.existsSync(path.join(repositoryRoot, '.git'))) {
  console.log('Skipping Git hook setup outside a Git checkout')
  process.exit(0)
}

for (const [command, args] of [
  ['git', ['config', 'blame.ignoreRevsFile', '.git-blame-ignore-revs']],
  ['prek', ['install']]
]) {
  const result = spawnSync(command, args, { cwd: repositoryRoot, stdio: 'inherit', shell: process.platform === 'win32' })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
