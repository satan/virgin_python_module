//
module.exports = function(api, module_data) {
	//

	//http://localhost:7000/api/register?u=admin&p=123456&e=hello@inderesting.com&c=Greece&n=Andreas
	api.post('/entity', function(req, res){

		//													
		var name				= req.query['name']; 				
		var legal_type			= req.query['legal_type']; 			
		var role				= req.query['role']; 				
		var clearance			= req.query['clearance']; 			
		var display_name		= req.query['display_name']; 		
		var email				= req.query['email']; 				
		var other_emails		= req.query['other_emails']; 				
		var countries			= req.query['countries']; 			
		var sectors				= req.query['sectors']; 			
		var employee_number		= req.query['employee_number']; 	
		var addresses			= req.query['addresses']; 			
		var telephones			= req.query['telephones']; 			
		var password			= req.query['password']; 			
		//	password_salt											
		//	creation_date											
		var establishment_date	= req.query['establishment_date']; 	
		//	entity_id												
		var brand				= req.query['brand']; 				

		//
		console.log('NAME: '+ name )
		//
		model_entity_add({
			
			name				: name,
			legal_type			: legal_type,
			role				: role,
			clearance			: clearance,
			display_name		: display_name,
			email				: email,
			other_emails		: other_emails,
			countries			: countries,
			sectors				: sectors,
			employee_number		: employee_number,
			addresses			: addresses,
			telephones			: telephones,
			password			: password,
			//
			//
			establishment_date	: establishment_date,
			//
			brand				: brand

		}, function(e){

			if (e){
				
				res.status(400).send(e);

			} else {

				res.status(200).send('ok');

			}
		});
	});
	//
	/*	
	api.get('/entity', function(req, res){

		var name = req.query["n"];

		console.log( name+' '+country)

		model_account_add({

			name 	: name

		}, function(e){

			if (e){
				
				res.status(400).send(e);

			}	else{
				res.status(200).send('ok');

			}
		});
	});
	*/
	//
	//
//http://localhost:7000/api/ent?name=ent_1&role=person&clearance=user&display_name=andreas
//
	api.post('/ent', function(req, res){

		//													
		var name				= req.query['name'];
		var role				= req.query['role'];
		var clearance			= req.query['clearance'];
		var display_name		= req.query['display_name'];
		//
		console.log('NAME: '+ name )
		//
		model_ent_add({
			
			name				: name,
			role				: role,
			clearance			: clearance,
			display_name		: display_name,


		}, function(e){

			if (e){
				
				res.status(400).send(e);

			} else {

				res.status(200).send('ok');

			}
		});
	});
	//
	api.post('/create_entity', function(api, module_data) {
		//

		//
	})
	//
	//
	api.post('/create_contract', function(api, module_data) {
		//

		//
	})
	//
	//
	api.post('/create_supply', function(api, module_data) {
		//

		//
	})
	//
	//
	api.post('/create_financial', function(api, module_data) {
		//

		//
	})
	//

};