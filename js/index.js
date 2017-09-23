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
//			console.log(type.offsetWidth);
			if(lf>=(type.offsetWidth - 702)){
				lf = type.offsetWidth - 702;
			}
			console.log(lf + "====================");
			detail.style.left = lf + "px";
			type.appendChild(detail);
			detais.push(detail);
		}
			
	}
	function bindDom(){
		for (var i = 0; i < types.length;i++) {
			!function(i){
				types[i].onmouseover = function (){
//					console.log(i);
					types[i].setAttribute("style","background-color: #fff;border-color:#D7D7D7;border-bottom: 1px solid #fff;");
//					types[i].setAttribute("style","border-bottom: 1px solid #f7f7f7;");
					detais[i].style.display = "block";
					detais[i].style.backgroundColor = "#fff";
				}
				types[i].onmouseout = function (){
					types[i].setAttribute("style","border-color:#f7f7f7");
					detais[i].style.display = "none";
				}
			}(i)
		}
	}
}