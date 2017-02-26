
var vf = require('../')
,assert = require('assert')
,fs = require('fs')
,path = require('path')
,rpath = path.resolve(__dirname, '../package.json')
,pkgStr = fs.readFileSync(rpath)
,oldPkg = JSON.parse(pkgStr.toString())

describe('version fixer', function() {
  it('default', function(done) {

    vf({
      dir: path.resolve('.')
      ,prefix: ''
    })

    setTimeout(function() {
      var newPkg = JSON.parse(fs.readFileSync(rpath).toString())
      fs.writeFileSync(rpath, pkgStr)
      assert(newPkg.devDependencies.mocha !== oldPkg.devDependencies.mocha)
      done()
    }, 500)

  })

  it('with prefix ^', function(done) {

    vf({
      dir: path.resolve('.')
      ,prefix: '^'
    })

    setTimeout(function() {
      var newPkg = JSON.parse(fs.readFileSync(rpath).toString())
      fs.writeFileSync(rpath, pkgStr)
      assert(newPkg.devDependencies.mocha !== oldPkg.devDependencies.mocha && newPkg.devDependencies.mocha.indexOf('^') === 0)
      done()
    }, 500)

  })

  it('with prefix *', function(done) {

    vf({
      dir: path.resolve('.')
      ,prefix: '*'
    })

    setTimeout(function() {
      var newPkg = JSON.parse(fs.readFileSync(rpath).toString())
      fs.writeFileSync(rpath, pkgStr)
      assert(newPkg.devDependencies.mocha !== oldPkg.devDependencies.mocha && newPkg.devDependencies.mocha === '*')
      done()
    }, 500)

  })

})
