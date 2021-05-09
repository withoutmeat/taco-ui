const path = require('path')
const rollup = require('rollup')
const vuePlugin = require('rollup-plugin-vue')
const typescript = require('rollup-plugin-typescript2')
const glob = require('glob')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

const pkg = require('../package.json')

const deps = Object.keys(pkg.dependencies)

const cwd = process.cwd()

glob(path.resolve(cwd, 'src/components/*'), async (err, matches) => {
  if (err) throw err

  for (let i = 0; i < matches.length; i++) {
    buildByComponent(matches[i])
  }
})

async function buildByComponent(file) {
  console.log('start: ', file.split('/').pop())

  if (!file.endsWith('ts')) {
    await new Promise((resolve) => {
      glob(path.join(file, '/*.*'), async (err, matches) => {
        if (err) throw err
        await Promise.all(matches.map(build))
        resolve(true)
      })
    })
  } else {
    await build(file)
  }

  console.log('🎉done :', file.split('/').pop())
}

async function build(name) {
  if (!name) return

  const inputOption = {
    input: name,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          exclude: ['node_modules', 'src/stories', 'src/tests'],
        },
        abortOnError: false,
      }),
      vuePlugin({
        target: 'browser',
        css: false,
      }),
    ],
    external(id) {
      return (
        /^vue/.test(id) ||
        deps.some((k) => new RegExp('^' + k).test(id)) ||
        /\.\//.test(id)
      )
    },
  }

  const computedName = name.split('components')[1]
  const splitedName = name.split('/')

  const getPaths = (id) => {
    id = id.endsWith('.vue') ? id.replace('.vue', '.js') : id

    const splitedId = id.split('/')

    let index = 0
    while (splitedName[index] === splitedId[index]) {
      index++
    }

    const isMyFile = /^\.{0,2}\//.test(id)

    if (isMyFile) {
      return (
        './'.padStart(splitedName.length - index + 1, '.') +
        splitedId.slice(index).join('/')
      )
    }

    return id
  }

  const outputOption = {
    file: `dist${computedName.replace(/vue|ts/, 'js')}`,
    format: 'es',
    paths: getPaths,
  }

  const bundle = await rollup.rollup(inputOption)

  await bundle.write(outputOption)
}
