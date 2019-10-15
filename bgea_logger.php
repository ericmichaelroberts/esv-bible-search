<?php

class bgea_logger
{
	private static $Instance;
	
	public $Log = array();
	
	public static function get_instance(){
		$class = __CLASS__;
		if(is_null(self::$Instance)) self::$Instance = new $class();
		return self::$Instance;
	}
	
	private function __construct(){}
	/*
	public function __destruct(){
		if(!empty($this->Log)){
			$dir = '/home/vhosts/goingfarther.dev.jesus.net/htdocs/wp-content/plugins/esvbiblesearch/logs/';
			$fn = $dir.'debug_'.date('Y_m_d_his').'.txt';
			$f = fopen($fn,'w+');
			$fw = fwrite($f,var_export($this->Log,true));
			return fclose($f);
		}
	}
	*/
	public function write($input){
		$this->Log[] = $input;
	}
}