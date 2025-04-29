// -- Adobe GoLive JavaScript Library
// -- Global Functions
function CSScriptInit() {
if(typeof(skipPage) != "undefined") { if(skipPage) return; }
idxArray = new Array;
for(var i=0;i<CSInit.length;i++)
	idxArray[i] = i;
CSAction2(CSInit, idxArray);
}
CSInit = new Array;
CSExit = new Array;
CSStopExecution=false;
function CSAction(array) {return CSAction2(CSAct, array);}
function CSAction2(fct, array) { 
	var result;
	for (var i=0;i<array.length;i++) {
		if(CSStopExecution) return false; 
		var aa = fct[array[i]];
		if (aa == null) return false;
		var ta = new Array;
		for(var j=1;j<aa.length;j++) {
			if((aa[j]!=null)&&(typeof(aa[j])=="object")&&(aa[j].length==2)){
				if(aa[j][0]=="VAR"){ta[j]=CSStateArray[aa[j][1]];}
				else{if(aa[j][0]=="ACT"){ta[j]=CSAction(new Array(new String(aa[j][1])));}
				else ta[j]=aa[j];}
			} else ta[j]=aa[j];
		}			
		result=aa[0](ta);
	}
	return result;
}
CSAct = new Object;
function CSClickReturn () {
	var bAgent = window.navigator.userAgent; 
	var bAppName = window.navigator.appName;
	if ((bAppName.indexOf("Explorer") >= 0) && (bAgent.indexOf("Mozilla/3") >= 0) && (bAgent.indexOf("Mac") >= 0))
		return true; // dont follow link
	else return false; // dont follow link
}
// -- Action Functions
function CSFixFct() {
	var d = document; var w = window;
	if (d.cs.csFix.w != w.innerWidth || d.cs.csFix.h != w.innerHeight) {
		d.location = d.location; }
}
function CSNSFix(action) { 
	var d = document; var w = window;
	if ((navigator.appName == 'Netscape') && (parseInt(navigator.appVersion) == 4)) {
		if (typeof d.cs == 'undefined') { 
			d.cs = new Object;
			d.cs.csFix = new Object; 
		} else if (CSIsFrame (w) == true) CSFixFct();
		d.cs.csFix.w = w.innerWidth;
		d.cs.csFix.h = w.innerHeight; 
		window.onresize = CSFixFct;
	  }
}
function CSIsFrame (window) {
	var rootWindow = window.parent;
	if (rootWindow == 'undefined') return false;
	for (i = 0; i < rootWindow.frames.length; i++)
		if (window == rootWindow.frames[i]) return true;
	return false;
}
// EOF
