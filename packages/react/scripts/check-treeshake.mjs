// Guards the CodeBlock slim-core contract: a Vite consumer that imports
// CodeBlock from the barrel must not get shiki's full grammar registry
// (~280 chunks / ~12 MB) emitted into its build. Run after `pnpm build`.
import {
  mkdtempSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const MAX_CHUNKS = 10

const pkgDir = dirname(dirname(fileURLToPath(import.meta.url)))
const work = mkdtempSync(join(tmpdir(), 'rnui-treeshake-'))

try {
  const entry = join(work, 'entry.js')
  const distEntry = join(pkgDir, 'dist/index.mjs').replaceAll('\\', '/')
  writeFileSync(
    entry,
    `import { CodeBlock } from '${distEntry}'\nconsole.log(CodeBlock)\n`,
  )

  const outDir = join(work, 'out')
  await build({
    configFile: false,
    root: work,
    logLevel: 'error',
    build: {
      outDir,
      minify: false,
      rolldownOptions: {
        input: entry,
        external: ['react', 'react-dom', 'react/jsx-runtime'],
      },
    },
  })

  const jsChunks = []
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p)
      else if (name.endsWith('.js')) jsChunks.push(name)
    }
  }
  walk(outDir)

  if (jsChunks.length > MAX_CHUNKS) {
    console.error(
      `FAIL: importing CodeBlock from the barrel emitted ${jsChunks.length} JS chunks ` +
        `(limit ${MAX_CHUNKS}). The full shiki registry is likely reachable from ` +
        `the barrel again — it must only be importable via ./code-block-full.`,
    )
    console.error(jsChunks.slice(0, 20).join('\n'))
    process.exit(1)
  }
  console.log(
    `OK: CodeBlock consumer build emitted ${jsChunks.length} JS chunk(s) (limit ${MAX_CHUNKS}).`,
  )
} finally {
  rmSync(work, { recursive: true, force: true })
}
