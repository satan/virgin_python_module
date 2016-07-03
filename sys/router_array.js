//
var fs = require('fs');
//
var res_view_array = [];
//
var hidden = ['api'];
//
module.exports = function router_array( app, module_array, module_name_array)
{	
	//
	var fs = require('fs');
	//
	var res_view_array = [];
	//
	var hidden = ['api'];
	//
	var api = module_array[0];
	var doc = module_array[1];
	//
	console.log('router')
	//
	//console.log(module_name_array)
	//
	var dir_modules = __root+'/app_modules/';
	//
	//
	//var __accept = []
	//
	try {
		walk.walk(__root+'/app_modules/', 'folder', function(data){
			//
			//console.log(data)
			//
			for (var i = 0; i < data.length; i++) {
				//
				var index = 'route_';
				var results = []
				var routes = []
				//
				var name = module_name_array[i];
				//
				//console.log('AR:'+ name)
				//
				if ( hidden.indexOf(data[i]) < 0){
					//
					require(__root+'/app_modules/'+data[i]+'/routes/router.js')(app, api, module_array[data.indexOf(data[i])], module_name_array[i], function(cb){
						//
						var callback = cb;
						//
						console.log(callback)
						//
					});
					//
				}else{
					console.log(data[i]+'_excluded')
				}
				//
			};
			//
		});
		//
	} catch (err) {
		console.log('Module Router Not Found: '+err)
	}

	//return __accept
}
//