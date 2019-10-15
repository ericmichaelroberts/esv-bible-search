<?php
include('esvapi_model.php');

class bgea_ajax
{
	public $Controller;
	
	public function __construct($ctrlr){
		$this->Controller = $ctrlr;
	}
	
	public function get_response(){
		$type = $_POST['esvtype'];
		if($type=='logger'){
			$this->Controller->write_log($_POST['debug']);
		}else{
			$url = $_POST['url'].'&include-audio-link=false&include-word-ids=false';
			$string = array();
			parse_str(array_pop(explode('?',$url)),$string);
			$passage = $string['passage'];
			$modelClass = ($type=='html') ? 'esvapi_html' : 'esvapi_text';
			$model = new $modelClass($passage);
			$result = $model->query();	
			echo $result;
		}
		exit();
	}
}