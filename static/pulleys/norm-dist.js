function doProbDist() {
	var a, bell,chk,segArr = [], ptArr=[], bellArr = [];
	var mu = 4, sigma = 1.5;		
	var bell = function(x) { return 1/(sigma*Math.sqrt(2*Math.PI)) * Math.exp(-1*Math.pow((x-mu),2)/(2*Math.pow(sigma,2))); };
	var bellStand = function(x) { return 1/(Math.sqrt(2*Math.PI)) * Math.exp(-1*Math.pow((x),2)/(2)); };
	var graphStart, graphEnd;
	var graphWidth = Math.abs(graphStart)+Math.abs(graphEnd);
	var slid_mu,doMathJax=0,ssncurve=0,doProbs=0;
	var showSNcurve = 1,bellCurveStand,areaS;

	plot = function() {	
		JXG.Options.curve.highlight = false;
		JXG.Options.board.minimizeReflow = 'all';
		graphStart = mu - 3.5*sigma;
		graphEnd = mu + 3.5*sigma;
		board = JXG.JSXGraph.initBoard("jxgbox1", {showNavigation:false,showCopyright:false,boundingbox:[-3,0.82,graphEnd,-0.15], axis:false});
		var axs = board.create("line", [[0,0], [1,0]],{strokecolor:"#444", strokeWidth:1,highlight:false,fixed:true});
		var xticks = Math.pow(10, (Math.ceil(Math.log(sigma/5)/Math.log(10) )));
		board.create("ticks",[axs, xticks], {highlight:false,drawLabels:true, label:{ offset:[-2,-14]},needsRegularUpdate:false});
		var yaxs = board.create("segment", [ [0,0], [0,10] ],{strokecolor:"#444", highlight:false,strokeWidth:1,fixed:true});
		var yticks = 0.1;
		board.create("ticks",[yaxs, yticks], {drawLabels:true, label:{ offset:[-30,0]},needsRegularUpdate:false});
		var bellCurve = board.create("functiongraph", [bell,-20,20],{strokeWidth:1,highlight:false,dash:0});
		for(i=-3;i<4;i++) {	
			ptArr[i] = board.create("point", [i*sigma+mu,0],{visible:false,name:''});		
			bellArr[i] = board.create("point", [i*sigma+mu,bell(i*sigma+mu)],{visible:false,name:''});	
			segArr[i] = board.create("segment", [ptArr[i] , bellArr[i]],{strokeWidth:1,dash:2,color:"#8C001A",fixed:true});
		}			
		var slid_x1 = board.create('slider', [[-3,-0.1],[9,-0.1],[-3,3,9]], 
			{strokeColor:'#306754',fillColor:'#306754',size:4,withTicks:false});
		var slid_x2 = board.create('slider', [[-3,-0.1],[9,-0.1],[-3,6,9]], 
			{strokeColor:'#306754',fillColor:'#306754',size:4,withTicks:false});
		slid_x1.baseline.setAttribute({strokeWidth:1, strokeColor:'#c3cbcd',highlight:false});
		slid_x1.highline.setAttribute({visible:false});		
		slid_x2.baseline.setAttribute({visible:false});
		slid_x2.highline.setAttribute({visible:false});		
		showProbs = function() {
			var ints = 10;
			a1 = Math.min(0.5, Math.abs(JXG.Math.Numerics.NewtonCotes([mu,slid_x1.X()],bell,{number_of_nodes:ints,integration_type:"trapez"})) );
			a2 = Math.min(0.5, Math.abs(JXG.Math.Numerics.NewtonCotes([mu,slid_x2.X()],bell,{number_of_nodes:ints,integration_type:"trapez"})) );
			probOutputWrap.className = '';
			if(slid_x1.X() < mu && slid_x2.X() > mu) {
				probOutput.innerHTML = a1.toFixed(4)+" + "+a2.toFixed(4)+" = "+((a1+a2).toFixed(4));  
			} else if(slid_x1.X() == mu) {
				probOutput.innerHTML = a1.toFixed(4)+" + "+a2.toFixed(4)+" = "+((a1+a2).toFixed(4));				
			} else if(slid_x2.X() == mu) {
				probOutput.innerHTML = a1.toFixed(4)+" + "+a2.toFixed(4)+" = "+((a1+a2).toFixed(4)) ;				
			} else if(slid_x1.X() < mu && slid_x2.X() < mu){
				probOutput.innerHTML = a1.toFixed(4)+" &minus; "+a2.toFixed(4)+" = "+((a1-a2).toFixed(4)); 
			} else {
				probOutput.innerHTML = a2.toFixed(4)+" &minus; "+a1.toFixed(4)+" = "+((a2-a1).toFixed(4)); 
			}
		}
		var slid_mu = board.create('slider', [[-3,0.5],[9,0.5],[-3,4,9]], {strokeColor:'#8C001A',fillColor:'#8C001A',size:4,withTicks:false});
		var slid_sig = board.create('slider', [[-3,0.5],[10,0.5],[-3,5.5,10]], {strokeColor:'#8C001A',fillColor:'#8C001A',size:4,withTicks:false});
		slid_mu.baseline.setAttribute({strokeWidth:1, strokeColor:'#c3cbcd',highlight:false});
		slid_mu.highline.setAttribute({visible:false});		
		slid_sig.baseline.setAttribute({visible:false});
		slid_sig.highline.setAttribute({visible:false});				
		board.create('text',[ function() { return mu;}, 0.55, function() { return '<p>&mu; = '+parseFloat(mu).toFixed(2)+'</p>';}], {highlight:false} );
		board.create('text',[ function() { return mu+sigma;}, 0.45, function() { return '<p>&sigma; = '+sigma.toFixed(2)+'</p>';}], {highlight:false} );		
		showMuSig = function() {
			muOutput.innerHTML = "&mu; = mean = "+parseFloat(mu).toFixed(2);
			sigmaOutput.innerHTML = "&sigma; = standard deviation = "+sigma.toFixed(2);
		}
		showMuSig();
		showZscoreCalc = function() {
			z1ScoreCalc.innerHTML = "`z_1=(x_1 - mu)/sigma = ("+slid_x1.X().toFixed(2)+"-"+slid_mu.X().toFixed(2)+")/"+(slid_sig.X()-slid_mu.X()).toFixed(2)+"="+( (slid_x1.X() - slid_mu.X())/ (slid_sig.X()-slid_mu.X()) ).toFixed(4)+"`" ;
			z2ScoreCalc.innerHTML = "`z_2=(x_2 - mu)/sigma = ("+slid_x2.X().toFixed(2)+"-"+slid_mu.X().toFixed(2)+")/"+(slid_sig.X()-slid_mu.X()).toFixed(2)+"="+( (slid_x2.X() - slid_mu.X())/ (slid_sig.X()-slid_mu.X()) ).toFixed(4)+"`" ;
			if (typeof(MathJax) != "undefined") {				
				MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
			} else if(typeof(katex) != "undefined") {
				doAMprocessor = true;
				AMfunc(doAMprocessor);						
			}	
		}		
		slid_x1.on('drag', function() {			
			if(Math.abs(slid_x1.X() - slid_x1.X().toFixed(0)) < 0.008) {
				slid_x1.moveTo([slid_x1.X().toFixed(0),0]);
			}
			slid_x2.moveTo([Math.max(slid_x1.X()+0.15,slid_x2.X()),0],0);
			showMuSig();
			if(doMathJax == 1){
				showZscoreCalc();
			}
			if(doProbs == 1) {
				showProbs();
			}
		});	
		slid_x2.on('drag', function() {	
			if(Math.abs(slid_x2.X() - slid_x2.X().toFixed(0)) < 0.008) {
				slid_x2.moveTo([slid_x2.X().toFixed(0),0]);
			}		
			slid_x1.moveTo([Math.min(slid_x1.X(),slid_x2.X()-0.15),0],0);
			showMuSig();
			if(doMathJax == 1){
				showZscoreCalc();
			}
			if(doProbs == 1) {
				showProbs();
			}
		});		
		slid_mu.on('drag', function() {
			mu = slid_mu.X();		
			if(Math.abs(mu - mu.toFixed(0)) < 0.008) {
				slid_mu.moveTo([mu.toFixed(0),0]);
			}
			mu = slid_mu.X();
			slid_sig.moveTo([slid_mu.X()+sigma,0]);
			for(i=-3;i<4;i++) {		
				ptArr[i].moveTo([i*sigma+mu,0]);
				bellArr[i].moveTo([i*sigma+mu,bell(i*sigma+mu)]);
			}
			showMuSig();
			if(doMathJax == 1){
				showZscoreCalc();
			}
			if(doProbs == 1) {
				showProbs();
			}
		});
		slid_sig.on('drag', function() {		
			if(slid_sig.X() - mu > 0.24) {
				sigma = Math.abs(slid_sig.X() - mu);			
				if(Math.abs(sigma - sigma.toFixed(0)) < 0.008) {
					slid_sig.moveTo([(slid_sig.X()).toFixed(0),0]);
				} else {
					slid_sig.moveTo([mu + sigma,0]);
				}
				sigma = Math.abs(slid_sig.X() - mu);
				for(i=-3;i<4;i++) {		
					ptArr[i].moveTo([i*sigma+mu,0]);
					bellArr[i].moveTo([i*sigma+mu,bell(i*sigma+mu)]);
				}
				showMuSig();
				if(doMathJax == 1){
					showZscoreCalc();
				}
				if(doProbs == 1) {
					showProbs();
				}			
			} else {		
				slid_sig.moveTo([mu+0.25,0], 0);				
				sigma = 0.25;
			}
		});
		x1txt = board.create("text",[function(){ return slid_x1.X(); },0.05,function(){ 
			return "<p><i>x</i><sub>1</sub> = "+slid_x1.X().toFixed(2)+"</p>";
			}], {highlight:false});			
		x2txt = board.create("text",[function(){ return slid_x2.X(); },0.1,function(){ 
			return "<p><i>x</i><sub>2</sub> = "+slid_x2.X().toFixed(2)+"</p>";
			}], {highlight:false});
		var xData, yData;
		var area = board.create('curve', [[], []], {color: 'green', opacity: 0.3, highlightStrokeColorOpacity: 0.3});
		area.updateDataArray = function () {		
			xData = [slid_x1.X()];
			yData = [bellCurve.Y(slid_x1.X())];   
			for (j = 0; j < bellCurve.numberPoints; j++) {  // cannot be "i" because interferes with sigma segments
				if ((slid_x1.X() <= bellCurve.points[j].usrCoords[1]) && (bellCurve.points[j].usrCoords[1] <= slid_x2.X())) {
					xData.push(bellCurve.points[j].usrCoords[1]);				
					yData.push(bellCurve.points[j].usrCoords[2]);
				}
			}
			xData.push(slid_x2.X());
			yData.push(bellCurve.Y(slid_x2.X()));
			xData.push(slid_x2.X());	
			yData.push(0);
			xData.push(slid_x1.X());
			yData.push(0);
			xData.push(slid_x1.X());
			yData.push(bellCurve.Y(slid_x1.X()));
			this.dataX = xData;
			this.dataY = yData;
		};
/////////////////////////////////////////////////////////////////////////////////////
		showSNcurve = function() {	
			bellCurveStand = board.create("functiongraph", [bellStand,-20,20],{strokeWidth:1,strokecolor:"#ccc",highlight:false,dash:0});
			var xDataS, yDataS;
			areaS = board.create('curve', [[], []], {color: '#aaa', opacity: 0.2});
			areaS.updateDataArray = function () {
				xDataS = [(slid_x1.X()-mu)/sigma];
				yDataS = [bellCurveStand.Y((slid_x1.X()-mu)/sigma)];   
				for (k = 0; k < bellCurveStand.numberPoints; k++) {  // cannot be "i" or "j"
					if (((slid_x1.X()-mu)/sigma <= bellCurveStand.points[k].usrCoords[1]) && (bellCurveStand.points[k].usrCoords[1] <= (slid_x2.X()-mu)/sigma)) {
						xDataS.push(bellCurveStand.points[k].usrCoords[1]);				
						yDataS.push(bellCurveStand.points[k].usrCoords[2]);
					}
				}
				xDataS.push((slid_x2.X()-mu)/sigma);
				yDataS.push(bellCurveStand.Y((slid_x2.X()-mu)/sigma));
				xDataS.push((slid_x2.X()-mu)/sigma);	
				yDataS.push(0);
				xDataS.push((slid_x1.X()-mu)/sigma);
				yDataS.push(0);
				xDataS.push((slid_x1.X()-mu)/sigma);
				yDataS.push(bellCurveStand.Y((slid_x1.X()-mu)/sigma));
				this.dataX = xDataS;
				this.dataY = yDataS;
			};
		}
	}
	plot();
	getChk = function () {
		chkBoxes = document.getElementById("options").getElementsByTagName("input");
		for(p=0;p<chkBoxes.length;p++){
			var thisChk = chkBoxes[p];			
			var thisId = chkBoxes[p].id;			
			if(thisId=="sdgraph"){
				if(chkBoxes[p].checked){				
					for(i=-3;i<4;i++) {
						segArr[i].setAttribute('visible:true');
					}
				} else {
					for(i=-3;i<4;i++) {
						segArr[i].setAttribute('visible:false');
					}		
				}				
			} else if(thisId=="sncurve"){
				if(chkBoxes[p].checked){				
					board.removeObject(bellCurveStand);	
					board.removeObject(areaS);
					showSNcurve();
					ssncurve = 1;
				} else {
					board.removeObject(bellCurveStand);	
					board.removeObject(areaS);	
					ssncurve = 0;
				}			
			} else if(thisId=="zscorecalc"){
				
				if(chkBoxes[p].checked){				
					showZscoreCalc();
					zscores.style.display = "block";
					doMathJax = 1;
				} else {
					z1ScoreCalc.innerHTML = "" ;
					z2ScoreCalc.innerHTML = "";
					zscores.style.display = "none";
					doMathJax = 0;
				}
			} else {
				if(chkBoxes[p].checked){
					showProbs();
					doProbs = 1;
				} else {
					probOutputWrap.className = "displayNone";
					doProbs = 0;
				}
			}
		}	
	}
	getChk();
	options.onclick = getChk; 
}
function loadScript(t,e){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.readyState?a.onreadystatechange=function(){("loaded"==a.readyState||"complete"==a.readyState)&&(a.onreadystatechange=null,e&&"function"==typeof e&&e())}:a.onload=function(){e&&"function"==typeof e&&e()},a.src=t,document.head.appendChild(a)}
loadScript("pulleys/ASCIIMathTeXKaTeX-2016-06-17.min.js", function() {
 loadScript("pulleys/katex.minjs-2017-13-01.js", function() {
  loadScript("pulleys/ddivs-voting-2016-10-11.js", function() {
   loadScript("pulleys/jsxgraphcore-0.99.5.js", function() {
     doProbDist()
   }) }) }) });
