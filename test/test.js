
var vf = require('../')
,assert = require('assert')
,fs = require('fs')
,path = require('path')
,rpath = path.resolve(__dirname, '../package.json')
,pkgStr = fs.readFileSync(rpath)
,oldPkg = require(rpath)

vf({
	dir: path.resolve('.')
})

var newPkg = JSON.parse(fs.readFileSync(rpath).toString())

describe('version fixer', function() {
	it('works well', function() {
		fs.writeFileSync(rpath, pkgStr)
		assert(newPkg.devDependencies.mocha !== oldPkg.devDependencies.mocha)
	})
})
