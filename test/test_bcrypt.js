// node -> nodejs for mocha run error
// ln -s /usr/bin/nodejs /usr/bin/node

'use strict';

var bcrypt = require('bcrypt-nodejs');
///
/*
describe('BCrypt Encrypt', function () {
	it('should return a hashed password asynchronously', function (done) {

		var password = 'secret';
		var encrypted = bcrypt.hashSync(password);

		console.log(encrypted)

		if(password.length < encrypted.length){
			done();
		}

	});

});
*/
describe('BCrypt Process Register Login hashSync and compare', function () {

	it('Decrypts the password', function (done) {
		// Load hash from your password DB.
		var registerpassword = 'mypassword';
		var hashdatabase = bcrypt.hashSync(registerpassword);

		console.log('\n    Result: '+hashdatabase+'\n')

		var loginpassword = 'mypassword';

		bcrypt.compare(loginpassword, hashdatabase, function(err, matches) {

			if (err)
				console.log('\n    Error while checking password')
			else if (matches)
				console.log('\n    The password matches!')
			else
				console.log('\n    The password does NOT match!');

		});
		done()
	});

});

/*describe('BCrypt Compare', function () {
	it('Compares the password', function (done) {
		// Load hash from your password DB.
		var password = 'secret';
		var hash = bcrypt.hashSync(password);

		console.log(hash)

		bcrypt.compare('notsecret', hash, function(err, res) {
			// res == true
			if(res == false){
				done();
			}
		});
	});
});*/

