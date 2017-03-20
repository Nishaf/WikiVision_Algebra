function loadScript(t,e){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.readyState?a.onreadystatechange=function(){("loaded"==a.readyState||"complete"==a.readyState)&&(a.onreadystatechange=null,e&&"function"==typeof e&&e())}:a.onload=function(){e&&"function"==typeof e&&e()},a.src=t,document.head.appendChild(a)}
loadScript("pulleys/ASCIIMathTeXKaTeX-2016-06-17.min.js", function() { 
 loadScript("pulleys/katex.minjs-2017-13-01.js", function() { 
  loadScript("pulleys/ddivs-voting-2016-10-11.js", function() { 
   loadScript("pulleys/jquery-1.11.2.min.js", function() { 
    loadScript("pulleys/jsxgraphcore-0.99.5.js", function() { 
     Set_Cookie('choseFull88', '', -20, '/', '.intmath.com', '');
      
brd1 = JXG.JSXGraph.initBoard('jxgbox1',{axis:true,boundingbox:[-5.9,8,5.9,-5.9],keepaspectratio:true,showCopyright:false,showNavigation:false});
var qr = [];
var radius = 5;
qr[1] = brd1.create('point', [0,0], {name:"",fixed:true,size:1,strokeColor:'blue',fillColor:'blue'});
qr[2] = brd1.create('point', [radius,0], {fixed:true,visible:false});
var circ1 = brd1.create('circle',[qr[1],qr[2]],{strokeColor:'#165a71',highlight:false});
var g = brd1.create('glider', [3.85,4.4,circ1], {name:'P',style:5,fillColor:'#ff00ff'});
var dm = brd1.create('text', [4.1,4.15,"(Drag the red dot)"],{fixed:true,highlight:false});
qr[4] = brd1.create('point', [function(x){return g.X()},0], {visible:false});
var li1 = brd1.create('segment',[qr[1],g],{strokeWidth:2, strokeColor:'#dd00dd',highlight:false});
var li2 = brd1.create('segment',[qr[4],g],{strokeWidth:2, strokeColor:'#00dddd',highlight:false}); 
var li3 = brd1.create('segment',[qr[1],qr[4]],{strokeWidth:2, strokeColor:'blue',highlight:false}); 
var arc1 = brd1.create('angle',[qr[2],qr[1],g],{radius:1,name:"&theta;"});
t = brd1.create('text', [0.7, 6, function () {
    return '<p>&theta; = ' + (arc1.Value()).toFixed(1) + ' radians<br />&theta; = ' + (arc1.Value() * 180 / Math.PI).toFixed(1) + '&deg;</p>';
}],{highlight:false,fixed:true});
var updtxt = function() {
	brd1.suspendUpdate();
	Pyr = g.Y().toFixed(2);Pxr = g.X().toFixed(2);tanqr = (g.Y()/g.X()).toFixed(2);
	sinqr = (g.Y()/radius).toFixed(2);cosqr = (g.X()/radius).toFixed(2);
	sin2r = Math.pow((g.Y()/radius),2).toFixed(2);cos2r = Math.pow((g.X()/radius),2).toFixed(2);
	$("#output").html("<p>`tan &theta; = text(opp)/text(adj) = " +Pyr+"/"+Pxr+" = "+tanqr+"`<br /><br />`sin &theta; = text(opp)/text(hyp) = " +Pyr+ "/" + radius + " = " +sinqr+"`<br /><br />`cos &theta; = text(adj)/text(hyp) = " +Pxr+ "/" + radius + " = " +cosqr+"`<br /><br />`(sin theta) / (cos theta) = " +sinqr+ "/" + cosqr +" = "+ tanqr +" = tan theta`<br /><br /></p><p>Also:</p><p>`sin^2 theta = " +sin2r+ "`<br /><br />`cos^2 theta = " +cos2r+ "`<br /><br />`sin^2 theta + cos^2 theta = " +sin2r+ " + " +cos2r+ " = 1`</p>");  
	if (typeof(MathJax) != "undefined") {				
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	} else if(typeof(katex) != "undefined") {
		doAMprocessor = true;
		AMfunc(doAMprocessor);				
	}		
	brd1.unsuspendUpdate();
}
updtxt();
g.on("drag",function(){
	updtxt();
	dm.remove();
});

       var _qevents = _qevents || [];
        loadScript("pulleys/quant.js", function() { 
         _qevents.push({qacct:"p-c9mvyoNVLgZ1k"});
          loadScript("pulleys/adsbygoogle.js", function() { 
           (adsbygoogle = window.adsbygoogle || []).push({});
         (adsbygoogle = window.adsbygoogle || []).push({});
         (adsbygoogle = window.adsbygoogle || []).push({});

}) }) }) }) }) }) });
/*
///////////////////////////////////////////////////////
//
// Create Adsense on the fly
// Insert before second H2 on page
//
///////////////////////////////////////////////////////


newIns = document.createElement('Ins');
newIns.className = "adsbygoogle";
newIns.setAttribute("data-ad-client", "ca-pub-2127235491321065");
newIns.setAttribute("data-ad-slot", "4560322003");
newIns.setAttribute("data-ad-format", "auto");
document.getElementById("content").insertBefore(newIns, document.getElementsByTagName("h2")[1]);
(adsbygoogle = window.adsbygoogle || []).push({});
*/

