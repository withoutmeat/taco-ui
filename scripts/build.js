const path = require('path')
const fs = require('fs')

const rollup = require('rollup')
const vuePlugin = require('rollup-plugin-vue')
const typescript = require('rollup-plugin-typescript2')

const pkg = require('../package.json')

const deps = Object.keys(pkg.dependencies)

const cwd = process.cwd()

const componentNames = fs.readdirSync(path.resolve(cwd, 'src/components'))

const entry = {}

for (let i = 0; i < componentNames.length; i++) {
  entry[componentNames[i]] = path.resolve(
    cwd,
    `src/components/${componentNames[i]}/index.ts`,
  )
}

const inputOption = {
  input: entry,
  plugins: [
    vuePlugin({
      target: 'browser',
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
        },
        exclude: ['node_modules', 'stories', 'tests'],
      },
      abortOnError: false,
    }),
  ],
  external(id) {
    return /^vue/.test(id) || deps.some((k) => new RegExp('^' + k).test(id))
  },
}

const outputOption = {
  dir: 'dist',
  format: 'es',
}

;(async function build() {
  const bundle = await rollup.rollup(inputOption)

  await bundle.write(outputOption)

  console.log('done!!')
})()
