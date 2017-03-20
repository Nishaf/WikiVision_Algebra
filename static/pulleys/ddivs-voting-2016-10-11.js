/////////////////////////////////////
//
// On both page load and ans_**.pho page load: 
// doAndTidyMath()
//
/////////////////////////////////////

function doAndTidyMath(target) {	
	// This triggers ASCIIMathTexKaTeX, then KaTEX:
	if (typeof(AMfunc) != "undefined") {
		AMfunc(true);
	}	
	// doAlign vars:
	var eqSignPos = '';
	var selector = '';	
	doAlign = function(target) {
		if(target>-1){
			thisTarget = document.getElementById('target'+target);
			selector = document.getElementById('target'+target).getElementsByClassName('alignEquals');
		} else  {
			selector = document.getElementsByClassName('alignEquals');
		}
		for(i=0;i<selector.length;i++) {
			ps = selector[i].getElementsByTagName('p');
			for(k=0;k<ps.length;k++) {
				if(k == 0) {
					if(ps[0].getElementsByClassName('mrel')[0]) {
						parentPos = ps[0].getElementsByClassName('mrel')[0].parentNode.offsetLeft;
						mrelPos = ps[0].getElementsByClassName('mrel')[0].offsetLeft;
						eqSignPos = mrelPos - parentPos;
					}
				} else {
					ps[k].style.marginLeft = eqSignPos+"px";
				}
			}
		}
	}		 
	doAlign(target);
	// Fit math to container width	
	fitWidth = function(){
		var fitWidths = document.getElementsByClassName("fitToWidth");	
		for(i=0;i<fitWidths.length;i++) {			
			var containerWidth = fitWidths[i].parentElement.clientWidth;
			 var fontSize=parseInt(window.getComputedStyle(fitWidths[i], null).getPropertyValue('font-size'));
			 for(var j=0; j<10; j++){
				if(fitWidths[i].clientWidth > containerWidth ) {	
					fitWidths[i].style.fontSize = --fontSize+"px";
				}
			 }
			 // Doesn't play nicely with tables, so set this for safety.
			fontSize = Math.max(16,fontSize)-1;
			fitWidths[i].style.fontSize = fontSize+"px";		 
			 
		}
	};
	fitWidth();
	// Fit images to container width	
	fitImgs = function(target){
		var imgs = document.getElementsByTagName("img");		
		for(i=0;i<imgs.length;i++) {
			var thisLeft = imgs[i].offsetLeft;				
			if(target>-1){
				thisTarget = document.getElementById('target'+target);
				var containerLeft = thisTarget.offsetLeft;
				var containerWidth = thisTarget.clientWidth;				
				var imgFinalWidth = (containerLeft + containerWidth) - thisLeft;
			} else {
				var containerWidth = imgs[i].parentNode.clientWidth;
				if(containerWidth == 0) { // for <a href..><img ..></a> cases
					containerWidth = imgs[i].parentNode.parentNode.clientWidth;			
				}
				var imgFinalWidth = containerWidth;
			}
 		    var imgWidth=imgs[i].width;
			if(imgWidth > imgFinalWidth && imgFinalWidth != 0) {	
				imgs[i].setAttribute("width",imgFinalWidth);
				imgs[i].setAttribute("height", "auto");
			}
		}
	};
	fitImgs(target);		
	// Alignment of class "intmath" equal signs
	var newHTML = '';
	function doAlignIntM(target) {		
		if(target>-1){
			thisTarget = document.getElementById('target'+target);
			selector = document.getElementById('target'+target).getElementsByClassName('alignEqIntM');
		} else  {
			selector = document.getElementsByClassName('alignEqIntM');
		}		
		for(i=0;i<selector.length;i++) {
			ps = selector[i].getElementsByTagName('p');
			for(k=0;k<ps.length;k++) {
				if(k == 0) {
					parentPos = ps[0].parentNode.offsetLeft;
					if(ps[0].className == "intmath") {
						newHTML = ps[0].innerHTML.replace('=', '<span class="wrapEq">=</span>');
						ps[0].innerHTML = newHTML;
						eqSignPos = ps[0].getElementsByClassName('wrapEq')[0].offsetLeft - parentPos;
					} else {
						newHTML = ps[0].getElementsByClassName('intmath')[0].innerHTML.replace('=', '<span class="wrapEq">=</span>');
						ps[0].getElementsByClassName('intmath')[0].innerHTML = newHTML;
						eqSignPos = ps[0].getElementsByClassName('intmath')[0].getElementsByClassName('wrapEq')[0].offsetLeft - parentPos;
					}
				} else {
					ps[k].style.marginLeft = eqSignPos+"px";
				}
			}
		}			
	}
	doAlignIntM(target);
}

