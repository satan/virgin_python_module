//
fs = require('fs')
path = require('path');
//
//
module.exports = function(callback)
{
	//
	var res_modules = [];
	//
	var modules_path = __root+'/app_modules/';
	//
	fs.readdirSync(modules_path).filter(function(file) {
		//
		var full_path = path.join(modules_path, file);
		//
		var module_name = full_path.substr(full_path.lastIndexOf('/') + 1);
		//
		res_modules.push( module_name );
		//
	});
	//
	console.log(res_modules);
	//
	callback(res_modules);
	//
}
//
