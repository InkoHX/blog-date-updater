import { overWrite } from './markdown'
import { glob } from './util'

async function run (): Promise<void> {
  const paths = await glob('content/**/*.md', { cwd: process.cwd() })

  await Promise.all(paths.map(path => overWrite(path)))
}

run()
  .catch(reason => {
    console.error(reason)
    process.exit(1)
  })
