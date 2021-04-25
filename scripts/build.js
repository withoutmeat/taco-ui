const path = require('path')
const fs = require('fs')

const rollup = require('rollup')
const vuePlugin = require('rollup-plugin-vue')
const typescript = require('rollup-plugin-typescript2')

const pkg = require('../package.json')

const deps = Object.keys(pkg.dependencies)

const cwd = process.cwd()

const componentNames = fs.readdirSync(path.resolve(cwd, 'src/components'))

build(0)

async function build(i) {
  const name = componentNames[i]

  if (!name) return

  const inputOption = {
    input: path.resolve(cwd, `src/components/${name}/index.ts`),
    plugins: [
      vuePlugin({
        target: 'browser',
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          exclude: ['node_modules', 'src/stories', 'src/tests'],
        },
        abortOnError: false,
      }),
    ],
    external(id) {
      return /^vue/.test(id) || deps.some((k) => new RegExp('^' + k).test(id))
    },
  }

  const outputOption = {
    dir: `dist/${name}`,
    format: 'es',
  }
  const bundle = await rollup.rollup(inputOption)

  await bundle.write(outputOption)

  console.log(`${name} done!!`)

  build(++i)
}
