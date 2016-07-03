//
$(window).load(function(){
	//
	$( "nav[role='dropdown'] input" ).prop( "checked", false );
	//
	minor($('.tmp_sidebar'));
	//
});
//
function minor(target){
	
	var b_height = $(window).outerHeight();

	if(target.hasClass('action_header')){

		$('.dis_recipe').css({'margin-top': target.outerHeight()})
		//$('.items_side').css({'margin-top': target.outerHeight()})
		//$('.items_side').css({'margin-top': target.outerHeight()})
	}
	if(target.hasClass('tmp_kitchen')){

		d_height = $('.dis_recipe').outerHeight();

		var t_h = b_height;
		if(d_height > b_height){
			t_h = d_height 
		}
		$('.tmp_kitchen_sidebar').css({'height': t_h});
		$('.tmp_kitchen_sidebar .sidebar').css({'height': t_h});
		$('.tmp_kitchen_sidebar .meta_recipe').css({'height': t_h});
		$('.dis_recipe').css({'height': b_height});
		//
		
		//
		var i_s_h = $('.items_side').innerHeight();
		var i_p_h = $('.items_processes').innerHeight();
		//
	}
	if(target.hasClass('tmp_sidebar') && !target.hasClass('tmp_sidebar_headless')){
		
		d_height = $('.tmp_sidebar').height();

		var t_h = b_height;
		if(d_height > b_height){
			t_h = d_height 
		}
		var top_padding = parseInt($('.tmp_sidebar').css('padding-top'));
		//
		console.log(top_padding)
		var result_distance = b_height - (top_padding*3);
		//
		$('.tmp_sidebar').css({'min-height': result_distance });
		$('.tmp_sidebar .sidebar').css({'min-height': result_distance });
	
	}
}
$(window).resize(function(){
	
	minor($('.action_header'));
	minor($('.tmp_kitchen'));
	minor($('.tmp_sidebar'));

});
//LABEL DROPDOWNS
//
var click_target=null;
//
$(document).on('click', 'body', function(e) {
	//
	if ($(e.target).closest('nav').attr('role') != 'dropdown') {

		$( "nav[role='dropdown'] input" ).prop( "checked", false );
		click_target = null;

	}
	//
}).on('click', 'nav[role=dropdown]', function(e) {
	//
	if ( $(this).attr('role') == 'dropdown') {

		if( e.target.nodeName == 'LABEL' ){

			if(this===click_target) {
				//
				$(this).find('input').prop( "checked", false );
				//
				click_target = null;
				//
			} else {
				//
				$( "nav[role='dropdown'] input" ).prop( "checked", false );
				$(this).find('input').prop('checked', !($(this).find('input').is(':checked')));
				//
				click_target=this;
				//
			}	
			e.preventDefault();	
		}
	}
});
//
function toTitleCase(str) {

	//console.log(str)
	return str.replace(/(?:^|\s)\w/g, function(match) {
		return match.toUpperCase();
	});
}
//
function display_alert(alert_text, target_container, animation){
	//
	var alert_text = alert_text.toString();
	var target_alert = target_container;
	target_alert.empty();
	//
	alert_class = alert_text.substring(alert_text.indexOf('_'),0);
	display_data = toTitleCase(alert_text.substring(alert_text.indexOf('_')+1).toString().replace(/_/g,' '))
	//
	target_alert.append('<ul></ul>');
	target_alert.find('ul').append('<li class="'+alert_class+'">'+display_data+'</li>');
	target_alert.removeClass('hide').addClass('active_alert').show();
	//
	if(animation != 'static'){
		anim_type = setTimeout(function(){

			target_alert.hide().removeClass('active_alert').addClass('hide');
			target_alert.empty();
			if(animation == 'static'){

				clearTimeout(anim_type)
				anim_type = null;
			}
			
		},3000)
		//
	}
}
//
function hide_alert(target_alert){

	target_alert.find('footer .alert').hide().removeClass('active_alert');

}
//
function display_progress(event){

	if(event != 'hide'){
		var percentage = (event.loaded / event.total) * 100;
		$('div.progress').show();
		//upload_form.find('.button[type="submit"]').prop('disabled', true);				
		$('div.progress div.bar').css('width', percentage + '%');
	}else{
		setTimeout(function(){
			$('div.progress').hide();
		},500)
	}

}
//
//
function target_near(t, et){
	if ( t[0].nodeName == ('UL' || 'OL') ){		
		//
		if( et[0].nodeName != ('LI') ){

			target = et.parents('li');

		} else {
			target = et;
		}
			
	}
	return target
}
//
//
function return_event_targets(for_element, element_list){

	var event_list = []
	var i = element_list.length;
	while (i--)
	{
		event_list.push('['+for_element+'='+element_list[i]+']')
	}
	return event_list

}
//
//
v_get_server_and_controller_versions = 0.001;
//
function get_server_and_controller_versions(version_array, version_location){

	_s_n_ = version_location.attr('data-module-name');
	_s_v_ = version_location.attr('data-module-version');
	//
	var server_version = parseFloat( _s_v_ );
	//
	__version = 0;
	//
	for (var i = 0; i < version_array.length; i++) {
		//
		__version = __version + version_array[i];
		//
	};
	//
	var __version = __version + server_version + v_get_server_and_controller_versions;
	//
	___v = {};
	___v.v = parseFloat( __version ).toFixed(3);
	//
	version_location.text(_s_n_+' ∞ '+ ___v.v );
	//
}
