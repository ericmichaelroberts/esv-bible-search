<?php
define('ESVBIBLESEARCH_VERSION','2.6');
define('ESVBIBLESEARCH_PREFIX', 'bgea_');
define('ESVBIBLESEARCH_BASE_DIR', dirname(__FILE__) . DIRECTORY_SEPARATOR);
define('ESVBIBLESEARCH_PLUGIN_NAME', basename(ESVBIBLESEARCH_BASE_DIR));
define('ESVBIBLESEARCH_BASE_URL', WP_PLUGIN_URL . '/' . ESVBIBLESEARCH_PLUGIN_NAME . '/');
define('ESVBIBLESEARCH_HTML_DIR', realpath(ESVBIBLESEARCH_BASE_DIR . '/html') . DIRECTORY_SEPARATOR);
define('ESVBIBLESEARCH_JS_DIR', ESVBIBLESEARCH_BASE_URL . 'js/');
define('ESVBIBLESEARCH_CSS_DIR', ESVBIBLESEARCH_BASE_URL . 'css/');

if(!is_admin()){
	wp_deregister_script('jquery');
	wp_register_script('jquery',('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'),false,'');
	wp_enqueue_script('jquery');	
}

spl_autoload_register(array('bgea_esvbiblesearch','autoload'));

function bgea_esvbiblesearch_init(){
	static $main;
	$main = new bgea_esvbiblesearch();
}

//load_plugin_textdomain('esvbiblesearch', false, ESVBIBLESEARCH_BASE_DIR . '/langs');

add_action('init', 'bgea_esvbiblesearch_init');

register_activation_hook(__FILE__, array('bgea_esvbiblesearch', 'activate'));
register_deactivation_hook(__FILE__, array('bgea_esvbiblesearch', 'deactivate'));
register_uninstall_hook(__FILE__, array('bgea_esvbiblesearch', 'uninstall'));



?>