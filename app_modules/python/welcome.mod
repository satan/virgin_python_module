/*
{
	'version': '0.0.3',
	'name': 'welcome'
	'description': 'Login, Registration and Account Management Module',
	'author': 'Andreas Kalpakides'
	'router': {
		'login': {
			'login_auto',
			'login_manual'
		}
		'logout',
		'register',
		'forgot',
		'reset'
	},
	'model':{
		'account': {

			'account_add',
			'account_delete',
			'account_delete_by_username', // dev_only
			'account_get_all', // dev_only

			'account_get', //default - get by userid
			'account_get_all', // dev_only
			'account_get_by_name',
			'account_get_by_email',
			'account_get_by_country',
			
			'account_update',
			'account_update_name',
			'account_update_email',
			'account_update_country',
			'account_update_password',
			
			'account_validate',
			'account_validate_password',
			'account_validate_reset_link',
			
			'account_login_auto',
			'account_login_manual'

		}
	}
}
*/