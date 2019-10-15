<?php
include('bgea_validation.php');

class bgea_model
{
	public static $Group = 'bgea_esvbiblesearch_options';
	public static $Name = 	'esvbiblesearch_options';
	public static $Page = 	'esvbiblesearch_menu';
	public static $Selector = '#content p, #content li, #content span';
	public static $API	= 'http://www.esvapi.org/v2/rest/passageQuery';
	
	public $Controller;
	
	public static $Logger;
	public static $Data;
	public static $Options;
	public static $Defaults			= array();
	public static $Descriptions	= array();
	public static $Validations	= array();
	public static $Sanitizers		= array();
	
	public static $Sections			= array(
		'general'		=>	array(
			'title'				=>	'General',
			'description'	=>	'General Description',
			'fields'			=>	array(
				'tooltipText'	=>	array(
					'title'	=>	'Tooltip Placeholder Text',
					'type'	=>	'input_text',
					'default'=>	'Retrieving',
					'sanitize'	=>	'string',
					'validate'	=>	'is:string',
					'atts'	=>	array(),
				),
				'maskColor' 			=>	array(
					'title'	=>	'Page-Mask Color',
					'type'	=>	'input_text',
					'default'=>	'#000',
					'sanitize'	=>	'string',
					'validate'	=>	'is:string is:color !empty',
					'atts'	=>	array()
				),
				'maskOpacity' 			=>	array(
					'title'	=>	'Page-Mask Opacity',
					'type'	=>	'input_text',
					'default'=>	.5,
					'sanitize'	=>	'decimal',
					'validate'	=>	'btw:0,1',
					'atts'	=>	array()
				),
				'validation' =>	array(
					'title'	=>	'Validation',
					'type'	=>	'select',
					'atts'	=>	array(),
					'default'=>	3,
					'sanitize' 	=> 'integer',
					'validate'	=> 'is:option',
					'options'	=>	array(
						3	=>	'Book,&nbsp;Chapter&nbsp;&amp;&nbsp;Verse(Default)',
						2	=>	'Book&nbsp;&amp;&nbsp;Chapter',
						1	=>	'Book&nbsp;Name',
						0	=> 	'No Validation'
					)
				)
			)
		)
	);
	
	public function __construct($ctrlr){
		$this->Controller = $ctrlr;
		self::$Logger = bgea_logger::get_instance();
	}

	
	public function admin_init(){
		register_setting(self::$Group, self::$Name, array(__CLASS__,'sanitize'));
		
		self::$Data = get_option(self::$Name);
		foreach(self::$Sections as $key => $val){
			self::create_section($key,$val);
		}
	}
	
	public static function preprocess($key,$val){
		if(array_key_exists($key,self::$Sanitizers)){
			$type = self::$Sanitizers[$key];
			switch($type)
			{
				case 'string':
					return (string)$val;
				break;
				
				case 'integer':
				case 'int':
					return (integer)$val;
				break;				
				
				case 'float':
				case 'decimal':
					return (float)number_format($val,2,'.','');
				break;
				
				default:
					return $val;
				break;
			}
		}else{
			return $val;
		}
	}
	
	public static function init_sanitizers(){
		foreach(self::$Sections as $section){
			foreach($section['fields'] as $name => $field){
				if(array_key_exists('sanitize',$field)){
					self::$Sanitizers[$name] = $field['sanitize'];
				}
			}
		}
		return true;
	}
	
	public static function js_transcode($array){
		self::init_sanitizers();
		self::$Logger->write(print_r(self::$Sanitizers,true));
		$return = array();
		foreach($array as $key => $val){
			$return[$key] = self::preprocess($key,$val);
		}
		return $return;
	}
	
	public static function sanitize($inputs){
		self::$Logger->write('sanitize called');
		$options = get_option(self::$Name);
		self::$Logger->write(print_r($options,true));
    $validated = array();
		foreach($inputs as $id =>	$val){
			$validated[$id] = self::validate($id,$val) ?	$val : $options[$id];
		}	
		return $validated;
	}
	
	public static function validate($id,$val){
		if(array_key_exists($id,self::$Validations)){
			$checks = self::$Validations[$id];
			$opts = array_key_exists($id,self::$Options) ? self::$Options[$id] : null;
			$isit = bgea_validation::is_valid($val,$checks,$opts);
			return ($isit);
		}else{
			return true;
		}
	}
	
	public static function create_section($id,$specs){
		extract($specs); // title, description, fields
		add_settings_section(
			$id,
			$title,
			array(__CLASS__,'description_'.$id),
			self::$Page
		);
		self::$Descriptions[$id] = isset($description) ? $description : null;		
		self::create_fields($id,$fields);
	}
	
