//
fs = require('fs')
//
var res_view_array = [];
//
module.exports = function(hidden,callback)
{

	walk.walk(__root+'/app_modules/', 'folder', function(data){
		//
		for (var i = 0; i < data.length; i++) {
			//
			if ( hidden.indexOf(data[i]) < 0){
				//
				res_view_array.push( __root+'/app_modules/'+data[i]+'/views/' )
				//
				try {
					// Query the entry
					partials = fs.lstatSync(__root+'/'+'app_modules'+'/'+data[i]+'/'+'views'+'/'+'partials');

					// Is it a directory?
					if (partials.isDirectory()) {
						// Yes it is
						res_view_array.push(__root+'/app_modules/'+data[i]+'/views/partials/')
					}
				}
				catch (e) {
					// ...
				}
				//
				/*if(data[i] == 'layouts'){
					//
					res_view_array.push(__root+'/app_modules/'+data[i]+'/views/partials/menu/')
					//
				}*/
			}
		};
		//
		callback (res_view_array)
		//
	});
	//
}
//
