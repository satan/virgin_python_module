//
module.exports = function(app, module, module_data ) {
	//
	var module_name = module_data['module_name'];
	var module_version = module_data['module_version'];
	var module_views = module_data['module_views'];
	var module_controllers = module_data['module_controllers'];
	var module_models = module_data['module_models'];
	//
	var _python_path_ = '/usr/bin/python3';
	var _script_path_ = __root+'/app_modules/'+module_name+'/'+'scraper';
	//
	module.get('/execute', function(req, res) {
		//
		var query_accept = [ 
			'argumental',
			'plain'
		];
		//
		if( query_accept.indexOf( req.query["script"] ) != -1){
			//
			var qu = req.query["script"];
			//
			//
			var title_comp = totitlecase.totitlecase(qu.replace(/-/g, ' '))
			//
			var data = { 
				//
				module_name: module_name,
				module_version: module_version,
				layout: __root+'/app_modules/layouts/views/layouts/python',
				title: 'Leads'+' '+title_comp,
				message : title_comp,
				execute: qu
				//
			};
			//
			res.render( module_views+'/execute', data );
			//
		} else {
			//
			var data = { 
				
				module_name: module_name,
				module_version: module_version,
				layout: __root+'/app_modules/layouts/views/layouts/python',
				title: 'Leads Home',
				message : 'sign up for an account'
				
			};
			//
			res.render( module_views+'/execute', data );
			//
		}
		//
	});
	//
	module.post('/execute', function(req,res){
		//
		var query_accept = ['argumental', 'plain'];
		//
		if( query_accept.indexOf( req.query["exec_type"] ) != -1){
		
			//
			var apply_data = req.body.apply_data;
			//
			var exec_type = req.body.exec_type;
			var call_type = req.body.call_type;
			var gather_option = req.body.gather_option;
			//
			//
			if( apply_data == 'website_maybe' ){
				//
				////////////////////////////////////////////////////////////////////////////
				console.log('PYTHON_'+apply_data)
				//
				var set_args = [];
				//
				////////////////////////////////////////////////////////////////////////////
				//
				var set_args = [exec_type, call_type, gather_option];
				//
				var options = {
					//
					mode: 'text',
					pythonPath: _python_path_,
					pythonOptions: ['-u'],
					scriptPath: _script_path_,
					//
					args: set_args
					//
				};
				//
				py.run( 'demo.py', options, function (err, results) {
					//
					if(err){
						
						res.status(400).send(['error_'+err]);
					
					}else{

						console.log('results: %j', results);
						//
						res.status(200).send( results )
						//
					}
					//
				}).on('message', function (message) {
					//
					io.emit('python_entry',message);
					//
				});
				//
				////////////////////////////////////////////////////////////////////////////
				//
			}
			//
		}
		//
	});
	//
	module.post('/execute', function(req,res){
		//
		console.log('POSTED TO LEADS')
		//
	});
}