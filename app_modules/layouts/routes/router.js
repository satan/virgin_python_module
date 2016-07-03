var express = require('express'),
	exphbs  = require('express-handlebars'); // "express-handlebars"

module.exports = function(app, api, module, module_name, callback) {

	app.use(express.static(__root+'/app_modules/'+module_name+'/public/'));

	if (app){

		app.get('/', function (req, res) {
			//
			var data = {
				
				module_name: module_name,
				module_version: 0.002,
				layout: __root+'/app_modules/'+module_name+'/views/layouts/main',
				title: 'Welcome Home',
				message: ''

			};
			//
			res.render(__root+'/app_modules/'+module_name+'/views/home', data);
			//
		});
		
	}

};
