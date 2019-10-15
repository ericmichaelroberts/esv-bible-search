<?php

class esvapi_model
{
	private $html = array(
		'include-passage-references'			=>	true,
		'include-verse-numbers'						=>	true,
		'include-footnotes'								=>	true,
		'include-footnote-links'					=>	true,
		'include-headings'								=>	true,
		'include-subheadings'							=>	true,
		'include-surrounding-chapters'		=>	false,
		'include-word-ids'								=>	false,
		'include-audio-link'							=>	true,
		'include-short-copyright'					=>	true,
		'include-copyright'								=>	false
	);

	private $xml = array(
		'include-xml-declaration'					=>	false,
		'include-doctype'									=>	true,
		'include-quote-entities'					=>	true,
		'include-simple-entities'					=>	false,
		'include-cross-references'				=>	false,
		'include-line-breaks'							=>	true,
		'include-word-ids'								=>	false,
		'include-virtual-attributes'			=>	false,
		'base-element'										=>	'verse-unit'
	);

	private $text = array(
		'include-passage-references'			=>	true,
		'include-first-verse-numbers'			=>	true,
		'include-verse-numbers'						=>	true,
		'include-footnotes'								=>	true,
		'include-short-copyright'					=>	true,
		'include-copyright'								=>	false,
		'include-passage-horizontal-lines'=>	true,
		'include-heading-horizontal-lines'=>	true,
		'include-headings'								=>	true,
		'include-subheadings'							=>	true,
		'include-selahs'									=>	true,
		'include-content-type'						=>	true,
		'line-length'											=>	true
	);

	public $format;
	public $options;

	public function merge_assoc($target){
		if(func_num_args()>1){
			$tmp = func_get_args();
			$inputs = array_slice($tmp,1);
			foreach($inputs as $input){
				$target = array_merge($target,$input);
			}
			return $target;
		}else{
			return $target;
		}
	}

	public function __construct($format,$opts=array()){
		$this->format = $format;
		$this->options = $this->merge_assoc($this->$format,$opts);
	}

	public function __toString(){
		$output = array();
		foreach($this->options as $key => $val){
			$output[] = $key.'='.(is_bool($val)
				? ($val ? 'true' : 'false')
				: $val);
		}
		return implode('&',$output);
	}

	public function query(){
		$url = 'http://www.esvapi.org/v2/rest/passageQuery?'.str_replace(' ','+',(string)$this);
		//return $url;

		$ch = curl_init();
		curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch,CURLOPT_URL,$url);
		$result = curl_exec($ch);
		curl_close($ch);
		return (method_exists($this,'filter_result'))
				? $this->filter_result($result)
				: $result;
	}
}

class esvapi_text extends esvapi_model
{
	protected $defaults = array(
		'output-format'										=> 'plain-text',
		'include-passage-references'			=>	false,
		'include-first-verse-numbers'			=>	false,
		'include-verse-numbers'						=>	false,
		'include-footnotes'								=>	false,
		'include-short-copyright'					=>	false,
		'include-copyright'								=>	false,
		'include-passage-horizontal-lines'=>	false,
		'include-heading-horizontal-lines'=>	false,
		'include-headings'								=>	false,
		'include-subheadings'							=>	false,
		'include-selahs'									=>	false
	);

	public function filter_result($input){
		$output = str_replace("\n",'',trim($input));
		if(strlen($output) > 128){
			$x = substr($output,0,128);
			$y = explode(' ',$x);
			array_pop($y);
			$output = implode(' ',$y).'...';
		}
		return ucfirst(str_replace('  ',' ',$output));
	}

	//public function __construct($passage=null,$key='IP'){
	public function __construct($passage=null,$key='TEST'){
			parent::__construct('text',$this->defaults);
			$this->options['key'] = $key;
			$this->options['passage'] = $passage;
	}
}

class esvapi_html extends esvapi_model

{
	protected $defaults = array(
		'include-footnotes'	=>	false,
		'include-footnote-links'=>	false,
		'output-format'			=> 'html',
		'include-audio-link' =>	false
	);

	//public function __construct($passage=null,$key='IP'){
	public function __construct($passage=null,$key='TEST'){
		parent::__construct('html',$this->defaults);
		$this->options['key'] = $key;
		$this->options['passage'] = $passage;
	}

	public function filter_result($input){
		$output = str_replace('<span class="verse','<br /><span class="verse',str_replace(array("\n",'<br>','<br />','<BR>','<BR />'),'',trim($input)));
		//$output = str_replace('<span  class="verse-num','<br /><span class="verse-num',$input);
		return ucfirst(str_replace('  ',' ',$output));
	}
}
?>
