// JavaScript Document
(function($){
	var Settings={
		
	},
	
	Methods={
		init: function(options){
			$.extend(Settings,options);
			console.log('Loaded!');
		}
	}
	
	jQuery.fn.bibletooladmin=function(method){
		return (Methods[method])
			?	Methods[method].apply(this,Array.prototype.slice.call(arguments,1))
			:	((typeof method==='object'||!method)?	Methods.init.apply(this,arguments):	false);
	};
})(jQuery);