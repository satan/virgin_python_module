//
module.exports = function(api) {
	
	api.get('/api/standalone/', function (req, res) {

		res.json({ 'message': 'Standalone Api' });
		
	});

};