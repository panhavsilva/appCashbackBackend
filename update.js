const { spawn } = require('cross-spawn')
const pkg = require('./package.json')

const dependencies = Object.keys(pkg.dependencies)
const devDependencies = Object.keys(pkg.devDependencies)

const add = (args) => {
  return spawn('npm', ['install', '--save', '--save-exact']
    .concat(args), { stdio: 'inherit' })
}

const addDev = (args) => {
  return spawn('npm', ['install', '--save-dev', '--save-exact']
    .concat(args), { stdio: 'inherit' })
}

add(dependencies).on('close', () => {
  addDev(devDependencies).on('close', (code) => process.exit(code))
})
