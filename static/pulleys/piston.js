function loadScript(t,e){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.readyState?a.onreadystatechange=function(){("loaded"==a.readyState||"complete"==a.readyState)&&(a.onreadystatechange=null,e&&"function"==typeof e&&e())}:a.onload=function(){e&&"function"==typeof e&&e()},a.src=t,document.head.appendChild(a)}
loadScript("pulleys/ASCIIMathTeXKaTeX-2016-06-17.min.js", function() {
 loadScript("pulleys/katex.minjs-2017-13-01.js", function() {
  loadScript("pulleys/ddivs-voting-2016-10-11.js", function() {
   loadScript("pulleys/jquery-1.11.2.min.js", function() {


}) }) }) });
var amp = 1.8, t = 0, rodLength = 4.5, pistonPinPos = Math.sqrt(Math.pow(rodLength,2) - Math.pow(amp,2));
var cosX = [], cosY = [];
var sinfn=function(x){return amp*Math.sin(x);};
var cosfn=function(x){return amp*Math.cos(x);};
//JXG.Options.layer['line'] = 1;
var board = JXG.JSXGraph.initBoard('jxgbox1', {
	boundingbox: [-3.3,10,10,-3.5], axis:false, keepaspectratio:true, showcopyright:false, shownavigation:false});
var p1 = board.create('point',[0.4,0], {visible:false,fixed:true});
var p2 = board.create('point',[0.4,10], {visible:false, fixed:true});
var p3 = board.create('point',[-0.4,10], {visible:false, fixed:true});
var p4 = board.create('point',[-0.4,0], {visible:false, fixed:true});
var poly = board.create('polygon',[p1,p2,p3,p4], {withLines: true, fillOpacity:1,fillColor:'#fff', borders: {strokeWidth:5, strokeColor:'#ccc'}, highlight:false,gradient:'linear',gradientsecondcolor:'#999'} );
poly.createGradient();
var q = [];
q.push( board.create('point',[0.3,pistonPinPos - 0.2], {visible:false}) );
q.push( board.create('point',[0.3,pistonPinPos + 0.3], {visible:false}) );
q.push( board.create('point',[-0.3,pistonPinPos + 0.3], {visible:false}) );
q.push( board.create('point',[-0.3,pistonPinPos - 0.2], {visible:false}) );
var poly2 = board.create('polygon',q, {withLines: true, fillOpacity:1,fillColor:'#999', borders: {strokeWidth:1, strokeColor:'#888'}, highlight:false,gradient:'linear',gradientsecondcolor:'#fff'} );
poly2.createGradient();
g = board.create("group", q);
var crank = board.create("circle", [ [0,0], function() { return amp+0.3; }], {strokeColor:'#888', fillColor:'#ccc', fillOpacity:0.8} );
var dot=board.create("point",[amp, 0],{size:3,highlight:false,strokeColor:"#888",fillColor:"#165a71",showinfobox:false,name:""});
var pistonPin = board.create("point",[0,pistonPinPos],{visible:false});
var rod = board.create("segment",[dot,pistonPin],{strokeWidth:3,highlight:false,strokeColor:"#888",fillColor:"#165a71",showinfobox:false,name:""});
var cosgrph=board.create("curve",[[],[]],{strokeColor:"#165a71",strokeWidth:2,highlight:false});
var ptonCurve=board.create("point",[1,pistonPinPos],{size:1,color:"#165a71", name:""});
var hori = board.create("segment",[pistonPin, ptonCurve],{strokWidth:1,highlight:false,strokeColor:"#ccc",fillColor:"#d00",showinfobox:false,name:""});
var amp_slid1=board.create("slider",[[7,-1],[10,-1],[0.5,amp,3]],{strokeColor:"#d00",fillColor:"#d00",size:4,withTicks:false});
var buttP = board.create("text",[-1,9.3,"<button id=\"stopGo\">Start</button>"], {fixed:true});
amp_slid1.highline.setAttribute({strokeColor:"#165a71"});
amp_slid1.baseline.setAttribute({strokeColor:"#165a71"});
amp_slid1.on("drag",function(){
	rodLength=rod_slid.Value();
	amp=amp_slid1.Value();
	cosX.length = 0;
	cosY.length = 0;
	for(m=0;m<t;m+=0.1){
		cosX.push(m+1);
		cosY.push(rodLength + cosfn(Math.PI/2 - m));
	}
	if(rodLength < amp) {
		rod_slid.moveTo([0.2+Math.max(amp_slid1.X(),rod_slid.X()),-1],0);
	}
	board.update();
});
var rod_slid=board.create("slider",[[7,-2],[13,-2],[0.5,rodLength,6]],{strokeColor:"#d00",fillColor:"#d00",size:4,withTicks:false});
rod_slid.highline.setAttribute({strokeColor:"#165a71"});
rod_slid.baseline.setAttribute({strokeColor:"#165a71"});
rod_slid.on("drag",function(){
	rodLength=rod_slid.Value();
	amp=amp_slid1.Value();
	cosX.length = 0;
	cosY.length = 0;
	for(m=0;m<t;m+=0.1){
		cosX.push(m+1);
		cosY.push(rodLength + cosfn(Math.PI/2 - m));
	}
	if(rodLength < amp) {
		amp_slid1.moveTo([Math.min(amp_slid1.X(),rod_slid.X())-0.2,-1],0);
	}
	board.update();
});
board.create("text",[4,-1,"amplitude"]);
board.create("text",[4,-2,"rod length"]);
cosgrph.updateDataArray = function() {
  this.dataX = cosX;
  this.dataY = cosY;
};
var cosgrphReal=board.create("functiongraph",[function(x){return rodLength + cosfn(Math.PI/2 - x + 1) ;} ,1,1+6*Math.PI],{strokeColor:"#165a71",strokeWidth:1,opacity:0.5,highlight:false});
draw = function() {
	if (t<6*Math.PI) {
		if(t==0){
			cosX = [1];
			cosY = [pistonPinPos];
		} else {
			cosX.push(t+1);
			cosY.push(pistonPinPos);
		}
		ptonCurve.setPositionDirectly(JXG.COORDS_BY_USER, [1, t+1, pistonPinPos]);
		q[0].setPositionDirectly(JXG.COORDS_BY_USER, [1, 0.3, pistonPinPos-0.2]);
		t+=0.0333;
	} else {
		t=0;
		cosX = [1];
		cosY = [pistonPinPos];
	}
	dot.moveTo([cosfn(t),sinfn(t)]);
	pistonPinPos = amp*Math.cos(Math.PI/2-t)+Math.sqrt(Math.pow(rodLength,2)-Math.pow(amp,2)*Math.pow(Math.sin(Math.PI/2-t),2));
	pistonPin.moveTo([0, pistonPinPos ]);
}
$(function() {
	$("#stopGo").on("click", function() {
		if( $(this).text() == "Start") {
			myTimer0=setInterval(draw,33);
			$(this).text("Stop");
		} else {
			$(this).text("Start");
			clearInterval(myTimer0);
		}
	})
});


if(typeof(katex) != "undefined") {
	AMfunc(true);
}

