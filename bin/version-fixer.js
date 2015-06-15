#!/usr/bin/env node

var vf = require('../lib')
var resolve = require('path').resolve
var program = require('commander')

program
  .version(require('../package.json').version)
  .usage('[dir]')
  .parse(process.argv)

var path = resolve(program.args.shift() || '.');

vf({
  dir: path
})