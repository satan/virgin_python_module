// node -> nodejs for mocha run error
// ln -s /usr/bin/nodejs /usr/bin/node

'use strict';

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var moment 		= require('moment');

///

var dbconfig = require('../server/config/database_test');
var connection = mysql.createConnection(dbconfig.connection);

///

function db_create () {

	var connection = mysql.createConnection(dbconfig.connection);
	connection.query('CREATE DATABASE ' + dbconfig.database, function(err){
		if(err){
			throw err
		}else{
			
			connection.end()
		}
	});
}

///////
describe('USE DATABASE MySQL', function () {
	it('Uses a Database', function (done) {

		var connection = mysql.createConnection(dbconfig.connection);		
		
		connection.query('USE ' + dbconfig.database, function(err){
			if (err){

				describe('CREATE DATABASE MySQL', function () {
					it('Creates a Database', function (done) {

						db_create();
						done();

					})
				});

			}else{

				describe('DROP DATABASE MySQL', function () {
					it('Drops a Database', function (done) {

						var connection = mysql.createConnection(dbconfig.connection);
						connection.query('DROP DATABASE '+dbconfig.database, function(err){
							if(err){
								throw err
							}else{
								//
								describe('CREATE DATABASE MySQL', function () {
									it('Creates a Database', function (done) {

										db_create();
										done();
									})
								});
								connection.end();
								done();
							}
						});
					});
				});	
			}
			connection.end();
			done();

		});
	})
});
