function loadScript(t,e){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.readyState?a.onreadystatechange=function(){("loaded"==a.readyState||"complete"==a.readyState)&&(a.onreadystatechange=null,e&&"function"==typeof e&&e())}:a.onload=function(){e&&"function"==typeof e&&e()},a.src=t,document.head.appendChild(a)}
loadScript("pulleys/ASCIIMathTeXKaTeX-2016-06-17.min.js", function() {
 loadScript("pulleys/katex.minjs-2017-13-01.js", function() {
  loadScript("pulleys/ddivs-voting-2016-10-11.js", function() {
   loadScript("pulleys/jquery-1.11.2.min.js", function() {
    loadScript("pulleys/jsxgraphcore-0.99.5.js", function() {
     Set_Cookie('pulleys/choseFull88', '', -20, '/', '.intmath.com', '');

(function () {
	var board,dot0,tangA,tangB,aSlide,bSlide,tangAmin,tangBmin,ptA0,ptA1,ptB0,ptB1,t0,tRot,tRotRem=0,doMove,t=0,startTime,int,intOver,incAmt,inc,ptsRot=0,fps=0;
	var drawPulleys = function() {
		board0 = JXG.JSXGraph.initBoard('jxgbox0', {
				  boundingbox:[-10.35, 12, 22.5, 7],
				  showCopyright:false, grid:false, axis:false, showNavigation:false, snapToGrid:true
				});
		board = JXG.JSXGraph.initBoard('jxgbox', {
				  boundingbox:[-6.5, 6.5, 21.5, -6.5],
				  showCopyright:false, grid:false, axis:false, showNavigation:false, snapToGrid:true, keepaspectratio:true
				});
		aSlide = board0.create("slider",[[-10,11.5],[0,11.5],[0.5,5,6]],{name:"r<sub>1</sub>",strokeColor:"#f5f",fillColor:"#f5f",highlightFillColor:"#f9f",size:4,withTicks:false});
		aSlide.highline.setAttribute({strokeColor:"#165a71"});
		aSlide.baseline.setAttribute({strokeColor:"#165a71"});
		bSlide = board0.create("slider",[[9,11.5],[19,11.5],[0.5,2,6]],{name:"r<sub>2</sub>",strokeColor:"#f5f",fillColor:"#f5f",highlightFillColor:"#f9f",size:4,withTicks:false});
		bSlide.highline.setAttribute({strokeColor:"#165a71"});
		bSlide.baseline.setAttribute({strokeColor:"#165a71"});
		board.create('point', [0,0],{fixed:true,size:5,strokeColor:'#165a71',fillColor:'#165a71',name:'',highlight:false,showInfobox:false});
		board.create('point', [15,0],{fixed:true,size:5,strokeColor:'#165a71',fillColor:'#165a71',name:'',highlight:false,showInfobox:false});
		board.create('circle',[[0,0],function(){ return aSlide.Value();}],{fixed:true,strokeColor:'#165a71',fillColor:'#e5edef',highlight:false});
		board.create('circle',[[15,0],function(){ return bSlide.Value();}],{fixed:true,strokeColor:'#165a71',fillColor:'#e5edef',highlight:false});
		ptA0 = board.create('point', [3,0], {fixed:true,strokeColor:'#165a71',fillColor:'#fff',size:10,name:"",highlight:false,showInfobox:false});
		ptA1 = board.create('point', [-3,0], {fixed:true,strokeColor:'#165a71',fillColor:'#fff',size:10,name:"",highlight:false,showInfobox:false});
		ptB0 = board.create('point', [16,0], {fixed:true,strokeColor:'#165a71',fillColor:'#fff',size:5,name:"",highlight:false,showInfobox:false});
		ptB1 = board.create('point', [14,0], {fixed:true,strokeColor:'#165a71',fillColor:'#fff',size:5,name:"",highlight:false,showInfobox:false});
		tRot = 0;
		tangA = board.create('point', [function(){ return aSlide.Value()*(aSlide.Value()-bSlide.Value())/15;}   ,
				function(){ return Math.sqrt(Math.pow(aSlide.Value(),2) - Math.pow(aSlide.Value()*(aSlide.Value()-bSlide.Value())/15,2))+0.01;} ],{visible:false} );
		tangB = board.create('point', [function(){ return 15+bSlide.Value()*(aSlide.Value()-bSlide.Value())/15;}   ,
				function(){ return Math.sqrt(Math.pow(bSlide.Value(),2) - Math.pow(bSlide.Value()*(aSlide.Value()-bSlide.Value())/15,2))+0.01;} ],{visible:false} );
		tangAmin = board.create('point', [function(){ return aSlide.Value()*(aSlide.Value()-bSlide.Value())/15;}   ,
				function(){ return -Math.sqrt(Math.pow(aSlide.Value(),2) - Math.pow(aSlide.Value()*(aSlide.Value()-bSlide.Value())/15,2))-0.01;} ],{visible:false} );
		tangBmin = board.create('point', [function(){ return 15+bSlide.Value()*(aSlide.Value()-bSlide.Value())/15;}   ,
				function(){ return -Math.sqrt(Math.pow(bSlide.Value(),2) - Math.pow(bSlide.Value()*(aSlide.Value()-bSlide.Value())/15,2));} ],{visible:false} );
		board.create('segment',[tangA,tangB], {strokeColor:'#165a71',highlight:false});
		board.create('segment',[tangAmin,tangBmin], {strokeColor:'#165a71',highlight:false});
		dot0 = board.create("point",[tangA.X(),tangA.Y()],{size:3,highlight:false,strokeColor:"#d00",fillColor:"#d00",showinfobox:false,name:"",fixed:true});
		t0=JXG.Math.Geometry.rad([1,0],[0,0],[tangA.X(),tangA.Y()]);
		var linVel = 6;
		var angAtxt = board0.create('text',[-10,10,function(){ return "<em>&omega;</em><sub>1</sub> = <span class=\"lin\">angular velocity</span> = "+(linVel/aSlide.Value()).toFixed(2)+" rad/s";} ],{highlight:false,fixed:true});
		angAtxt.setAttribute({fontSize:15});
		var angBtxt = board0.create('text',[9,10, function(){ return "<em>&omega;</em><sub>2</sub> = <span class=\"lin\">angular velocity</span> = "+(linVel/bSlide.Value()).toFixed(2)+" rad/s";}],{highlight:false,fixed:true});
		angBtxt.setAttribute({fontSize:15});
		var lintxtA = board0.create('text',[-10,8,function(){ return "<span class=\"lin\"><strong>Linear velocity:</strong></span><br /><em>v</em> = <em>r</em><sub>1</sub> &times; <em>&omega;</em><sub>1</sub> = "+aSlide.Value().toFixed(2)+" &times; "+(linVel/aSlide.Value()).toFixed(2)+" = 6 m/s";} ],{highlight:false,fixed:true});
		lintxtA.setAttribute({fontSize:15});
		var lintxtB = board0.create('text',[9,8,function(){ return "<span class=\"lin\"><strong>Linear velocity:</strong></span><br /><em>v</em> = <em>r</em><sub>2</sub> &times; <em>&omega;</em><sub>2</sub> = "+bSlide.Value().toFixed(2)+" &times; "+(linVel/bSlide.Value()).toFixed(2)+" = 6 m/s";} ],{highlight:false,fixed:true});
		lintxtB.setAttribute({fontSize:15});


		var fpsText = board.create('text',[18,-6.3,function(){ return "<span class=\"fps lin\">fps = "+fps+"</span>";} ],{highlight:false,fixed:true});
		lintxtB.setAttribute({fontSize:15});

	}
	var segment=0;
	drawPulleys();
	aSlide.on("drag",function(){
		if(aSlide.Value() > 3) {
			ptA0.setAttribute({size:10});
			ptA1.setAttribute({size:10});
			if($("#goButt").text()=="Start"){
				ptA0.moveTo([0.6*aSlide.Value(),0]);
				ptA1.moveTo([-0.6*aSlide.Value(),0]);
			}
		} else if(aSlide.Value() <= 3 && aSlide.Value()> 1.5) {
			ptA0.setAttribute({size:5});
			ptA1.setAttribute({size:5});
			ptA0.setAttribute({visible:true});
			ptA1.setAttribute({visible:true});
			ptA0.moveTo([1,0]);
			ptA1.moveTo([-1,0]);
		} else if (aSlide.Value() <= 1.5) {
			ptA0.setAttribute({visible:false});
			ptA1.setAttribute({visible:false});
		}
		if($("#goButt").text()=="Start"){
			dot0.moveTo([tangA.X(),tangA.Y()]);
			t0=JXG.Math.Geometry.rad([1,0],[0,0],[tangA.X(),tangA.Y()]);
			t = t0;
			segment=0;
		}
	});
	bSlide.on("drag",function(){
		if(bSlide.Value() > 3) {
			ptB0.setAttribute({size:10});
			ptB1.setAttribute({size:10});
			if($("#goButt").text()=="Start"){
				ptB0.moveTo([15+0.6*bSlide.Value(),0]);
				ptB1.moveTo([15-0.6*bSlide.Value(),0]);
			}
		} else if(bSlide.Value() <= 3 && bSlide.Value()> 1.5) {
			ptB0.setAttribute({size:5});
			ptB1.setAttribute({size:5});
			ptB0.setAttribute({visible:true});
			ptB1.setAttribute({visible:true});
			ptB0.moveTo([16,0]);
			ptB1.moveTo([14,0]);
		} else if (bSlide.Value() <= 1.5) {
			ptB0.setAttribute({visible:false});
			ptB1.setAttribute({visible:false});
		}
		if($("#goButt").text()=="Start"){
			dot0.moveTo([tangA.X(),tangA.Y()]);
			t0=JXG.Math.Geometry.rad([1,0],[0,0],[tangA.X(),tangA.Y()]);
			t = 0;
			segment=0;
		}
	});
	var cosfn0=function(x){return aSlide.Value()*Math.cos(t0+(x)/aSlide.Value());}
	var sinfn0=function(x){return aSlide.Value()*Math.sin(t0+(x)/aSlide.Value());}
	var rotCosfn0 = function(x){return 0.6*aSlide.Value()*Math.cos(x/aSlide.Value());}
	var rotSinfn0 = function(x){return 0.6*aSlide.Value()*Math.sin(x/aSlide.Value());}
	var bottBeltY = function(x){return ((tangBmin.Y() - tangAmin.Y())/(tangB.X() - tangA.X()))*(x - tangA.X()) +  tangAmin.Y(); }

	var cosfn1=function(x){return bSlide.Value()*Math.cos(t0+(x-t0)/bSlide.Value());}
	var sinfn1=function(x){return bSlide.Value()*Math.sin(t0+(x-t0)/bSlide.Value());}

	var rotCosfn1 = function(x){return 0.6*bSlide.Value()*Math.cos(x/bSlide.Value());}
	var rotSinfn1 = function(x){return 0.6*bSlide.Value()*Math.sin(x/bSlide.Value());}
	var topBeltY = function(x){return ((tangB.Y() - tangA.Y())/(tangB.X() - tangA.X()))*(x - tangA.X()) + tangA.Y() ; }
	var filterStrength=20;var frameTime=100000,lastLoop=new Date,thisLoop;

	var move = function() {
		tRot = (Date.now() - startTime)/intOver + tRotRem;
		ptsRot += incAmt;
		ptA0.setPositionDirectly(JXG.COORDS_BY_USER,[rotCosfn0(ptsRot), rotSinfn0(ptsRot) ]);
		ptA1.setPositionDirectly(JXG.COORDS_BY_USER,[-rotCosfn0(ptsRot), -rotSinfn0(ptsRot) ]);
		ptB0.setPositionDirectly(JXG.COORDS_BY_USER,[15+rotCosfn1(ptsRot), rotSinfn1(ptsRot) ]);
		ptB1.setPositionDirectly(JXG.COORDS_BY_USER,[15-rotCosfn1(ptsRot), -rotSinfn1(ptsRot) ]);
		if(segment==0) {
			if(cosfn0(tRot) < tangA.X()) {
				dot0.setPositionDirectly(JXG.COORDS_BY_USER,[cosfn0(tRot) ,sinfn0(tRot)]);
			} else {
				segment++;
				t=0;
				inc=0;

			}
		} else if(segment==1){
			if(tangA.X() + inc < tangB.X()) {
				inc+=incAmt;
				dot0.setPositionDirectly(JXG.COORDS_BY_USER,[ tangA.X() + inc , bottBeltY(tangA.X() + inc ) ]);
			} else {
				segment++;
				t0 = JXG.Math.Geometry.rad([25,0],[15,0],[tangB.X(),-tangB.Y()]);
				//tRotRem = 0;
				inc=incAmt;
			}
		} else if(segment==2){
			if(15+cosfn1(t0+inc) > tangB.X()) {
				inc+=incAmt;
				dot0.setPositionDirectly(JXG.COORDS_BY_USER,[15+cosfn1(t0+inc) ,sinfn1(t0+inc)]);
			} else {
				segment++;
				t=0;
				inc=incAmt;
			}
		} else if(segment==3){
			if(tangB.X() - inc > tangA.X()) {
				inc+=incAmt;
				dot0.setPositionDirectly(JXG.COORDS_BY_USER,[tangB.X() - inc , topBeltY(tangB.X() - inc)]);
			} else {
				segment = 0;
				t0 = JXG.Math.Geometry.rad([1,0],[0,0],[tangA.X(),tangA.Y()]);
				t=0;
				tRotRem -= tRot;
			}
		}
		board.update();
		// For frame rate timer
		var thisFrameTime=(thisLoop=new Date)-lastLoop;
		frameTime+=(thisFrameTime-frameTime)/filterStrength;
		lastLoop=thisLoop;
	}
	$("#goButt").click(function(){
        if($(this).text()=="Stop"){
				myTimer = false;
				clearInterval(doMove);
				fps=0;
				clearInterval(doFps);
            dot0.setAttribute({fixed:false});
				t=tRot;
				tRotRem = tRot;
            $(this).text("Start");
        } else {
            frameTime=0;
				myTimer = true;
				startTime = Date.now();
				int = 33.33;
				intOver = 200;
				incAmt = int/intOver;
				doMove = setInterval(move,int);
				doFps = setInterval(function(){
					fps = (1000/frameTime).toFixed(1)
				},500);
            dot0.setAttribute({fixed:true});
            $(this).text("Stop");
        }
    });
}());}) }) }) }) });
