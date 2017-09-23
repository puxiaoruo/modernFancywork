$(function(){
	
	//全选按钮
	$(":checkbox").prop("checked",true);
	$(".allCheck").click(function(){
		console.log(this.checked);
//		if (!this.disabled) {
			$(":checkbox").prop("checked",this.checked);
//		}
	})
	
	$(".checkbox").click(function(){
		allCheck(this.checked);
	})

	function allCheck(static){
		var $num = 0;
		$(".checkbox").each(function(index,value){
			if (this.checked && !this.disabled) {
				$num++;
			}
		})
		if ($num <  $(".checkbox").length) {
			$(".allCheck").prop("checked",false);
		}else if($num ==  $(".checkbox").length){
			$(".allCheck").prop("checked",true);
		}
	}

	//计算总计   单价与数量的结合
	getZong();
	$(".checkbox").change(function(){
		getZong();
	})
	function getZong(){
		var $count = 0;
		var $price = 0;
		var $zongC = 0;
		var $zongP = 0;
		$(".checkbox").each(function(index,value){
			if (this.checked && !this.disabled) {
				$count = $(this).parents("tr").find("#total").val();
//				console.log($count);
				$price = $(this).parents("tr").find(".nex").text();
				$price = $price.substr(1);
//				console.log(parseInt($price))
//				console.log($(this).parents("tr"));
				$zongC = $zongC + parseInt($count);
				$zongP = $zongP + parseInt($count) * parseInt($price);
			}
			$("b.col").html("&nbsp;" + $zongC + "&nbsp;")
			$("b.col.big").html('￥&nbsp;' + $zongP);
		})
	}
	function checkAll(){
		$(":checkbox").each(function(){
			$(this).attr("checked","true");
		})
	}
	
	function uncheckAll(){
		$(":checkbox").each(function(){
			$(this).removeAttr("checked");
			
		})
	}
	
	//选中删除
	delItem();
	function delItem(){
		$("span.delB.hov").click(function(){
			$(".checkbox").each(function(index,value){
				if (this.checked && !this.disabled) {
					$(this).parents("tr").remove();
					getZong();
				}
			})
		})
	}
	
	//清除失效商品
	delDisable();
	function delDisable(){
		$("span.hov").click(function(){
			$(".checkbox").each(function(index,value){
				console.log(this.disabled)
				if (this.disabled) {
					$(this).parents("tr").remove();
				}
			})
		})
	}
	
	//步计器
	$("table #jia").each(function(index,value){
		$(value).click(function(){
//			console.log(index);
			var $val = $("table #total").eq(index).val();
			if($val >= 0){
				$(value).parents("tr").find(".checkbox").attr("checked","checked");
			}
			if ($val >= 10) {
				$val = 10;
			}else{
				$val++;
			}
			$("table #total").eq(index).val($val);
			getZong();
		})
	})
	$("table #jian").each(function(index,value){
		$(value).click(function(){
			var $val = $("table #total").eq(index).val();
			if ($val <= 1) {
				$(value).parents("tr").find(".checkbox").removeAttr("checked");
			}
			if ($val <= 0) {
				$val = 0;
			}else{
				$val--;
			}
			$("table #total").eq(index).val($val);
			getZong();
		})
	})
	
	//选中添加收藏
	$("span.hov.col").click(function(){
		$(".checkbox").each(function(index,value){
			console.log(index + "=======" + this.disabled);
			if (this.checked&& !(this.disabled)) {
				var $this = $(value);
				collage($this);
			}
		})
	})
	
	
	//添加收藏
	addCollage();
	function addCollage(){
		$("table .coll").each(function(index,value){
			$(this).click(function(){
				var $this = $(value);
				collage($this);
				/*$(value).parents("tr").remove();
//				$(value).parents("tr").hide();
				console.log($("table .coll").length + "长度");
				var $parent = $("<tr class='addcol'></tr>");
				var $td1 = $("<td style='padding-left: 10px;'></td>")
				//获取图片的路径
				var $url = $(this).parents("tr").find("img").prop("src");
				//获取介绍
				var $name = $(this).parents("tr").find(".name").html();
				//取得之前的价格
				var $prePrice = $(this).parents("tr").find(".pre").html();
				//取得现价
				var $nexPrice = $(this).parents("tr").find(".nex").html();
				console.log($(this).parents("tr").find("img").prop("src"));
				console.log($name);
				console.log($prePrice);
				console.log($nexPrice);
				var $img = $("<img class='smal' src=" + $url +" />");
				$img.appendTo($td1);
				$("<span>" + $name +"</span>").appendTo($td1);
				$td1.appendTo($parent);
				$("<td class='text-center'>"+$prePrice+"</td>").appendTo($parent);
				$("<td class='text-center'>"+$nexPrice+"</td>").appendTo($parent);
				$("<td class='text-center'>有货在售</td>").appendTo($parent);
				$("<td class='text-center bag'><span class='toBag'>放入购物袋</span></td>").appendTo($parent);
				$("table.collage").append($parent);*/
			})
		})
	}
	
	function collage($this){
		$($this).parents("tr").remove();
		var $parent = $("<tr class='addcol'></tr>");
		var $td1 = $("<td style='padding-left: 10px;'></td>")
		//获取图片的路径
		var $url = $($this).parents("tr").find("img").prop("src");
		//获取介绍
		var $name = $($this).parents("tr").find(".name").html();
		//取得之前的价格
		var $prePrice = $($this).parents("tr").find(".pre").html();
		//取得现价
		var $nexPrice = $($this).parents("tr").find(".nex").html();
		/*console.log($($this).parents("tr").find("img").prop("src"));
		console.log($name);
		console.log($prePrice);
		console.log($nexPrice);*/	
		var $img = $("<img class='smal' src=" + $url +" />");
		$img.appendTo($td1);
		$("<span>" + $name +"</span>").appendTo($td1);
		$td1.appendTo($parent);
		$("<td class='text-center'>"+$prePrice+"</td>").appendTo($parent);
		$("<td class='text-center'>"+$nexPrice+"</td>").appendTo($parent);
		$("<td class='text-center'>有货在售</td>").appendTo($parent);
		$("<td class='text-center bag'><span class='toBag'>放入购物袋</span></td>").appendTo($parent);
		$("table.collage").append($parent);		
	}
	
	//移至购物车
	$(".toBag").each(function(index,value){
		$(this).on("click",function(){
			console.log(index);
		})
	})
	
	//删除一行
	delTr();
	function delTr(){
		$("table .del").each(function(index,value){
			$(this).click(function(){
				console.log(index);
				var $flag = confirm("确定删除这条信息么？")
				if($flag){
					$(value).parents("tr").remove();
					getZong();
				}
			})
		})
	}
	
	
	//添加收藏显示与否
	$("b.ico1").click(function(){
		var $pos = $(this).css("background-position");
		if ($pos == "0px -258px") {
			$(this).css("background-position","0 -288px");
		}else if($pos == "0px -288px"){
			$(this).css("background-position","0 -258px");
		}
		$("table.collage").fadeToggle();
	})
})