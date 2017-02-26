
// global
const fs = require('fs')
const path = require('path')
const deps = ['dependencies', 'devDependencies']
const validVersionReg = /^[\*\-\^\>\=\<\|x\.\~\d]+$/

function handle(dependencies = {}, targetPkg, varr, rpath, dep) {
  let keys = Object.keys(dependencies)
  keys.forEach(key => {
    let v = targetPkg[dep][key]
    if (!validVersionReg.test(v)) return
    let pkgInfo = false
    let p = path.resolve(rpath + '/node_modules/' + key + '/package.json')
    try {
      pkgInfo = require( rpath + '/node_modules/' + key + '/package.json' )
    } catch (e) {
      console.log(p, 'do not exist', 'try "npm install" first')
    }
    if (pkgInfo) varr.push({
      name: pkgInfo.name,
      version: pkgInfo.version,
      type: dep
    })
  })

}

module.exports = function(_options) {

  let options = _options || {}
  let rpath = (options.dir || '.')
  let dir = path.resolve( rpath + '/node_modules' )
  let prefix = options.prefix

  let targetPkg = require( rpath + '/package.json' )
  let pkgs = fs.readdirSync(dir)
  let varr = []

  deps.forEach(dep => {
    handle(targetPkg[dep], targetPkg, varr, rpath, dep)
  })

  for(let obj of varr) {
    let {type, version, name} = obj
    let v = prefix === '*' ? '*' : prefix + version
    console.log(name, targetPkg[type][name], '-->', v)
    targetPkg[type][name] = v
  }

  fs.writeFileSync(rpath + '/package.json', JSON.stringify(targetPkg, null, 2))

  console.log('done')

  //end
}