	public function create_fields($sectionId,$fields){
		foreach($fields as $id => $props){
			$passthru = array_merge(
				array('id'=> $id, 'label_for'=> $id),
				array_diff_key($props, array_fill_keys(array('title', 'type'), null)));
			add_settings_field(
				$id,
				$props['title'],
				array(__CLASS__,'build_'.$props['type']),
				self::$Page,
				$sectionId,
				$passthru);
			if(array_key_exists('sanitize',$props)) self::$Sanitizers[$id] = $props['sanitize'];
			if(array_key_exists('validate',$props)) self::$Validations[$id] = $props['validate'];
			if(array_key_exists('default',$props))	self::$Defaults[$id] = $props['default'];
			if(array_key_exists('options',$props)) 	self::$Options[$id] = $props['options'];
		}
	}
	
	public function admin_menu(){
		$page = add_options_page(
			'ESV Bible Search Options',
			'ESV Bible Search',
			'administrator',
			'esvbiblesearch_menu',
			array($this->Controller->View, 'print_admin_menu'));
		add_action(
			"admin_print_scripts-$page",
			array($this->Controller->View, 'admin_print_scripts'));
		add_action(
			"admin_head-$page",
			array($this->Controller->View, 'admin_init'));
	}
	
	public function get_js_params(){
		if(is_null(self::$Data)){
			self::$Data = get_option(self::$Name);
		}
		return json_encode(self::js_transcode(self::$Data));
	}
	
	public function getNonce(){
		return wp_create_nonce(ESVBIBLESEARCH_PREFIX . 'ajax');
	}
	
	public static function build_input_text($args){
		extract($args);
		$atts['id'] = $id;
		$atts['name'] = self::$Name."[$id]";
		$atts['type'] = 'text';
		$atts['value'] = isset(self::$Data[$id]) ? self::$Data[$id] : null;
		$tag = self::build_tag('input',$atts,false);
		echo $tag;
		//echo "<!--\n".print_r(array_keys($args),true)."\n-->";
	}
	
	public static function build_input_checkbox($args){
		extract($args);
		$atts['id'] = $id;
		$atts['name'] = self::$Name."[$id]";
		$atts['type'] = 'checkbox';
		$atts['checked'] = (isset($prev) && $prev) ? 'checked' : null;
		$tag = self::build_tag('input',$atts,false);
		echo $tag;
	}
	
	public static function build_input_radio($args,$i=null){
		extract($args);
		$atts['id'] = is_null($i) ? $id : $id.'_'.$i;
		$atts['name'] = self::$Name."[$id]";
		$atts['type'] = 'checkbox';
		$atts['checked'] = (isset($prev) && $prev) ? 'checked' : null;
		$tag = self::build_tag('input',$atts,false);
		echo $tag;
	}
	
	public static function build_select($args){
		extract($args);
		//echo "<!--\n".print_r($options,true)."\n-->";
		$atts['id'] = $id;
		$atts['name'] = self::$Name."[$id]";		
		$selected = (!is_array(self::$Data[$id])) ? array(self::$Data[$id]) : self::$Data[$id];
		$opts = array();
		foreach($options as $val => $txt){$opts[]=self::build_tag('option',array_filter(array('value'=>$val,'selected'=>(in_array($val,$selected)?'selected':null))),$txt);}		
		$tag = self::build_tag('select',$atts,implode("\n",$opts));
		echo $tag;
	}
	
	public static function build_options($list,$selected=null){
		$out = array();
		foreach($list as $value => $text){
			$atts['selected'] = ($selected == $value) ? 'selected' : null;
			$out[] = build_tag('option',array_filter($atts),$text);
			unset($atts);		
		}
		return implode("\n",$out);
	}
	
	public static function build_optgroup($args){
		
	}
	
	public static function build_fieldset($args){
		
	}
	
	public static function build_textarea($args){
		
	}
	
	public static function __callStatic($method,$arguments){
		if(preg_match('/[a-z][a-z0-9]*_[a-z0-9_]+/i',$method)){			
			list($x,$y) = explode('_',$method,2);
			if($x=='description') echo self::$Descriptions[$y];
		}
	}
	
	
	protected static function build_atts($array){
		$out = array();
		foreach($array as $key => $val){$out[] = $key.'="'.$val.'"';}
		return implode(' ',$out);
	}
	
	protected static function build_conts($input){
		if(is_array($input)){
			foreach($input as $tag){
				$out[] = (string)$tag;				
			}
			return implode("\n",$out);
		}else{
			return (string)$input;
		}
	}
	
	protected static function build_tag($tag,$atts=array(),$conts=array()){
		$out[] = '<'.$tag;
		$out[] = empty($atts) ? null : self::build_atts($atts);
		$out[] = $conts===false
								? ' />'
								: '>'.(
									empty($conts)
										? ''
										: self::build_conts($conts)
									).'</'.$tag.'>';
		return str_replace('  ',' ',implode(' ',array_filter($out)));
	}	
}