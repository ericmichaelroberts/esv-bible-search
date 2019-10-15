<?php

class bgea_view
{
	public $Controller;
	
	public function __construct($ctrlr){
		$this->Controller = $ctrlr;
		if(is_admin()){
			//add_action('admin_print_scripts', array($this, 'admin_print_scripts'));
			//add_action('admin_print_styles', array($this, 'admin_print_styles'));
		} else {
			$this->print_front_scripts();
			$this->print_front_styles();
		}
	}
	
	public function print_front_scripts(){
		if ($this->loadJSCSS('front')){			
			wp_enqueue_script(
				'jq_biblesearch_js',
				ESVBIBLESEARCH_JS_DIR.'jquery.bibletool.'.ESVBIBLESEARCH_VERSION.'.js',
				array('jquery'),
				ESVBIBLESEARCH_VERSION,
				false);
			wp_localize_script(
				'jq_biblesearch_js',
				'ESVAjax',
				array(
					'ajaxurl'	=> admin_url('admin-ajax.php'),
					'pluginbase' =>	ESVBIBLESEARCH_BASE_URL,
					'realpath' =>	realpath(__FILE__)
				)
			);
			add_action('wp_head', array($this,'init'));
		}
	}

	public function print_front_styles(){
		if ($this->loadJSCSS('front')) {
			wp_enqueue_style(
				'biblesearch_css',
				ESVBIBLESEARCH_CSS_DIR.'bibletool.css');
		}
	}
	
	public function print_admin_menu(){
		?>
		<div class="wrap">
			<div class="icon32" id="icon-options-general"><br></div>
				<h2>ESV Bible Search Options</h2>
				Customize the look, feel and functionality of ESV Bible Search Tool
				<form action="options.php" method="post">
				<?php settings_fields('bgea_esvbiblesearch_options'); ?>
				<?php do_settings_sections('esvbiblesearch_menu'); ?>
				<p class="submit">
					<input name="Submit" type="submit" class="button-primary" value="<?php esc_attr_e('Save Changes'); ?>" />
				</p>
			</form>
		</div>
	<?php
	}
	
	public function admin_print_scripts(){
		if($this->loadJSCSS('admin')) {
			//wp_register_script('jquery-ui-core');
			//wp_register_script('jquery-ui-dialog');
			wp_enqueue_script(
				'jq_bibletooladmin_js',
				ESVBIBLESEARCH_JS_DIR.'jquery.bibletool.admin.js',
				array('jquery'),
				ESVBIBLESEARCH_VERSION,
				false);
			wp_localize_script(
				'jq_bibletooladmin_js',
				'ESVAdmin',
				array(
					'ajaxurl' => admin_url('admin-ajax.php'),
					'pluginbase' => ESVBIBLESEARCH_BASE_URL,
					'realpath' => realpath(__FILE__)
				)
			);
			add_action('wp_head', array($this,'admin_init'));
		}
	}

	public function admin_print_styles(){
		if ($this->loadJSCSS('admin')) {
			//wp_enqueue_style(ESVBIBLESEARCH_PREFIX . 'admin-general', ESVBIBLESEARCH_CSS_DIR . 'admin-general.css');
		}
	}
	
	public function admin_init(){
		//$options = (string)$this->Controller->get_plugin_options();
		$out = array();
		$out[]='<script type="text/javascript" language="javascript">';
		$out[]=	'jQuery(document).ready(function(){';
		$out[]=	'jQuery("form").bibletooladmin();';
		$out[]=	'});';
		$out[]='</script>';
		echo implode('',$out);
	}
	
	public function init(){
		$options = (string)$this->Controller->get_plugin_options();
		$out = array();
		$out[]='<script type="text/javascript" language="javascript">';
		$out[]=	'jQuery(document).ready(function(){';
		$out[]=	'jQuery("'.$this->Controller->get_plugin_selector().'").bibletool('.$options.');';
		$out[]=	'});';
		$out[]='</script>';
		echo implode('',$out);
	}
	
	public function loadJSCSS($mode = 'admin'){
		$result = FALSE;
		switch ($mode) {
			case 'admin':
				if (is_admin()) $result = TRUE;
			break;

			case 'front':
				$result = TRUE;
			break;

			default:

			break;
		}

		return $result;
	}
}