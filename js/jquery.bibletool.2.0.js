// JavaScript Document
(function($){	
	var Index=['regex','book','chapters','verses'],
	
	Books=[[/^(ac(?:ts)?)$/i,'Acts',28,[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31]],[/^(am(?:os)?)$/i,'Amos',9,[15,16,15,13,27,14,17,14,15]],[/^(col(?:ossians)?)$/i,'Colossians',4,[29,23,25,18]],[/^(d(a(?:n(?:iel)?)?|n))$/i,'Daniel',12,[21,49,30,37,31,28,28,27,27,21,45,13]],[/^(d(t|eut(?:eronomy)?))$/i,'Deuteronomy',34,[46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]],[/^((ec(?:cles(?:iastes)?)?|qoh(?:eleth)?))$/i,'Ecclesiastes',12,[18,26,22,16,20,12,29,17,18,20,10,14]],[/^(eph(?:es(?:ians)?)?)$/i,'Ephesians',6,[23,22,21,32,33,24]],[/^(est(?:her)?)$/i,'Esther',10,[22,23,15,17,14,14,10,17,32,3]],[/^(ex(?:o(?:d(?:us)?)?)?)$/i,'Exodus',40,[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]],[/^(ez(e(?:k(?:iel)?)?|k))$/i,'Ezekiel',48,[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]],[/^(ezr(?:a)?)$/i,'Ezra',10,[11,70,13,24,17,22,28,36,15,44]],[/^(ga(?:l(?:atians)?)?)$/i,'Galatians',6,[24,21,29,31,26,18]],[/^(g(e(?:n(?:esis)?)?|n))$/i,'Genesis',50,[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]],[/^(hab(?:akkuk)?)$/i,'Habakkuk',3,[17,20,19]],[/^(h(ag(?:gai)?|g))$/i,'Haggai',2,[15,23]],[/^(heb(?:rews)?)$/i,'Hebrews',13,[14,18,19,16,14,20,28,13,28,39,40,29,25]],[/^(ho(?:s(?:ea)?)?)$/i,'Hosea',14,[11,23,5,19,15,11,16,14,17,15,12,14,16,9]],[/^((?:(1|I)\s?|1st\s|first\s)ch(?:r(?:on(?:icles)?)?)?)$/i,'1 Chronicles',29,[54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30]],[/^((?:(1|I)\s?|1st\s|first\s)co(?:r(?:inthians)?)?)$/i,'1 Corinthians',16,[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]],[/^((?:(1|I)\s?|1st\s|first\s)j(o(?:h(?:n)?)?|n))$/i,'1 John',5,[10,29,24,21,21]],[/^((?:(1|I)\s?|1st\s|first\s)k(i(?:n(?:gs)?)?|gs))$/i,'1 Kings',22,[53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53]],[/^((?:(1|I)\s?|1st\s|first\s)p(e(?:t(?:er)?)?|t(?:r)?))$/i,'1 Peter',5,[25,25,22,19,14]],[/^((?:(1|I)\s?|1st\s|first\s)s(a(?:m(?:uel)?)?|m))$/i,'1 Samuel',31,[28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13]],[/^((?:(1|I)\s?|1st\s|first\s)th(es(?:s(?:alonians)?)?))$/i,'1 Thessalonians',5,[10,20,13,18,28]],[/^((?:(1|I)\s?|1st\s|first\s)ti(?:m(?:othy)?)?)$/i,'1 Timothy',6,[20,15,16,16,25,21]],[/^((?:(2|II)\s?|2nd\s|second\s)ch(?:r(?:on(?:icles)?)?)?)$/i,'2 Chronicles',36,[17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23]],[/^((?:(2|II)\s?|2nd\s|second\s)co(?:r(?:inthians)?)?)$/i,'2 Corinthians',13,[24,17,18,18,21,18,16,24,15,18,33,21,14]],[/^((?:(2|II)\s?|2nd\s|second\s)j(o(?:h(?:n)?)?|n))$/i,'2 John',1,[13]],[/^((?:(2|II)\s?|2nd\s|second\s)k(i(?:n(?:gs)?)?|gs))$/i,'2 Kings',25,[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]],[/^((?:(2|II)\s?|2nd\s|second\s)p(e(?:t(?:er)?)?|t(?:r)?))$/i,'2 Peter',3,[21,22,18]],[/^((?:(2|II)\s?|2nd\s|second\s)s(a(?:m(?:uel)?)?|m))$/i,'2 Samuel',24,[27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25]],[/^((?:(2|II)\s?|2nd\s|second\s)th(es(?:s(?:alonians)?)?))$/i,'2 Thessalonians',3,[12,17,18]],[/^((?:(2|II)\s?|2nd\s|second\s)ti(?:m(?:othy)?)?)$/i,'2 Timothy',4,[18,26,17,22]],[/^((?:(3|III)\s?|3rd\s|third\s)j(o(?:h(?:n)?)?|n))$/i,'3 John',1,[14]],[/^(is(?:a(?:iah)?)?)$/i,'Isaiah',66,[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24]],[/^(j(m|as|ames))$/i,'James',5,[27,26,18,17,20]],[/^(j(e(?:r(?:emiah)?)?|r))$/i,'Jeremiah',52,[19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]],[/^(j(ob|b))$/i,'Job',42,[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]],[/^(j(oe(?:l)?|l))$/i,'Joel',3,[20,32,21]],[/^(j(o(?:h(?:n)?)?|n))/i,'John',21,[51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]],[/^(j(on(?:ah)?|nh))$/i,'Jonah',4,[17,10,10,11]],[/^(j(os(?:h(?:ua)?)?|sh))$/i,'Joshua',24,[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]],[/^(jud(?:e)?)$/i,'Jude',1,[25]],[/^(j(udg(?:es)?|g|dg(?:s)?))$/i,'Judges',21,[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]],[/^(la(?:m(?:entations)?)?)$/i,'Lamentations',5,[22,22,66,22,22]],[/^(l(e(?:v(?:iticus)?)?|v))$/i,'Leviticus',27,[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]],[/^(l(uk(?:e)?|k))$/i,'Luke',24,[80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53]],[/^(m(al(?:achi)?|l))$/i,'Malachi',4,[14,17,18,6]],[/^(m(ark|r(?:k)?|k))$/i,'Mark',16,[45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20]],[/^(m(att(?:hew)?|t))$/i,'Matthew',28,[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]],[/^(mic(?:ah)?)$/i,'Micah',7,[16,13,12,13,15,16,20]],[/^(na(?:h(?:um)?)?)$/i,'Nahum',3,[15,13,19]],[/^(ne(?:h(?:emiah)?)?)$/i,'Nehemiah',13,[11,20,32,23,19,19,73,18,38,39,36,47,31]],[/^(n(u(?:m(?:bers)?)?|m|b))$/i,'Numbers',36,[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]],[/^(oba(?:d(?:iah)?)?)$/i,'Obadiah',1,[21]],[/^(ph(ilem(?:on)?|m))$/i,'Philemon',1,[25]],[/^(ph(hil(?:ippians)?|p))$/i,'Philippians',4,[30,30,21,23]],[/^(pr(ov(?:erbs)?|v))$/i,'Proverbs',31,[33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]],[/^(ps(a(?:lm)?|s(?:lm|m)?|m)(?:s)?)$/i,'Psalms',150,[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]],[/^((?:the\s)?re(?:v(?:elation)?)?)$/i,'Revelation',22,[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]],[/^(r(o(?:m(?:ans)?)?|m))$/i,'Romans',16,[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]],[/^(r(u(?:th)?|th))$/i,'Ruth',4,[22,23,18,22]],[/^((so(?:ng(?:\sof\s(?:so(ngs|lomon)))?|s)?|canticle(\sof\scanticles|s)))$/i,'Song of Solomon',8,[17,17,11,16,16,13,13,14]],[/^(tit(?:us)?)$/i,'Titus',3,[16,15,15]],[/^(z(ec(?:h(?:ariah)?)?|c))$/i,'Zechariah',14,[21,13,10,14,11,15,14,23,17,12,17,14,9,21]],[/^(z(ep(?:h(?:aniah)?)?|p))$/i,'Zephaniah',3,[18,15,20]]],
	
	Patterns={
		Trim:				[/^\s+|\s+$/g,''],
		Normalize: 	[/(\s{2,})/gi,' '],
		Typed:			/(((1(?:st)?|2(?:nd)?|3(?:rd)?|first|second|third|I{1,3})\s?)?([a-zA-Z]+|song\sof\s(?:songs|solomon)|canticle\sof\scanticles)\s(\d{1,3}(?:[:,\-\s]\s?\d{1,3})*))/i,
		Hit: 				/(((1(?:st)?|2(?:nd)?|3(?:rd)?|first|second|third|I{1,3})\s?)?([a-zA-Z]+|song\sof\s(?:songs|solomon)|canticle\sof\scanticles)\s(\d{1,3}(?:[:,\-\s]\s?\d{1,3})+|\d{1,3}[^a-zA-Z0-9]))/gi,
		Alt: 				/(((1(?:st)?|2(?:nd)?|3(?:rd)?|first|second|third|I{1,3})\s?)?([a-zA-Z]+|song\sof\s(?:songs|solomon)|canticle\sof\scanticles)\s(\d{1,3}(?:[:,\-\s]\s?\d{1,3})+))/gi,
		Range: 			/[a-zA-Z]\s(\d{1,3}(?:[:,\-\s]\s?\d{1,3})+|\d{1,3}[^a-zA-Z0-9])$/
	},
	
	Timer,
	
	Failtimer = false,
	
	Total=		0,
	
	Results=	[],
	
	$Wrapper=	'#PopupWrapper',
	
	$Field=		'.BibleSearchField',
	
	$Mask,
	
	$Content,
	
	$Close,
	
	$Trigger,
	
	$Form,
			
	Settings={
		ajax:						true,
		ajaxUrl:				ESVAjax.ajaxurl,
		addSearch:		 	false,
		animateSearch: 	false,
		debug:					false,
		logging:				true,
		validateBook:		true,
		validateChapter:true,
		validateVerse:	true,
		wrapclass:			'popup',
		wraplink:				true,
		reformat:				false,
		recursionLimit: 5,
		closeButton:		{
			src:		ESVAjax.pluginbase+'css/images/closebtn.png',
			width:	'36px',
			height:	'36px',
			style:	'border:none;'
		}
	},	
	
	Methods={
		init: function(options){
			$.extend(Settings,options);
			Total = Books.length;
			initialize_ids();
			if(Settings.debug) debugBooksObject();
			Settings.validateChapter=Settings.validateBook?Settings.validateChapter:false;
			Settings.validateVerse=Settings.validateChapter?Settings.validateVerse:false;
			if(Settings.wrapclass||Settings.wraplink||Settings.reformat){
				$(this).each(function(ind,ele){
					var mrkp = $(this).html();
					$(this).html(mrkp.replace(Patterns.Normalize[0],Patterns.Normalize[1]));	//Fix redundant spacing in text-nodes
					var txt=$(this).text(),
							test=Patterns.Hit.test(txt),
							hits;
					if(test){
						hits=hits_to_objects(txt.match(Patterns.Hit));
						if(Settings.logging){console.log(hits);}
						for(var i=0;i<hits.length;i++){
							validate(hits[i]);
							if(hits[i].valid){
								if(Settings.wrapclass||Settings.wraplink||Settings.reformat){rewrite(hits[i]);}
								$(this).html($(this).html().replace(hits[i].orig,hits[i].rewrote));
								if(Settings.logging){log_replacement(hits[i].orig,hits[i].rewrote);}}}}});}
								
			if(Settings.wraplink){
				$('body').append(build_wrapper());
				$.getScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js',function(){$($Content).draggable({iframeFix:true});});
				$('a.'+Settings.wrapclass).click(function(e){
					e.preventDefault();
					show_scripture($(this).attr('href'));						
				});
			}
			
			if(Settings.addSearch){
				var inputTxt;
				$Field=(parseInt($($Field).size())>0)
					?	'.'+get_unused_class($Field)
					:	$Field;				
				$(get_searchbox()).insertBefore('div.footer > div.nav');				
				if(Settings.animateSearch){
					$($Field).closest('div').fadeIn(500,'swing');
					$($Field).animate({width:300},500,'swing');
				}
				else{
					$($Field).css('width','300px');
					$($Field).closest('div').css({opacity:1});
				}
				
				$($Field).closest('form').submit(function(e){
					e.preventDefault();
					inputTxt= trim($($Field).val());
					if(inputTxt.length<2) return false;
					else if(Patterns.Typed.test(inputTxt)) show_scripture(build_href(inputTxt));
					else alert('"'+inputTxt+'" is invalid');
				});
			}
		}
	},
	
	//Internals		
	trim = function(x){return x.replace(/^\s+|\s+$/g,"");},
	
	log_replacement = function(input,output){console.log('Replacement: "'+input+'" ---> "'+output+'"');},
	
	highest_verse = function(string){
		//return Math.max.apply(null,integers(trim(string.replace(/[^\d]/g,' ').replace(/\s+/g,' ')).split(' ')));
		return maxVal(numbers(trim(string.replace(/[^\d]/g,' ').replace(/\s+/g,' ')).split(' '),true,true));
	},
	
	hits_to_objects = function(input){
		var input = (input instanceof Array)
			? input
			: [input],
		output=new Array;
		while(input.length>0)	output.push({orig:input.shift(), valid:true}); //valid until proven otherwise and discarded.
		return output;
	},
	
	numbers=function(array,intOnly,absOnly){
		var iO = (intOnly===false) ? false : true;
		var aO = (absOnly===false) ? false : true;
		var c=array.length;
		return(typeof array=='object')
			? (function(x){return(x instanceof Array)
				? (function(y){
					var z=[], i=0, t;
					for(i;i<c;i++){
						t=(iO)?parseInt(y[i]):new Number(y[i]);
						if(!isNaN(t)){
							z.push((aO)?Math.abs(t):t);
						}
					}
					return z;
				})(x)
				: (function(y){
					var z={};
					for(i in y){
						t=(iO)?parseInt(y[i]):new Number(y[i]);
						if(!isNaN(t)){
							z[i]=(aO)?Math.abs(t):t;
						}
					}
					return z;
				})(x);
			})(array)
			: (function(x){
				t=(iO)?parseInt(y[i]):new Number(y[i]);
				return(!isNaN(t))
				? false
				: [(aO)?Math.abs(t):t];
		})(array);
	},
	
	maxVal=function(array){return Math.max.apply(Math,numbers(array));},
	
	minVal=function(array){return Math.min.apply(Math,numbers(array));},
	
	untruthy=function(x){return(x===false||typeof(x)=='undefined'||x===[]||x==={}||x==null||(typeof(x)!='string'&&x!='undefined'));},
	
	build_ranges = function(obj){
		var verses=[],x,ys,y,A='<(',B=')><$1(',C=')>',D=')>-<',E=')X',F=' - ',
		struct=((A+(obj.rangeString).replace(/\b(\d+)[:]/g,B)+C).replace(/([,]\)|\<\(\)\>)/g,'')).replace(/(\-\)\>\<)/g,D).replace(/(\>\<)/g,E).replace(/[<>]/g,'').replace(/[)][-]/g,E).replace(/(\-)/g,F).split('X'),
		t=struct.length;
		obj.maxChap=0;
		for(x=0;x<t;x++){
			if(/^[(]/.test(struct[x]))y=Math.max.apply(null,(((struct[x].replace(/[()]/g,'')).replace(/[^0-9]/g,' ')).replace(/\s+/g,' ')).split(' '))
			else{
				ys=struct[x].match(/^(\d+)\(/g);
				y=((typeof ys==='object')&&(ys instanceof Array)&&(ys.length>1))
					? ys.slice(1).max
					: parseInt(ys);
			}
			obj.maxChap=(parseInt(y)>obj.maxChap)
				? parseInt(y)
				: obj.maxChap;
			verses.push([y,struct[x].substring((struct[x].indexOf('(')+1),struct[x].lastIndexOf(')'))]);
		}
		obj.verseRange=verses;
	},
	
	rewrite = function(obj){
		var string=obj.orig,
				tagname=(Settings.wraplink)
					?	'a'
					:	'span',
				atts=[];
		if(Settings.wrapclass) atts.push('class="'+Settings.wrapclass+'"');
		if(Settings.wraplink!=false){
			atts.push('href="'+build_href(string)+'"');
			atts.push('title="View Scripture"');
		}
		var text=(Settings.reformat)
			?	reformat(string)
			:	string;
		var tag='<'+[tagname].concat(atts).join(' ')+'>'+text+'</'+tagname+'>';
		obj.rewrote=tag;
	},
		
	//Validation Subs
	
	validate = function(obj){
		obj.rangeString=trim(new String(obj.orig.match(Patterns.Range).pop())); //identify the "rangeString" property
		obj.bookString=obj.orig.slice(0,(obj.orig).indexOf(obj.rangeString)-1); //use identified range to separate "bookString" property
		if(obj.valid && Settings.validateBook) validate_book(obj);							
		if(obj.valid && Settings.validateChapter) validate_chapter(obj);
		if(obj.valid && Settings.validateVerse) validate_verse(obj);
	},
	
	validate_book = function(obj){
		obj.BookPatternCheck = [];
		for(var s=0; s<Total; s++){
			if(Books[s][0].test(obj.bookString)){
				obj.ValidatedPattern = Books[s][0];
				obj.bookIndex = s;
				return true;
			}
			obj.BookPatternCheck.push(Books[s][0]);
		}
		obj.valid=false;
		obj.FailedAt='BookValidation';
	},
	
	validate_chapter = function(obj){
		obj.chapterCeil=Books[obj.bookIndex][2];
		build_ranges(obj);
		if(obj.maxChap>obj.chapterCeil){
			obj.valid=false;
			obj.FailedAt='ChapterValidation';}
	},
	
	validate_verse = function(obj){
		for(var x=0;x<obj.verseRange.length;x++){
			chap=obj.verseRange[x][0];
			maxVerse=highest_verse(obj.verseRange[x][1]);
			if(maxVerse>Books[obj.bookIndex][3][chap-1]){
				obj.valid=false;
				obj.FailedAt='VerseValidation';}}
		return true;
	},
	
	//DOM Elements
	
	build_wrapper = function(){
		return '<div id="'+($Wrapper.slice(1))+'" style="visibility:hidden;position:fixed;top:0px;left:0px;width:'+$(document).width()+'px;height:'+$(document).height()+'px;text-align:center;">'+(build_mask())+(build_content())+'</div>';		
	},
	
	build_href = function(string){
		return 'http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage='+(string.replace(/\s+/g,'+'));
	},
	
	build_mask = function(){
		return '<div class="'+($Mask.split('.').pop())+'" style="position:absolute;top:0px;left:0px;width:'+($(document).width())+'px;height:'+($(document).height())+'px;background-color:#888888;opacity:.5;filter:alpha(Opacity=80);"></div>';
	},
	
	build_content = function(){
		return '<div class="'+($Content.split('.').pop())+'" style="background-color:white;width:800px;height:75%;position:relative;border:2px solid black;border-radius:8px;margin:50px 5% 50px 5%;padding:8px 8px 8px 8px;text-align:left;"></div>';
	},
	
	build_close = function(){
		return '<a class="'+($Close.split('.').pop())+'" title="Close" style="position:absolute;right:-18px;top:-18px;" href="#"><img src="'+Settings.closeButton.src+'" width="36px" height="36px" style="border:none;" /></a>';
	},
	
	reset_failtimer = function(){
		Timer = null;
		Failtimer = false;
		console.log('Failtimer Reset');
		return true;
	},
	
	set_failtimer = function(ms){
		reset_failtimer();
		Timer = setTimeout(function(){Failtimer=true;},ms);
		console.log('Failtimer Set: '+ms+' ms');
		return true;
	},
	
	show_hovertip = function(href){
		var cback = function(text){alert('Tooltip Callback Reached: '+text);};
		call_ajax(href,'text',5000,cback);
		return true;
	},
	
	call_ajax = function(url,type,limit,callback){
		var calltype = untruthy(type)
			? 'html'
			: type;
		console.log(calltype);
		var callback = (typeof(callback)=='function')
			? callback
			: function(result){console.log(result);};
		var scripture;
		var received = false;
		var data = {
			action: 'esvbiblesearch',
			cookie: encodeURIComponent(document.cookie),
			esvtype: calltype,
			url: url
		};
		
		$.post(Settings.ajaxUrl,data,callback);
		
		set_failtimer(5000);
		
		while(true==false){
			switch(true){
				case received===true:
				reset_failtimer();
				return scripture;
				break;
				
				case Failtimer===true:
				reset_failtimer();
				return false;
				break;
			}
		}		
	},
	
	show_ajax_scripture = function(url){
		//var cback = function(str){alert(str);}//function(scripture){alert('Show Scripture Callback Reached: '+scripture);};
		var cback = function(content){
			var markup=build_close()+content;
			$($Content).html(markup);				
			$($Wrapper).css({visibility:'visible',opacity:0}).animate({opacity:1},450,'swing');				
			$($Close+','+$Mask).click(function(e){
				e.preventDefault();
				$($Wrapper).animate({opacity:0},450,'swing',function(){$($Wrapper).css({visibility:'hidden'});});
			});			
		};		
		call_ajax(url,'html',5000,cback);
		return true;
	},
	
	show_scripture = function(url){
		if(Settings.ajax){return show_ajax_scripture(url);}
		else{
			var markup=build_close()+'<iframe src="'+url+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>';
			$($Content).html(markup);				
			$($Wrapper).css({visibility:'visible',opacity:0}).animate({opacity:1},450,'swing');				
			$($Close+','+$Mask).click(function(e){
				e.preventDefault();
				$($Wrapper).animate({opacity:0},450,'swing',function(){$($Wrapper).css({visibility:'hidden'});});
			});
		}
	},
	
	get_searchbox = function(){
		return '<div style="display:none;float:left;height:18px;"><form method="get" enctype="application/x-www-form-urlencoded" style="padding:0;margin:0;"><input type="text" class="'+$Field.slice(1)+'" maxlength="60" style="float:left;height:13px;width:0px;margin-right:5px;" /><input type="image" src="http://why.jesus.net/WJ-BGEA-USA/file.php/2/Images_and_Graphics/lookup_btn_blu2.gif" value="Search" style="height:18px;width:150px;border:none;" /></form></div>';
	},
	
	//Safety Features
	get_unique_id = function(str){
		var x=0,
				y='',
				str=(str[0]=='#')
					? str.slice(1)
					: str,
				testid=str;
		while(!(parseInt($('#'+testid).size)==0) && x<Settings.recursionLimit){
			testid=str+((x==0)
				?	''
				:	'_'+(++x));
		}
		return testid;
	},
	
	get_unused_class = function(string){
		var x=0,
				y='',
				string=(string[0]=='.')
					? string.slice(1)
					: string,
				testclass=string;
		while(!(parseInt($('.'+testclass).size)==0) && x < Settings.recursionLimit){
			testclass=string+((x==0)
				? ''
				: '_'+(++x));
		}
		return testclass;
	},
	
	initialize_ids = function(){
		if(parseInt($($Wrapper).size())>0) $Wrapper='#'+get_unique_id($Wrapper);
		$Mask = $Wrapper+'>.PopupWrapper';
		$Content = $Wrapper+'>.PopupContent';
		$Close = $Content+'>.PopupClose';
		$Trigger = 'a'+((Settings.wrapclass[0]=='.')?Settings.wrapclass.slice(1):Settings.wrapclass);		
	},
	
	debugBooksObject = function(){
		for(var i in Books){
			console.log(i);
		}
	}
	
	jQuery.fn.bibletool=function(method){
		return (Methods[method])
			?	Methods[method].apply(this,Array.prototype.slice.call(arguments,1))
			:	((typeof method==='object'||!method)?	Methods.init.apply(this,arguments):	false);
	};
})(jQuery);