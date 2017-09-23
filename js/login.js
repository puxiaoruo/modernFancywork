if (window.addEventListener) {
	window.addEventListener("load",init);
}else if (window.attachEvent) {
	window.attachEvent("onload",init);
}

function init(){
	var p = document.getElementsByClassName("tabs")[0];
	var tabs = p.getElementsByTagName("a");   //手机号登录/密码登录
	var conts = document.getElementsByClassName("form")[0];  
	var t_conts = conts.getElementsByClassName("t-cont");//手机号登录密码登录相应的切换内容
	var lg_types = document.getElementsByClassName("login-type");  //登录方式
	var forms = document.getElementsByClassName("form"); //登录方式的切换
	var telNum = document.getElementById("telNum");  //手机号input
	var telShow = document.getElementsByClassName("show");
	var inputs = document.getElementsByTagName("input");
	var ver_pic = document.getElementById("ver-pic");
	var ver_tel = document.getElementById("ver_tel");
	var rands = []; //随机验证码
	var index = 0;
	var ind = 0;
	
	var userTel = new Set(["15225958097"]);     //模拟用户数据库
	var user = new Map([["15225958097","123456"]])
	
	renderDom();
	bindDom();
	var ran = randomVer();
	
	/*$("input#sub_tel").click(function(){
		console.log("xiewenting");
		if (($("#telNum").val().length != 0) && ($("#auth-code").val().length != 0)) {
			console.log("xiewenting");	
			window.location.href = "../index.html";
		}
	})*/
	
	
	function renderDom(){
		//登录切换
		for (var i = 0; i < tabs.length; i++) {
			forms[i].style.display = "none";
			!function(i){
				tabs[i].onclick = function (){
					goSlider(i);
				}
				lg_types[i].onclick = function(){
					goCont(i);
				}
			}(i)
			t_conts[i].style.display = "none";
			forms[ind].style.display = "block";
		}
		tabs[index].className = "active";
		t_conts[index].style.display = "block";
		forms[ind].style.display = "block";
	}
	
	function bindDom(){
		//单击提交按钮
		$(".sub").click(function(){
			var $val = $("#telNum").val();
			setCookie("用户名",$val);
		})
		
		//cookie的设置
		
		function setCookie(name,value,day,path){
			var cookieText = name + "=" + value;
			if(day>0){
				var d=new Date();
				d.setDate(d.getDate()+day)
				cookieText+=";expires="+d;	}
			if(path){
				cookieText+=";path="+path;
			}
			document.cookie=cookieText;
		}
		
		function getCookie(name){
			var start=0;
			var end=0;
			if(document.cookie.indexOf(name+"=")!=-1){
				start=document.cookie.indexOf(name+"=");		
				end=document.cookie.indexOf(";",start);	
				if(end==-1){	end=document.cookie.lenght;}
			   return document.cookie.substring(start+name.length+1,end);
			}		
		}

		function delCookie(name){
			document.cookie=name+"=;expires="+new Date(0);
		}
		
		
		getPublic();
		function getPublic(){
			var $tel = changeTop("input#telNum","#tel-show");
			var $code = changeTop("input#auth-code","#auth-show");
		}
		function changeTop(inp1,inp2){
			$(inp1).focus(function(){
				$(inp2).css("top","-8px");
			});
			$(inp1).blur(function(){
				var val = $(inp1).val();
				if (inp1 == "input#verif") {
					if ($(inp1).val()==ran) {
						$(".ico2").css({"display":"block","background-position":"-220px 0"})
						return true;
					}else{
						$(".ico2").css({"display":"block","background-position":"-260px 0"})
						return false;
					}
				}
				if (val != "") {
					console.log(inp1 + "input");
					$(inp2).css("top","-8px");
					if (inp1 == "input#telNum") {
						return loginJudge(val);
					}
					if (inp1 == "#auth-code") {
						$(inp1).val()
					}
				}else if(val == ""){
					$(inp2).css("top","10px");
					return false;
				}
			});
			//设置底部宽度
			var $list = $(".down .nav li");
			var $allW = 0;
			$.each($list,function(){
				var $w = $(this).outerWidth();
				$allW = $allW + $w;
				console.log($w + "========================================>")
			})
			$(".down .nav").css("width",$allW);
			
		
			ver_tel.onclick = function(){
				cliBut();
			}
			function cliBut(){
				dalyNum();
//				var $ver = randomVer()
//				alert(randomVer());
				changeTop("#auth-code");
			}
			
			
			var count = 30;
			function dalyNum(){
				var interId = setInterval(function(){
					count--;
					ver_tel.value = count + "s";
					ver_tel.disabled = true;
					if (count <= 0) {
						clearInterval(interId);
						ver_tel.value = "重新获取";
						ver_tel.disabled = false;
						count = 30;
						console.log(ver_tel.disabled);
					}
				},1000);
				
			}
			
			function loginJudge(str){
				console.log(str);
				var telReg = /^1\d{10}$/;
				if (telReg.test(str)) {
					$(".error#tel-error").css("display","none");
					if(userTel.has(str)){
						console.log("已经有这个手机号了！");
					}else{
						$(".new-user#tel-newu").css("display","block");
						$(".inp#verific").css("display","block");
						changeTop("input#verif","#verif-code");
						userTel.add(str);
						console.log(userTel);
					}
					return true;
				}else{
					$(".error#tel-error").css("display","block");
					console.log("请输入一个正确的手机号");
					return false;
				}
			}
		}
		
	}
	
	function goCont(num){
		if (num >= lg_types.length-1) {
			num = num-1;
		}else if(num<= 0){
			num = num + 1;
		}
		forms[ind].style.display = "none";
		forms[num].style.display = "block";
		ind = num;
	}
	
	function goSlider(num){
		tabs[index].className = "";
		tabs[num].className = "active";
		t_conts[index].style.display = "none";
		t_conts[num].style.display = "block";
		index = num;
	}
	
	function randomVer(){
		//去掉z Z 0 o I
		var str = "abcdefghijklmnpqrstuvwxyABCDEFGHJKLMNOPQRSTUVWXY123456789";
		var arr = str.split("");
		for (var i = 0; i < 5; i++) {
			var randIndex = Math.floor(Math.random()*arr.length);
			rands.push(arr[randIndex]);
		}
		var ver_picVal = rands.join("")
		ver_pic.innerHTML = ver_picVal;
		return ver_picVal;
	}
	
	function randColor(){
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return "color:rgb(" + r + "," + g + "," + b +")";
	}
	
}
