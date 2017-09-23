if (window.addEventListener) {
	window.addEventListener("load",init);
}else if (window.attachEvent) {
	window,attachEvent("onload",init);
}
function init(){
	var slider = document.getElementsByClassName("banners")[0];
	console.log(slider +"slider");
	var banners = slider.getElementsByClassName("banner");
	var content = slider.getElementsByClassName("container")[0];
	var index = 0;
	var interId = null;
	var lis = null;
	
	
	renderDom();
	bindDom();
	auto();
	
	function renderDom(){
		console.log(banners[0].offsetWidth*banners.length + "oooooooooooooo")
		content.style.width = banners[0].offsetWidth*banners.length + "px";
		var u = document.createElement("ul");
		u.className = "pages";
		var str = ""
		for (var i =0; i < banners.length; i++) {
			str = str + "<li class = 'pager'><li>";
		}
		u.innerHTML = str;
		slider.appendChild(u);
		lis = document.getElementsByClassName("pager");
		lis[index].className = "pager active";
		for (var i = 0; i < lis.length; i++) {
			!function(i){
				lis[i].onclick = function(){
					goSlider(i);
				}
			}(i)
		}
	}
	
	function bindDom(){
		$(".banners").mouseenter(function(){
			clearInterval(interId);
		}).mouseleave(function(){
			auto();
		})
	}
	
	function goSlider(num){
		console.log(lis.length + "lis");
		if (num > banners.length-1) {
			num = 0;
		}
		content.style.left = -banners[0].offsetWidth * num + "px";
		lis[index].className = "pager";
		lis[num].className = "pager active";
		index = num;
	}
	
	function auto(){
		interId = setInterval(function(){
			var n = index;
			n++;
			goSlider(n);
		},4000);
	}
	
	
	
}
