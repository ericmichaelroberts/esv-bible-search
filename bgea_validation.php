<?php

class bgea_validation
{
	public static $Colors = array('AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','Darkorange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen');
	
	public static function is_valid($value,$params,$opts=null){
		$checks = explode(' ',$params);
		foreach($checks as $check){
			if(!self::check($value,$check,$opts)) return false;
		}
		return true;
	}
	
	public static function logger($input){
		$obj = bgea_logger::get_instance();
		$obj->write($input);
	}
	
	protected static function check($val,$test,$opts=null){
		//$report = 'check() called with: $val='.$val.', $test='.$test.', $opts='.$opts;
		$reverse = substr($test,0,1)=='!';
		$test = ($reverse) ? substr($test,1) : $test;
		if(!(strpos($test,':')===false)){
			list($type,$args) = explode(':',$test,2);
			$method = '_'.$type;
			//$report .= 'type='.$type.'; args='.$args.'; method='.$method;
			if(method_exists(__CLASS__,$method)) $result = self::$method($val,$args,$opts);
		}elseif(is_callable($test)){
			$result = call_user_func($test,$val);
		}
		$report .= 'result='.($result ? 'true':'false');
		//self::logger($report);
		return ($reverse) ? !$result : $result;
	}
	
	protected static function _is($val,$type,$opts=array()){
		switch($type){
			case 'string':
				return is_string($val);
			break;
			
			case 'integer':
				return preg_match('/^[\-]?[0-9]+$/',$val);
			break;
			
			case 'decimal':
				return preg_match('/^[\-]?(?:\.[0-9]+)|1(?:\.(?:0)?)?$/',$val);
			break;
			
			case 'color':
				return(
					(preg_match('/^[#][0-9a-f]{3,6}$/i',$val)) ||
					(preg_match('/^rgb\((?:[0-9]\s?,\s?){2}(?:[0-9])\)$/',$val)) ||
					(preg_match('/^rgba\((?:[0-9]\s?,\s?){3}(?:[0-9\.]+)\)$/',$val)) ||
					(preg_grep('/^'.$val.'$/i',self::$Colors)));
			break;
			
			case 'html':
				return true;
			break;
			
			case 'css':
				return true;
			break;
			
			case 'email':
				return true;
			break;
			
			case 'option':
			//self::logger('looking for option "'.$val.'" in "'.implode(', ',array_keys($opts)));
			return preg_grep('/^'.$val.'$/i',array_keys($opts));
			break;
			
			case 'url':
				return true;
			break;
		}
	}
	
	protected static function _lt($val,$args,$opts=array()){
		return (float)$val < (float)$args;
	}
	
	protected static function _lte($val,$args,$opts=array()){
		return (float)$val <= (float)$args;
	}
	
	protected static function _gt($val,$args,$opts=array()){
		return (float)$val > (float)$args;
	}
	
	protected static function _gte($val,$args,$opts=array()){
		return (float)$val >= (float)$args;
	}
	
	protected static function _btw($val,$args,$opts=array()){
		list($a,$b) = explode(',',$args);
		return (((float)$val > (float)$a) && ((float)$val < (float)$b));
	}
	
	protected static function _rgx($val,$args,$opts=array()){
		return preg_match($args,$val);
	}
}
