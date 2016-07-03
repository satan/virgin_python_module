// SOCKET ON CLIENT
$(function(){
	//
	var socket = io.connect('http://localhost:6667');
	//
	socket.on('connect', function() {
		//
		console.log('check 2', socket.connected);
		//
	});
	//
	socket.on('python_entry',function(log){
		//
		try{
			//
			log = JSON.parse(log);
			//
		}catch(e){
			//
			log = log
			//
		}
		//
		if(log[0] == 'message'){
			
			display_alert( log[1], target_alert);
		
		}
		if(log[0] == 'progress'){

			display_progress( log[1] );

			if( log[1].loaded >= log[1].total){
				//
				display_progress('hide');
				//
			}
			//
		}
		if(log[0] == 'results'){
			//
			display_progress( log[1] );
			//
			var results = log[1];
			//
			display_gathered( results );
			//
		}
		//
	});

});
//
var _v = {};
//
var target_alert = $('#applyform .alert.inline-alert');
var entity_alert = $('#entity-form .alert.inline-alert');
//
var v_submit_application = 0.001;
//
function submit_application( external, action_type, call_type, gather_option) {
	//
	try{
		//
		var values = {
			'apply_data': external,
			'exec_type':  action_type,
			'call_type':  call_type,
			'gather_option': gather_option
		};
		//
		$.ajax({
			url: "/python/execute?exec_type="+action_type,
			type: "POST",
			data: values,
			timeout : 100000,
			error: function(xhr) {
				//
				display_alert(xhr.status, target_alert);
				//
			},
			success: function(response) {
				//
				//display_gathered(response);
				//
				display_progress('hide');
				//
				display_alert('success_data_gathered', target_alert);
				//
			}
		})

	}catch(e){
		//
		display_alert('error_'+e, target_alert);
		//
	}
	//
}

//
var v_display_gathered = 0.002;
//
function display_gathered(data){
	//
	try{

		results = data.details;
	
		if (results.length){
				
			//
			$('.results').empty();
			//
			for (var i = 0; i < results.length; i++) {
				//
				$('.results').append('<article>'+results[i]+'</article>');
				//
			};
			//
		}

	}catch(e){
		
		display_alert('error_no_data_returned', target_alert);

	}
	//
//
}
//
//
var e_list_click = [
	//
	'argumental',
	'plain'
	//
];
//
////////////////////////////////////////////////////////////////////////////////////
//
var v_return_event_targets = 0.001;
//
function return_event_targets(for_element, element_list){

	var e_l = []
	var i = element_list.length;
	while (i--)
	{
		e_l.push('['+for_element+'='+element_list[i]+']')
	}
	return e_l

}
//
var e_run = return_event_targets( 'data-run', e_list_click).join(", ");
//

//
$(document).ready(function(){
	//
	////////////////////////////////////////////////////
	//
	// each controller function has a version you pass in version array, then this gets added to the server version of the module
	//
	version_array = [v_display_gathered, v_submit_application, v_return_event_targets];
	get_server_and_controller_versions( version_array, $('body footer').last());
	//
	////////////////////////////////////////////////////
	//
}).on('click', e_run , function(e){
	//
	var e_t = $(e.target).attr('data-run') || $(this).attr('data-run');
	//
	//
	switch (e_t) {
		//
		case 'argumental':
			//
			var gather_option  = $('select[name=gather_option]').val();
			//
			submit_application('website_maybe', 'argumental', 'browser', gather_option)
			//
			break;
			//
		case 'plain':
			//
			//
			submit_application('website_maybe', 'plain', 'browser', '')
			//
			break;
			//
		//
	};
	//
})