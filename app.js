'use strict';
//
global.__root = __dirname
global.__api = [];
//
global.express = require('express');
global.exphbs  = require('express-handlebars');//, // 'express-handlebars'
var Handlebars = require('handlebars');
//
var fs = require('fs');
//
var rimraf = require('rimraf');
//
//
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
//
global.py = require('python-shell');
//
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var StrategyMock = require('./strategy-mock');
//
global.moment = require('moment');
global.bcrypt = require('bcrypt-nodejs');
//
var session = require('express-session');
//
var helpers = require(__root+'/lib/helpers');
//
global.dbconfig = require(__root+'/server/config/database');
//
//
global.mysql = require('mysql');
//

var app = express();
//
/////////////////////////////////////////
//
var port = 6667;
//
global.walk = require(__root+'/lib/walk');
//
global.totitlecase = require(__root+'/lib/totitlecase');
//
////////////////////////////////////////////////////////////////////
var views_array = require(__root+'/'+'sys'+'/'+'views_array');
////////////////////////////////////////////////////////////////////
var hidden = ['api']; // api is set to hidden by default
////////////////////////////////////////////////////////////////////
//
views_array(hidden,function(callback){
	//
	var cb = callback;
	//
	global.hbs = exphbs.create({
		defaultLayout: __root+'/app_modules/layouts/views/layouts/main',
		extname      : '.hbs',
		handlebars : Handlebars,
		helpers      : helpers,
		partialsDir: cb
	});
	//
	app.engine('.hbs', hbs.engine);
	app.set('view engine', '.hbs');
	//
})
//
////////////////////////////////////////////////////////////////////
//
app.disable('x-powered-by');
//
app.use(cookieParser());
//router.use(cookieParser());
var _app_limit = '100mb';
//
app.use(bodyParser.json({limit: _app_limit}));
app.use(bodyParser.urlencoded({limit: _app_limit, extended: true}));
//
app.use(express.static(__root+'/'));
app.use(express.static(__root+'/lib/validators/'));
app.use(express.static(__root+'/lib/'));
//
//
global.route_accept = [];
var __accept = global.route_accept;
//
var get_module_array = require(__root+'/'+'sys'+'/'+'module_array');
//
var module_var_array = [];
get_module_array(function(module_array){
	//
	var n = 0;
	while (n < module_array.length) {
		//
		var m = module_array[n];
		//
		global[m] = express.Router();
		var r = global[m];
		//
		//
		module_var_array.push(r)
		//
		app.use('/'+m,r);
		//
		n++;
		//
	}
	//
	var router_array = require(__root+'/'+'sys'+'/'+'router_array');
	//
	var __accept = router_array(app, module_var_array, module_array);
	//
});
//console.log(__accept)
//

//
function handleDisconnect(config) {

	global.connection = mysql.createConnection(config);
	//
	var connection = global.connection;

	connection.connect(function(err) {
		if(err) { 

			console.log('error when connecting to db:', err);
			setTimeout(handleDisconnect, 2000);
		
		}
	});
	//
	connection.on('error', function(err) {

		console.log('db error', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
			handleDisconnect();
		} else {
			throw err;
		}

	});
}
//
handleDisconnect(dbconfig.connection);
//
var server = require('http').createServer(app);//https.createServer(options, app)
//
//
global.io = require('socket.io')(server);
//
server.listen(port, function () {
	console.log('server listening on: '+port);
	
	if(process.getuid() == 0 ){
		console.log('Running as root')
	} else {
		console.log('Running as NON root')
	}
});
//
io.on('connection', function(socket){
	//
	socket.on('connect_error', function(e) {
		//
		console.log('connect_error');
		socket.reconnection(false);
		//
	});
	//
	socket.on('reconnect_error', function(e) {
		//
		console.log('reconnect_error');
		socket.reconnection(false);
		//
	});
})

