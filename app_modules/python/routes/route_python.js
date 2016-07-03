//
module.exports = function( app, module, module_data ) {
	//
	var module_name = module_data['module_name'];
	var module_version = module_data['module_version'];
	var module_views = module_data['module_views'];
	var module_controllers = module_data['module_controllers'];
	var module_models = module_data['module_models'];
	//
	//*GET: /settings*//
	module.get('/', function(req, res) {
		
		var data = { 

			module_name: module_name,
			module_version: module_version,
			layout: __root+'/app_modules/layouts/views/layouts/python',
			title: 'Hunter Module',
			message : 'Hunter'

		};

		res.render( module_views+'/python', data );

	});
	//
}