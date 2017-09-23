$(function(){
	$("div.top").load("img/header.html");
	
	getList();
	bindDom();
	getFloor();
	
	//创建列表
	function createList(ind,start,end,str){
		console.log(str)
		for (var i = start; i <= end; i++) {
			var $parent = $("<div class='col-lg-4 col-md-6 col-sm-12 bor'></div>");
			var $thumImg = $("<div class='thumbnail addimg'></div>");
			if (str != undefined) {
				$thumImg.append("<img src='img/list"+str+"/g1_315_420("+i+").jpg' />");
			}else if(str == undefined){
				$thumImg.append("<img src='img/list/g1_315_420("+i+").jpg' />");
			}
			
			var $dev = $("<div class='dev'>&nbsp;可售配置</div>");
			var $ml = $("<p class='ml'>5.5ml</p>");
			var $full = $("<div class='fullj'>满减凑单</div>")
			$ml.appendTo($dev);
			$thumImg.append($full);
			$thumImg.append($dev);
			$parent.append($thumImg);
			var $mother = $("<h5>Saint Laurent<br /><br /> 黑管唇釉 405# 5.5ml</h5>");
			var $price = $("<div class='price'>￥<span>278</span></div>")
			$mother.append($price);
			$parent.append($mother);
			$(".row").eq(ind).append($parent);
		}
	}
	
	function getList(){
		$("div.container.mar-top").each(function(index,value){
			
			if (index == 0) {
				createList(index,10,31);
			}else if(index == 1){
				createList(index,14,38,"/star");
			}else if(index == 2){
				createList(index,1,19,"/cream");
			}else if(index == 3){
				createList(index,21,36,"/star");
			}else if(index == 4){
				createList(index,20,23,"/cream");
			}else if(index == 5){
				createList(index,24,26,"/cream");
			}else if(index == 6){
				createList(index,7,11,"/water");
			}else if(index == 7){
				createList(index,12,23,"/water");
			}
		})
	}	
	function bindDom(){	
		var $lens = $(".row").children();
		$.each($lens, function(index,value) {
			$(this).on("mouseenter mouseleave",function(e){
				if (e.type == "mouseenter") {
					$(value).css("border-color","#D8D8D8");
					$(value).find(".fullj").stop(true,true).animate({"bottom":"-24px"},200);
					$(value).find(".dev").stop(true,true).animate({"bottom":0},400);
				}else if (e.type == "mouseleave") {
					$(value).css("border-color","transparent");
					$(value).find(".fullj").stop(true,true).animate({"bottom":0},400);
					$(value).find(".dev").stop(true,true).animate({"bottom":"-58px"},200);
				}
			});
		})
	}
	
	//楼层实现
	function getFloor(){
		console.log($("ul.breadcrumb.addul a").length);
		$("ul.addul li").each(function(index,value){
			$(this).click(function(){
				console.log(index + "  index");
				$(value).find("a").addClass("active");
				$(value).siblings("li").find("a").removeClass("active");
				var $scrT = $("div.container.floor").eq(index).offset().top;
				$("body,html").animate({"scrollTop":$scrT},600)
			})
		})
		
		$(window).scroll(function(){
			var $st = $(this).scrollTop();
//			console.log($st + "==scrollTop");
			$("div.container.floor").each(function(index,value){
				if ($st >= $(value).find(".title").offset().top) {
					$("ul.addul li").eq(index).find("a").addClass("active");
					$("ul.addul li").eq(index).siblings("li").find("a").removeClass("active");
				}
			})
		})
	}
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
	$(".fix .clo").click(function(){
		$(".fix").fadeOut();
	})
	$(".fix i.ico4").click(function(){
		$("body,html").animate({"scrollTop":0},600)
	})
	
	//固定定位
	var $oH = $("div.container.addcon").offset().top;
	var $oW = $("div.container.addcon").offset().left;
	$("div.container.addcon").toFixed($oH,20,$oW);
})
