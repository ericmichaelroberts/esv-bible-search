<?php
/*
  Plugin Name: ESVBibleSearch
  Description:
  Version: 1.0
  Author: Eric M. Roberts  <eroberts@billygraham.org>
  Plugin URL: http://billygraham.org
  Author URL: http://billygraham.org
*/

require('bgea_logger.php');
require('bgea_model.php');
require('bgea_view.php');
require('bgea_ajax.php');

class bgea_esvbiblesearch
{
	public $Ajax;
	public $Model;
	public $View;
	public $Logger;
	
	public function __construct(){
		$this->Ajax = new bgea_ajax($this);
		$this->Model = new bgea_model($this);
		$this->View = new bgea_view($this);
		$this->Logger = bgea_logger::get_instance();
		
		add_action('admin_init',array($this,'admin_init'));
		add_action('admin_menu',array($this,'admin_menu'));
		
		add_action('wp_ajax_nopriv_esvbiblesearch',array($this,'get_ajax'));
		add_action('wp_ajax_esvbiblesearch',array($this,'get_ajax'));
	}
	
	public function admin_init(){
		return $this->Model->admin_init();
	}
	
	public function admin_menu(){
		return $this->Model->admin_menu();
	}
	
	public function get_ajax(){
		return $this->Ajax->get_response();
	}
	
	public function get_plugin_selector(){
		return bgea_model::$Selector;
	}
	
	public function get_plugin_options(){
		return $this->Model->get_js_params();
	}
	
	public function write_log($input){
		return $this->Logger->write($input);
	}
	
	public function activate(){

	}
	public function deactivate(){

	}
	public function uninstall(){

	}
	public static function autoload($class_name){
		$parts = explode('_', $class_name);
		if (array_shift($parts) . '_' == ESVBIBLESEARCH_PREFIX) {
			$path = ESVBIBLESEARCH_BASE_DIR . strtolower(implode(DIRECTORY_SEPARATOR, $parts) . '.php');
			if (file_exists($path)) {
				require($path);
			}
		}
	}
}

include('bgea_config.php');
?>