function load_xml_doc(url_to_load, target_div){
	var xmlhttp;
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			document.getElementById(target_div).innerHTML=xmlhttp.responseText;
			doAndTidyMath(target_div.slice(6));			
			if(typeof(doFun) == "function"){
				doFun(target_div.slice(6));
			}
		}
	}
	xmlhttp.open("GET",url_to_load,true);
	xmlhttp.send();
}

try {
	var ajaxTriggers = document.getElementsByClassName("ajaxtrigger");
	var ans = [], targetArr = [];
	var tpn;
	for(var i = 0; i<ajaxTriggers.length; i++){
	  ajaxTriggers[i].addEventListener("click", function(e) {
		e.preventDefault();	
		tpn = this.parentNode.id.slice(3);
		ans[tpn] = document.getElementById("ans"+tpn);
		targetArr[tpn] = document.getElementById("target"+tpn);
		if(targetArr[tpn] === null) {
			newDiv = document.createElement('div');
			newDiv.id = "target"+tpn;
			newDiv.className = "ddown";
			newDiv.innerHTML = '<div class="spinnerWrapWrap"><div class="spinnerWrap arc-rotate2"><div class="spinner"><div class="arc"></div></div></div>Loading...</div>';
			ans[tpn].parentNode.insertBefore(newDiv, ans[tpn].nextSibling);
			load_xml_doc(this.href, 'target'+tpn);			
			this.getElementsByClassName("sprite dnArr")[0].className = "sprite upArr";
		} else {
			if(targetArr[tpn].className == "ddown") {
				targetArr[tpn].className = "displayNone";
				this.getElementsByClassName("sprite upArr")[0].className = "sprite dnArr";
			} else {
				targetArr[tpn].className = "ddown";
				this.getElementsByClassName("sprite dnArr")[0].className = "sprite upArr";
			}
		}
	  });   
	}
	var showHides = document.getElementsByClassName("showHide");
	if(showHides.length>0) {		
		var ps = document.getElementsByTagName("p");
		var k=0;
		for(i=0;i<ps.length;i++){				
			if(ps[i].className.indexOf("showHideButt")>-1) {				
				ps[i].id="shb"+k;
				ps[i].addEventListener("click", function() {
					if(showHides[this.id.slice(3)].style.display !='block') {
						showHides[this.id.slice(3)].style.display='block';
						this.getElementsByTagName("span")[0].className = "sprite upArr";					
					} else {
						showHides[this.id.slice(3)].style.display='none';
						this.getElementsByTagName("span")[0].className = "sprite dnArr";
					}
				});		
				k++;
			}
		}
	}
	var hambarg = document.getElementById("hambarg");
	var links = document.getElementById("links");
	var srchWrap2 = document.getElementById("srchWrap2");
	var fadeTimer;
	function doFade(elem, dir) {		
		op = 1*elem.style.opacity;
		if(dir == "in" &&  op < 1) {
			elem.style.display = "block";
			elem.style.opacity = op + 0.1;
		} else if(dir == "out" && op > 0.11) { //0.11 for wretched iPad...
			elem.style.opacity = op - 0.1;		
		}  else {
			window.clearTimeout(fadeTimer);
			if(dir == "out") {
				elem.style.display = "none";
			}
			return;
		}
		fadeTimer = setTimeout(function () {
			doFade(elem, dir);
		}, 50);			
	}
	
	if( hambarg) {	
		hambarg.addEventListener("click", function() {
			if(links.style.display != "block") {
				links.style.display = "block";	
				links.className = "links";
				closeBox = document.getElementById("closeBox");
				closeBox.className = '';
				linksInsert.appendChild(links);
				linksComments.className = "displayNone";
				linksPromos.className = "displayNone";
				if( srchWrap2 && linksInsert.contains(srchWrap2) ) {
					document.body.appendChild(srchWrap2);
					srchWrap2.className = "displayNone";				
				}				
			} else {
				links.style.display = "none";
				linksContentWrap.insertBefore(links,linksContentWrap.childNodes[0]);
			}
		});	
		if(typeof(closeBox)!="undefined") {		
			closeBox.addEventListener("click",function(){
				links.style.display = "none";
				linksPromos.className = '';
				if( srchWrap2 ) {
					srchWrap2.className = "displayNone";
				}
				linksContentWrap.insertBefore(links,linksContentWrap.childNodes[0]);
			});		
		}
	}
	
	var srchDiv = document.getElementById('srchWrap');
	if(srchDiv) {	
		clone = srchDiv.cloneNode(true);		
		clone.id = "srchWrap2";
		clone.className = "displayNone";
		document.body.appendChild(clone);
		srchWrap2 = document.getElementById('srchWrap2');
		srchWrap2.getElementsByTagName("form")[0].id="cse-search-box2";
		srchWrap2.getElementsByTagName("input")[3].id="googInput2";	
		topSrchButt.addEventListener("click", function() {
			if( srchWrap2.className == "displayNone") {
				if( linksInsert.contains(links) ) {
					links.style.display = "none";
					linksPromos.className = '';
					srchWrap2.className = "displayNone";				
					linksContentWrap.insertBefore(links,linksContentWrap.childNodes[0]);				
				}
				linksInsert.appendChild(srchWrap2);
				srchWrap2.className = "srchWrap";
				googInput2.focus();
			} else {
				document.body.appendChild(srchWrap2);
				srchWrap2.className = "displayNone";
			}
		});	
	}
	
	window.addEventListener("resize",function(){		
		if(hambarg && links) { 
			if(window.innerWidth > 1023) {
				linksContentWrap.insertBefore(links,content);				
				if(content.clientWidth > 480) {
					links.removeAttribute("style");
				}
				if(typeof(closeBox)!="undefined") {
					closeBox.className = 'displayNone';
				}
				linksComments.className = '';
				linksPromos.className = '';
			}
		}
		fitImgs(target);
	});	
	// Main page load case:
	var target = -1;
	doAndTidyMath(target);	
} catch(e) {
	links = document.getElementById("links");
	if(links) {
		var newDiv = document.createElement('div');
		newDiv.innerHTML = '<h1 class="dred">IE8 Detected!</h1><h3 class="dred">This site does not work well on old browsers. Please update your version of Internet Explorer...'+e+'</h3>';
		links.parentNode.insertBefore(newDiv, links);	
	}
}
//
if (window.self !== window.top) {
  window.top.location.href = window.location.href;
}
//
function Set_Cookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : "");
}

function Get_Cookie(check_name) {
  var a_all_cookies = document.cookie.split(';');
  var a_temp_cookie = '';
  var cookie_name = '';
  var cookie_value = '';
  var b_cookie_found = false;
  for (i = 0; i < a_all_cookies.length; i++) {
		a_temp_cookie = a_all_cookies[i].split('=');
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		if (cookie_name == check_name) {
			 b_cookie_found = true;
			 if (a_temp_cookie.length > 1) {
				  cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''))
			 }
			 return cookie_value;
			 break
		}
		a_temp_cookie = null;
		cookie_name = '';
  }
  if (!b_cookie_found) {
		return null;
  }
}	