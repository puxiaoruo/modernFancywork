$(function(){
//	var $ = $.noConflict();
	
	$("div.top").load("img/header.html");
	$("div.middle").load("img/footer.html");
	
	var interId = null;
	getTime()
	interId = setInterval(function(){
		getTime();
	},1000)
	
	function getTime(){
		var d = new Date();
		var festival = new Date(2017,9,1);
		var disStar = d.getTime();
		var disEng = festival.getTime();
		var dis = disEng - disStar;
		dis = dis / 1000;
		var days = Math.floor(dis / (60*60*24));
//		alert(typeof days.toString())
//		days = getTimeStyle(days);
		var hours = Math.floor((dis-(days * 60*60*24)) / (60*60));
//		hours = getTimeStyle(hours);
		var minutes = Math.floor((dis - (days * 60*60*24) - (hours * 60 *60)) / 60);
//		minutes = getTimeStyle(minutes);
		var seconds = Math.floor(dis - (days * 60*60*24) - (hours * 60 *60) - (minutes * 60))
//		seconds = getTimeStyle(seconds);
		
//		getTimeStyle(days,hours,minutes,seconds);
		
		function getTimeStyle(time){
			var t = time.toString();
			if (t.length < 2) {
				t = "0" + t;
				return t;
			}
		}
		$.each($("span.time"), function(index,value) {
			switch(index){
				case 0 :
					$(value).html(days);
					break;
				case 1 :
					$(value).html(hours);
					break;
				case 2 :
					$(value).html(minutes);
					break;
				case 3 :
					$(value).html(seconds);
					break;
			}
		});
		var $list = $(".down .nav li");
			var $allW = 0;
			$.each($list,function(){
				var $w = $(this).outerWidth();
				$allW = $allW + $w;
			})
			$(".down .nav").css("width",$allW);
	}
	//步计器
	$("input.jian").click(function(){
		var n = $("input.input").val();
		n--;
		if (n <= 0) {
			n = 0;
		}
		$("input.input").val(n);
	})
	$("input.plus").click(function(){
		var n = $("input.input").val();
		n++;
		if (n >= 10) {
			n = 10;
			$("input.input").val(10)
		}
		$("input.input").val(n);
	})
	
	//切换大图
	$(".small_ico").on("mouseover",".small",function(){
			var $src = $(this).attr("src");
			var $ind = $src.lastIndexOf("/");
			var $ind2 = $src.indexOf("_")
			var $start = $src.substring(0,$ind+1);
			var $mid = $src.substring($ind+1,$ind2);
			var $bigImg = $(".jqzoom").children("img").attr("src");
			var $bidInd2 = $bigImg.indexOf("_");
			var $end = $bigImg.substr($bidInd2);
			var $Big = $(".jqzoom").children("img").attr("jqimg");
			var $BigIndex = $Big.indexOf("_");
			var $BigEnd = $Big.substr($bidInd2);
			console.log($Big);
			$(".jqzoom").children("img").attr("src",$start+$mid+$end);
			$(".jqzoom").children("img").attr("jqimg",$start+$mid+$BigEnd);
	})
	//切换选择的颜色,左边小图也随之改变
	$(".choiCol").click(function(){
		$(this).addClass("bg").siblings(".choiCol").removeClass("bg");
		var $val = $(this).text();
		console.log($val);
		$val = $val.replace(/\s*/g,"");
		
		switch($val){
			case "蓝绿色":
				$(".jqzoom").children("img").attr("src","img/detail/g1_402_536.jpg");
				$(".jqzoom").children("img").attr("jqimg","img/detail/g1_900_1200.jpg");
				$("ul.small_ico").empty().load("img/green.html");
				break;
			case "午夜黑":
				$(".jqzoom").children("img").attr("jqimg","img/detail/black/g1_900_1200.jpg");
				$(".jqzoom").children("img").attr("src","img/detail/black/g1_402_536.jpg")
				$("ul.small_ico").empty().load("img/black.html");
				break;
			case "海军蓝":
				$(".jqzoom").children("img").attr("jqimg","img/detail/blue/g1_900_1200.jpg");
				$(".jqzoom").children("img").attr("src","img/detail/blue/g1_402_536.jpg")
				$("ul.small_ico").empty().load("img/blue.html");
				break;
		}
	})
	
	//固定商品信息
	var $offh = $(".typ .title").offset().top;
	var $w = $(".typ .title").outerWidth();
	$(".typ .title").toFixed($offh);
	
	//固定切换
	$("ul.tp li").click(function(){
		var $index = $(this).index();
		$(this).addClass("active").siblings("li").removeClass("active");
		var $offh = $(".product_info").eq($index).offset().top;
		$("html,body").animate({"scrollTop":$offh},600);
	})
	
	//右边栏
	$(".fix i").hover(function(){
		getPosit(0,$(this));
	},function(){
		getPosit(1,$(this));
	})
	function getPosit(n,obj){
		var $this = obj;
		var $pos = $this.css("background-position");
		var $wid = $this.css("width");
		var $arr = $pos.split(" ");
		var $p;
		if (n == 0) {
			$p = parseInt($arr[0]) - parseInt($wid);
		}else if (n == 1) {
			$p = parseInt($arr[0]) + parseInt($wid);
		}
		$this.css("background-position",$p+"px" + " " + $arr[1])
	}
	//右边栏关闭按钮
	$(".fix .close").click(function(){
		$(".fix").fadeOut();
	})

	//设置抛物线小球的位置
	setBallPosi();
	function setBallPosi(){
		$("button.ico2").click(function(e){
			$(".pao").stop(true,true).fadeIn();
			pubPao(e.clientY,e.clientX);
			var $html = $("i.ico2.car .total").html();
			$("i.ico2.car .total").html(++$html);
		})
		
		function pubPao(t,l){
			var $img = $(".jqzoom").children("img").attr("src");
			$(".pao").children("img").attr("src",$img);
			$(".pao").fly({
		     	start: {top: t, left: l},
		     	end: {top: 280, left: 1260,width:0,height:0},
		        onEnd: function(){
		        	this.destory();
        		}
    		});
    		
		}
		
	}
	
	var $h = $("div.typ .title").offset().top;
	var $w = $("div.typ .title").offset().left;
	$("div.typ .title").toFixed($h,0,$w);
	
	//放大镜
	$(".jqzoom").jqueryzoom({xzoom:410,yzoom:520});	
	
	//回到顶部
	$(".fix i.ico4").click(function(){
		$("body,html").animate({"scrollTop":0},600)
	})
})