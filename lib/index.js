
// global
var fs = require('fs')
,path = require('path')

module.exports = function(_options) {

	var options = _options || {}
	,rpath = (options.dir || '.')
	,dir = path.resolve( rpath + '/node_modules' )

	var targetPkg = require( rpath + '/package.json' )
	,pkgStr = fs.readFileSync( rpath + '/package.json' ).toString()

	var pkgs = fs.readdirSync(dir)

	var varr = []

	for(var i = 0, len = pkgs.length;i < len;i ++) {

		var fo = pkgs[i]
		if(fo !== '.bin') {
			var pkgInfo = require( rpath + '/node_modules/' + fo + '/package.json' )
			varr.push({
				name: pkgInfo.name
				,version: pkgInfo.version
			})
		}

	}

	for(var j = 0, len0 = varr.length;j < len0;j ++) {

		var obj = varr[j]
		,reg = new RegExp('\\"' + obj.name.replace(/\-/g, '\-') + '\\"\\:( )*\\"(.+)\\"')

		if(!reg.test(pkgStr)) console.log(obj.name + ' is not in the package.json')
		else pkgStr = pkgStr.replace(reg, '"' + obj.name + '": "' + obj.version + '"')

	}


	fs.writeFileSync(rpath + '/package.json', pkgStr)

	console.log('done')

	//end
}
