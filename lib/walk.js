var fs = require('fs');

exports.walk = function(dir, index, callback) {

	//var index;
	var results = [];
	var routes = [];

	fs.readdir(dir, function (err, files) {
		var count = files.length

		files.forEach(function (filename) {
			
			results.push(filename)

			count--;

			if (count <= 0) {
				
				results = results.filter(function(route_true){
					
					if (index == 'folder') {
						return route_true
					}else{
						return route_true.indexOf(index) > -1
					};

				});
				
				for (var i = 0; i < results.length; i++) {
					loc = results[i]
					loc = loc.substring(loc.lastIndexOf("/")+1)
					routes.push(loc)
				};

				callback(routes);

				//return false
			}
			
		});

	});
	
}
