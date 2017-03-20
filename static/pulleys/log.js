function loadScript(t,e){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.readyState?a.onreadystatechange=function(){("loaded"==a.readyState||"complete"==a.readyState)&&(a.onreadystatechange=null,e&&"function"==typeof e&&e())}:a.onload=function(){e&&"function"==typeof e&&e()},a.src=t,document.head.appendChild(a)}
loadScript("ASCIIMathTeXKaTeX-2016-06-17.min.js", function() { 
 loadScript("katex.minjs-2017-13-01.js", function() { 
  loadScript("ddivs-voting-2016-10-11.js", function() { 
   loadScript("jquery-1.11.2.min.js", function() { 
    Set_Cookie('choseFull88', '', -20, '/', '.intmath.com', '');
     
$(function () {
	 var base, base1, basedisp, logIn, toFix, logVal, loghtml, showBase0, roundTo, maxVal, xtra, asIndex;
    var logb = function (x, b, r) {
        return (Math.log(x) / Math.log(b)).toFixed(r);
    }
	 var logNum = function() {
        logIn  = parseFloat($("#logIn").val());
        toFix = parseInt($('#roundTo0 :selected').val());
		  if ($('#base0 :selected').val() == "e") {
            base = Math.E;
				basedisp = "e";
				showBase0 = Math.E.toFixed(toFix)
        } else {
            base = parseFloat($('#base0 :selected').val());
				basedisp = base;
				showBase0 = base;
        }
        logVal  = logb(logIn, base, toFix);
        loghtml = "`log_" + basedisp + "(" + logIn + ") = " + logVal + "`";
		  asIndex = "`" + showBase0 + "^" + logVal + " = " + logIn + "`";
		  $("#N").html("`" +logIn +"`");
		  $("#b").html("`" +base+"`" );
		  $("#logbN").html("`" +logVal+"`");
        $("#logVal").html(loghtml);
		  $("#asIndex").html(asIndex);
			doAMprocessor = true;
			AMfunc(doAMprocessor);
//		  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	 }
 	 logNum();
    $("#showLogVal").click(function (event) {
      event.preventDefault();
		logNum();
    });
	 $('#base0').change(function () {
		logNum();
	 });
	 $('#roundTo0').change(function () {
		logNum();
	 });
    var tabfn = function (round, max) {

		  table = "<table id=\"logtable\">";
        for (i = 1; i < max; i++) {
            if (i % 10 == 1) {
                table += "<tr><th>N</th>";
                for (n = 0; n < 10; n++) {
                    table += "  <th>" + n + "</th>";
                }
                table += "</tr>";
            }
            //var base1 = parseFloat($('#base1 :selected').val());
            table += "<tr><th>" + (1 + (i - 1) / 10).toFixed(1) + "</th><td>" + logb((1 + (i - 1) / 10), base1, round) + "</td>";
            //var base1 = parseFloat($('#base1 :selected').val());
            for (j = 1; j < 10; j++) {
                table += "<td>" + logb(((1 + (i - 1) / 10) + j / 100), base1, round) + "</td>";
            }
            table += "</tr>";
        }
        table += "</table>";
        return table;
    }
    roundTo = parseInt($('#roundTo :selected').val());
    $('#roundTo').change(function () {
        roundTo = parseInt($('#roundTo :selected').val());
        $("#logOut").html(tabfn(roundTo, maxVal));
    });
    maxVal = parseInt(10 * ($('#maxVal :selected').val()) + 1);
    $('#maxVal').change(function () {
        maxVal = parseInt(10 * ($('#maxVal :selected').val()) + 1);
        $("#logOut").html(tabfn(roundTo, maxVal));
    });
	 base1 = parseFloat($('#base1 :selected').val());
    $("#logOut").html(tabfn(roundTo, maxVal));
	 xtra='';
    $('#base1').change(function () {
	   if ($('#base1 :selected').val() == "e") {
		  base1 = Math.E;
		  xtra = "e = ";
	   } else {
		  base1 = parseFloat($('#base1 :selected').val());
	   }
	   $("#logOut").html(tabfn(roundTo, maxVal));
		$("#thisBase").html(xtra+base1);
   });
}) }) }) }) });