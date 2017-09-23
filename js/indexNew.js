if (window.addEventListener) {
	window.addEventListener("load",init);
}else if (window.attachEvent) {
	window,attachEvent("onload",init);
}
function init(){
	var ul = document.getElementsByClassName("left")[0];
	var lis = ul.getElementsByTagName("li");
	var s_bag = document.getElementsByClassName("s-bag")[0];
	var myshow = document.getElementById("myshow");
	var tria = document.getElementById("tria");
	/*分类导航*/
	var type = document.getElementById("types");
	var types = type.getElementsByClassName("type");
	var detais = [];
	
	renderDom();
	bindDom();
	doMain();
	
	function doMain(){
		$("input#search").keyup(function(){
			$val = $(this).val();
			$.ajax({
				type:"get",
				url:"http://search.xiu.com/ajax/autocomplete.htm?jsoncallback=?&q=" + $val + "&limit=10",
				async:true,
				dataType:"jsonp",
				success:function(res){
					var $data = res;
					$("ul.search").empty();
					$.each($data, function(i,v) {
						var $li = $("<li>");
						$li.html($data[i]["matchValue"]);
						$("ul.search").append($li);
						console.log($data[i]["matchValue"]);
					});
				}
			});
		})
	}
	
	
	function renderDom(){
		//header部分
		lis[1].onmouseover = function (){
			s_bag.style.display = "block";
			this.style.backgroundColor = "#fff";
			this.style.color = "red"
		}
		lis[1].onmouseout = function (){
			s_bag.style.display = "none";
			this.style.backgroundColor = "";
		}
		lis[2].onmouseover = function (){
			myshow.style.display = "block";
			this.style.backgroundColor = "#fff";
			this.style.color = "#D50215";
			tria.src = "img/index/向上边框三角.png";
		}
		lis[2].onmouseout = function (){
			myshow.style.display = "none";
			this.style.backgroundColor = "";
			this.style.color = "#d7d7d7";
			tria.src = "img/index/向下边框三角.png";
		}
		
		/*分类导航*/
		for (var i = 0; i < types.length; i++) {
			var detail = document.createElement("div");
			detail.className = "detail";
			var lf = types[i].offsetLeft + types[i].offsetWidth - types[i].offsetWidth;
			if(lf>=(type.offsetWidth - 702)){
				lf = type.offsetWidth - 702;
			}
			detail.style.left = lf + "px";
			type.appendChild(detail);
			detais.push(detail);
		}
		/*在tab切换中添加内容*/
		/*var $p = $("<p></p>");
		$p.html("<h5>女士包袋:</h5><span>频道精选</span>");
		$(".detail").append($p);
		var $p2 = $("<p></p>");
		var $s = "";
		for (var i = 0; i < 6; i++) {
			var $span = "<span style='color:#000; padding:0 5px'>手提包</span>&nbsp;|";
			$s = $s + $span;
		}
		$p2.html($s);
		$(".detail").append($p2);
		$(".detail").append($p2);
		$(".detail").append($p2);
		var $s1 = "";
		for (var i = 0; i < 6; i++) {
			var $span = "<span style='color:#000; padding:0 5px'>钱包/零钱包</span>&nbsp;|";
			$s1 = $s1 + $span;
		}
		var $p3 = $("<p></p>");
		$p3.html($s1);
		$(".detail").append($p3);
		
		$("ul.shejiao li a").mouseenter(function(){
			if ($(this).index() == 0) {
				$(this).find(".ico5").stop(true,true).fadeIn();
			}
			$strPos = $(this).css("background-position");
			var $arr = $strPos.split(" ");
			$(this).css("background-position",$arr[0]+" -263px");
		}).mouseleave(function(){
			if ($(this).index() == 0) {
				$(this).find(".ico5").stop(true,true).fadeOut();
			}
			$(this).css("background-position",$strPos);
		})*/
		//汽车hover
		$("h3.zhe").mouseenter(function(){
			$(this).children(".zhezhao").fadeIn();
		}).mouseleave(function(){
			$(this).children(".zhe").fadeOut();
		})
		//设置底部导航的宽度
		var $list = $(".down .nav li");
		var $allW = 0;
		$.each($list,function(){
			var $w = $(this).outerWidth();
			$allW = $allW + $w;
			console.log($w + "========================================>")
		})
		$(".down .nav").css("width",$allW);
			
	}
	function bindDom(){
		for (var i = 0; i < types.length;i++) {
			!function(i){
				types[i].onmouseover = function (){
					types[i].setAttribute("style","background-color: #fff;border-color:#D7D7D7;border-bottom: 1px solid #fff;");
					detais[i].style.display = "block";
					detais[i].style.backgroundColor = "#fff";
				}
				types[i].onmouseout = function (){
					types[i].setAttribute("style","border-color:#f7f7f7");
					detais[i].style.display = "none";
				}
			}(i)
		}
		//优惠移动
		$(".favorable ul li").hover(function(){
			$(this).stop(true,true).animate({"left":"-20px"},600);
		},function(){
			$(this).stop(true,true).animate({"left":"0"},600);
		})
		
		//最新
		var zxLn = $("ul.zuixin li").length;
		for (var i = 0; i < zxLn; i++) {
			if (i >= 2) {
				$("ul.zuixin li:nth-child(" + (i+1) + ")").css("margin-top","40px");
			}
			if (i >= zxLn-2) {
				$("ul.zuixin li:nth-child(" + (i+1) + ")").css("margin-bottom","20px");
			}
		}
		$("ul.zuixin li").hover(function(){
			$(this).children("img.scale").css({"transform":"scale(1.02)","transition":"all 0.6s ease","position":"relative"})
		},function(){
			$(this).children("img.scale").css({"transform":"scale(1)","position":"none"})
		})
		
		//豪华车
		$("div.car").hover(function(){
			$(this).children("div.zhezhao").fadeIn();
		},function(){
			$(this).children("div.zhezhao").fadeOut();
		})
		
		//尖获  遮罩层
		shade();
		function shade(){
			var $liLn = $("ul.jianhuo li").length;
			console.log($liLn + "$liLn");
			for (var i = 0; i < $liLn;i++) {
				if (i >= 6 && i <= 8) {
					$("ul.jianhuo li:nth-child("+ (i+1) + ")").css("margin-top","50px");
				}
			}
			$("ul.jianhuo li").bind("mouseenter mouseleave",function(e){
				var $w = $(this).outerWidth();
				var $h = $(this).outerHeight();
				var $k = $h/$w;
				var $pagX = e.pageX;
				var $pagY = e.pageY;
				var $offT = $(this).offset().top;
				var $offL = $(this).offset().left;
				console.log($k);
				var $k0 =  ((e.pageY - $offT) - $h/2) / ((e.pageX - $offL) - $w/2);
				console.log($k0);
				var direction = "";
				if ($k0 > -$k && $k0 < $k) {
					if (((e.pageX - $offL) - $w/2) > 0) {
						direction = "right";
						console.log("right");
					}else{
						direction = "left";
						console.log("left");
					}
				}else{
					if (((e.pageY - $offT) - $h/2) > 0) {
						direction = "bottom";
						console.log("bottom");
					}else{
						direction = "top";
						console.log("top");
					}
				}
				if (e.type == "mouseenter") {
					switch(direction){
						case "top":
							$(this).children(".zhezhao").css({"top":-$h,"left":0});
							break;
						case "left":
							$(this).children(".zhezhao").css({"top":0,"left":-$w});
							break;
						case "right":
							$(this).children(".zhezhao").css({"top":0,"left":$w});
							break;
						case "bottom":
							$(this).children(".zhezhao").css({"top":$h,"left":0});
							break;
					}
					$(this).children(".zhezhao").stop(true,true).animate({"top":0,"left":0},"fast");
				}else if (e.type == "mouseleave") {
					switch(direction){
						case "top":
							$(this).children(".zhezhao").stop(true,true).animate({"top":-$h},"fast");
							break;
						case "left":
							$(this).children(".zhezhao").stop(true,true).animate({"left":-$w},"fast");
							break;
						case "right":
							$(this).children(".zhezhao").stop(true,true).animate({"left":$w},"fast");
							break;
						case "bottom":
							$(this).children(".zhezhao").stop(true,true).animate({"top":$h},"fast");
							break;
					}
				}
			})
		}
		//楼梯
		$("div.cod").click(function(){
			$("div.modal").fadeIn();
		});	
		$("div.modalBox").click(function(){
			$("div.modal").fadeOut();
		})
		$("div.elevator").hover(function(){
			$(this).stop(true,true).animate({"right":0},600);
		},function(){
			$(this).stop(true,true).animate({"right":"-60px"},600);
		})
		$("div.elevator li").click(function(){
			var $index = $(this).index();
			var $top = $(".floor").eq($index).offset().top;
			console.log($(".floor").eq($index));
			console.log($top);
			$("body,html").animate({"scrollTop" : $top},1000);
		});
		$("div.elevator .toTop").click(function(){
			$("body,html").animate({"scrollTop" : 0},1000);
		})
		$(window).scroll(function(){
			$scrT = $(window).scrollTop();
			$wH = $(window).outerHeight();
			if ($scrT > $wH) {
				$("div.elevator").fadeIn();
				$("div.cod").fadeIn();
			}else{
				$("div.elevator").fadeOut();
				$("div.cod").fadeOut();
			}
			$.each($(".floor"), function(index,value) {
				if (($scrT + $wH/2) >= value.offsetTop) {
					$("div.elevator li").eq(index).css("color","orange").siblings("li").css("color","");
				}else{
					$("div.elevator li").eq(index).css("color","")
				}
			});
		})
		//模态框
		modalBox();
		function modalBox(){
			var $wH = $(window).outerHeight();
			var $wW = $(window).outerWidth();
			var $dH = $("div.modalBox").outerHeight();
			var $dW = $("div.modalBox").outerWidth();
			$("div.modalBox").css({"top": ($wH - $dH)/2,"left":($wW - $dW)/2});
		}
		$(window).resize(function(){
			modalBox();
		})
	}
}