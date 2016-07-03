//
module.exports = function(app, api, module, module_name, callback) {
	//
	var module_data = {
		'module_name' : module_name,
		'module_version' : 0.003,
		'module_views' : __root+'/app_modules/'+module_name+'/views',
		'module_controllers' : __root+'/app_modules/'+module_name+'/controllers',
		'module_models' : __root+'/app_modules/'+module_name+'/models'
	}
	//
	var _controllers = module_data['module_controllers'];
	var _models = module_data['module_models'];
	//
	walk.walk(_models, 'model_', function(data){
		//
		for (var i = 0; i < data.length; i++) {
			//
			filename = data[i].substring(0, data[i].indexOf('.'))
			global[filename] = require(_models+'/'+data[i]);
			//
		};
		//
	});
	//
	app.use(express.static(__root+'/app_modules/'+module_name+'/controllers'));
	//
	if (module && app){
		//
		//
		var included_routes = __root+'/app_modules/'+module_name+'/routes';
		//
		walk.walk( included_routes, 'route_', function(data){
			//
			for (var i = 0; i < data.length; i++) {
				//
				this_route = data[i]
				//
				route_name  = this_route.substring(this_route.lastIndexOf("."), 0)
				clean_route = route_name.substring( route_name.lastIndexOf('_') ).replace('_','/')
				//
				require( included_routes+'/'+data[i] )(app, module, module_data)
				//
			};
			//
		});
		//
	}
	//
	if(api){
		//
		require( included_routes+'/api.js' )(api, module_data)
		//
	}
	//
};