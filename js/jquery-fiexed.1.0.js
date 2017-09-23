;(function($){
	$.fn.extend({
		"toFixed" : function(h,t,w){
			this.each(function(index,value){
				$(window).scroll(function(){
					var $scrT = $(this).scrollTop();
					if($scrT >= h){
						$(value).css({"position" : "fixed","top":-t,"left":w,"width":1000,"z-index":999});
					}else{
						$(value).css({"position" : "static"});
					}
				})
			})
		},
		"toTop" : function(opt){
			var DEFAULE = {
				"offsetHeight" : 200,
				"time": 600
			}
			var settings = $.extend(DEFAULE,opt || {});
//			var $h = h || 200;
			this.each(function(index,value){
				$(window).scroll(function(){
					var $sT = $(this).scrollTop();
					if ($sT >= settings.height) {
						$(value).fadeIn(settings.time);
					}else{
						$(value).fadeOut(settings.time);
					}
				})
				$(value).click(function(){
					$("body,html").animate({"scrollTop":0},settings.time);
				})
			})
		},
		"modalBox" : function(opt){
			/*var DEFAULE = {
				""
			}*/
			modalBox();
			function modalBox(){
				var $wH = $(window).outerHeight();
				var $wW = $(window).outerWidth();
				var $dH = $("div.modalBox").outerHeight();
				var $dW = $("div.modalBox").outerWidth();
			}
			$(window).resize(function(){
				modalBox();
			})
		}
	})
})(jQuery)
