#!/usr/bin/env node

var vf = require('../lib')
var resolve = require('path').resolve
var program = require('commander')

program
  .version(require('../package.json').version)
  .description('read current installed module version and update package.json or make all module version to *')
  .option('-p, --prefix', 'update the version number with prefix, "*" will replace version number with "*" ')
  .usage('[dir]')
  .parse(process.argv)

var prefix = ''

var arr = program.rawArgs

for(var i = 2, len = arr.length;i < len;i ++) {
	var name = arr[i]
	if(name === '-p') {
		prefix = arr[i+1] || ''
		arr.splice(i, 2)
	}
}

var path = program.args.shift() || '.'

if(path === prefix) path = '.'

path = resolve(path)

vf({
  dir: path
  ,prefix: prefix
})