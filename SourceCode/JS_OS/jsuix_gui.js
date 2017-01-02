// JS/UIX v0.44
// (c) mass:werk (N.Landsteiner) 2003
// all rights reserved

// term gui

var conf_term_x=102;
var conf_term_y=34;
var conf_kbd_offset=34;
var termImgPath='/media/images/terminal/';
var termDiv='termDiv';
var termBgColor='#000';
var termFrameColor='#000';
var termPageColor='#000';
var conf_repeat_delay1=320;
var conf_repeat_delay2=170;

var termKbdDiv='termKbdDiv';
var termKbdBgColor='#000';
var keycapspath='/media/images/terminal/keycaps/';

var termSubDivs=false;
var termLayers=false;
var termDocNS4=null;
var termStringStart='';
var termStringEnd='';

var termKbdDocNS4=null;
var termKbdOn=false;
var keycapsShift=false;
var keycapsCpslk=false;
var keycapsShiftRef=new Array();
var keycapsCpslkRef=new Array();

var termSpecials=new Array();
termSpecials[0]='&nbsp;';
termSpecials[1]='$';
termSpecials[2]='&nbsp;';
termSpecials[3]='?';
termSpecials[4]='#';
termSpecials[32]='&nbsp;';
termSpecials[34]='&quot;';
termSpecials[38]='&amp;';
termSpecials[60]='&lt;';
termSpecials[62]='&gt;';
termSpecials[127]='&loz;';

var termStyles=new Array(1,2,4,8);
var termStyleOpen=new Array();
var termStyleClose=new Array();
termStyleOpen[1]='<SPAN CLASS="termReverse">';
termStyleClose[1]='<\/SPAN>';
termStyleOpen[2]='<U>';
termStyleClose[2]='<\/U>';
termStyleOpen[4]='<I>';
termStyleClose[4]='<\/I>';
termStyleOpen[8]='<STRIKE>';
termStyleClose[8]='<\/STRIKE>';


// buttons UI

var termImgNames=new Array('left_lo', 'left_hi', 'right_lo', 'right_hi', 'delete_lo', 'delete_hi', 'esc_lo', 'esc_hi', 'kbd_show_lo', 'kbd_show_hi', 'kbd_hide_lo', 'kbd_hide_hi');
var termImages=new Array();

function termImgPreload(path,imgnames) {
	for (var i=0; i<imgnames.length; i++) {
		var n=imgnames[i];
		termImages[n]=new Image();
		termImages[n].src=path+n+'.gif'
	}
}

if (document.images) termImgPreload(termImgPath,termImgNames);

function termSetImg(n,v) {
	if (document.images) {
		var img=(termLayers)? termDocNS4.images['term_'+n] : document.images['term_'+n];
		var stat=(v)? '_hi' : '_lo';
		img.src=termImages[n+stat].src
	}
}


// UI keyboard
// key maps (200=left shift, 202=right shift, 204=CpsLock)

var termKeyMap= [
	[96,49,50,51,52,53,54,55,56,57,48,45,61,8],
	[27,113,119,101,114,116,121,117,105,111,112,91,93,13],
	[204,97,115,100,102,103,104,106,107,108,59,39,35],
	[200,92,122,120,99,118,98,110,109,44,46,47,30,202],
	[32,28,31,29]
];
var termKeyMapShift=[
	[126,33,34,35,36,37,94,38,42,40,41,95,43,8],
	[27,81,87,69,82,84,89,85,73,79,80,123,125,13],
	[204,65,83,68,70,71,72,74,75,76,58,34,64],
	[200,124,90,88,67,86,66,78,77,60,62,63,30,202],
	[32,28,31,29]
];
var termKeyMapCpslk=[
	[96,49,50,51,52,53,54,55,56,57,48,45,61,8],
	[27,81,87,69,82,84,89,85,73,79,80,91,93,13],
	[204,65,83,68,70,71,72,74,75,76,59,39,35],
	[200,92,90,88,67,86,66,78,77,44,46,47,30,202],
	[32,28,31,29]
];
var termKeyWdth=[
	[35,35,35,35,35,35,35,35,35,35,35,35,35,69],
	[55,35,35,35,35,35,35,35,35,35,35,35,35,0],
	[65,35,35,35,35,35,35,35,35,35,35,35,35],
	[49,35,35,35,35,35,35,35,35,35,35,35,35,54],
	[252,35,35,35]
];

var keycapsImgNames=new Array(200,201,202,203,204,205);

function termKeyCaps(k) {
	if ((k<28) && (k>=32) && (repeatTimer)) clearTimeout(repeatTimer);
	if (k==204) {
		keycapsCpslk=(!keycapsCpslk);
		var cnr=(keycapsCpslk)? 205:204;
		termKbdSetImg(204,cnr)
	}
	else if ((k==200) || (k==202)) {
		keycapsShift=(!keycapsShift);
		var m=(keycapsShift)? 1:0;
		termKbdSetImg(200,200+m);
		termKbdSetImg(202,202+m)
	}
	else {
		var ch=0;
		if (keycapsShift) {
			ch=keycapsShiftRef[k]
			keycapsShift=false;
			termKbdSetImg(200,200);
			termKbdSetImg(202,202)
		}
		else if (keycapsCpslk) ch=keycapsCpslkRef[k]
		else ch=k;
		keyHandler({which:ch,jsuix_remapped:true})
	}
}

function termKbdSetImg(n,v) {
	if (document.images) {
		var img=(termLayers)? termKbdDocNS4.images['key'+n] : document.images['key'+n];
		img.src=termImages[v].src
	}
}


function termSetKbdButton(v) {
	if (document.images) {
		var img=(termLayers)? termDocNS4.images.term_kbd_show : document.images.term_kbd_show;
		var n=(termKbdOn)? 'kbd_hide' : 'kbd_show';
		var stat=(v)? '_hi' : '_lo';
		img.src=termImages[n+stat].src
	}
}

function termKbdShow() {
	if (termKbdOn) {
		setDivVisibility(termKbdDiv,0);
		termKbdOn=false;
		termSetKbdButton(0)
	}
	else {
		termImgPreload(keycapspath,keycapsImgNames);
		keycapsShift=false;
		keycapsCpslk=false;
		var s='<TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0">\n';
		s+='<TR><TD WIDTH="7" BGCOLOR="'+termPageColor+'"><IMG SRC="'+keycapspath+'spacer.gif" WIDTH="7" HEIGHT="2"><\/TD>\n';
		s+='<TD BGCOLOR="'+termPageColor+'">'+termMakeKbd()+'</TD>\n';
		s+'<TD WIDTH="7" BGCOLOR="'+termPageColor+'"><IMG SRC="'+keycapspath+'spacer.gif" WIDTH="7" HEIGHT="2"><\/TD><\TR>\n';
		s+='<TR><TD HEIGHT="10" COLSPAN="3" BGCOLOR="'+termPageColor+'"><IMG SRC="'+keycapspath+'spacer.gif" WIDTH="2" HEIGHT="10"><\/TD><\/TR>\n';
		s+='<\/TABLE>';
		writeElement(termKbdDiv,s);
		setDivXY(termKbdDiv,conf_term_x,conf_term_y+conf_kbd_offset+conf_rows*conf_rowheigt);
		if (termLayers) termKbdDocNS4=document.layers[termKbdDiv].document;
		termKbdOn=true;
		setDivVisibility(termKbdDiv,1);
		termSetKbdButton(0)
	}
}

function termMakeKbd() {
	var s='<TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0">\n';
	for (var i=0; i<termKeyMap.length; i++) {
		s+='<TR><TD NOWRAP HEIGHT="39" VALIGN="top" NOWRAP BGCOLOR="'+termKbdBgColor+'">';
		for (var k=0; k<termKeyMap[i].length; k++) {
			var kc=termKeyMap[i][k];
			keycapsShiftRef[kc]=termKeyMapShift[i][k];
			keycapsCpslkRef[kc]=termKeyMapCpslk[i][k];
			if (kc==13) {
				s+='<A HREF="javas'+'cript:termKeyCaps(13)" onfocus="if(this.blur)this.blur()"><IMG SRC="'+keycapspath+'13_1.gif" HSPACE="0" VSPACE="0" ALIGN="top" BORDER="0" WIDTH="47" HEIGHT="39"><\/A>';
				continue
			};
			if (kc==32) s+='<IMG SRC="'+keycapspath+'spacer.gif" WIDTH="139" HEIGHT="35" HSPACE="1" VSPACE="1" ALIGN="top">'
			else if (kc==28) {
				s+='<IMG SRC="'+keycapspath+'spacer.gif" WIDTH="23" HEIGHT="35" HSPACE="1" VSPACE="1" ALIGN="top">';
				s+='<A HREF="javasc'+'ript:cursorKbdLeft()" onfocus="if(this.blur)this.blur()" onmousedown="repeatSet(\'left\',1)" onmouseup="repeatClear()"><IMG SRC="'+keycapspath+kc+'.gif" NAME="key'+kc+'" HSPACE="1" VSPACE="1" ALIGN="top" BORDER="0" WIDTH="'+termKeyWdth[i][k]+'" HEIGHT="35"><\/A>';
				continue
			}
			else if (kc==29) {
				s+='<A HREF="javasc'+'ript:cursorKbdRight()" onfocus="if(this.blur)this.blur()" onmousedown="repeatSet(\'right\',1)" onmouseup="repeatClear()"><IMG SRC="'+keycapspath+kc+'.gif" NAME="key'+kc+'" HSPACE="1" VSPACE="1" ALIGN="top" BORDER="0" WIDTH="'+termKeyWdth[i][k]+'" HEIGHT="35"><\/A>';
				continue
			}
			else if (kc==8) {
				s+='<A HREF="javasc'+'ript:termKbdBackspace()" onfocus="if(this.blur)this.blur()" onmousedown="repeatSet(\'backspace\',1)" onmouseup="repeatClear()"><IMG SRC="'+keycapspath+kc+'.gif" NAME="key'+kc+'" HSPACE="1" VSPACE="1" ALIGN="top" BORDER="0" WIDTH="'+termKeyWdth[i][k]+'" HEIGHT="35"><\/A>';
				continue
			}
			s+='<A HREF="javas'+'cript:termKeyCaps('+kc+')" onfocus="if(this.blur)this.blur()"><IMG SRC="'+keycapspath+kc+'.gif" NAME="key'+kc+'" HSPACE="1" VSPACE="1" ALIGN="top" BORDER="0" WIDTH="'+termKeyWdth[i][k]+'" HEIGHT="35"><\/A>';
			if (kc==35) s+='<A HREF="javas'+'cript:termKeyCaps(13)" onfocus="if(this.blur)this.blur()"><IMG SRC="'+keycapspath+'13_2.gif" HSPACE="0" VSPACE="0" ALIGN="top" BORDER="0" WIDTH="37" HEIGHT="36"><\/A>';
		};
		s+='<\/TD><\/TR>\n';
	};
	s+='<\/TABLE>';
	return s
}


// term UI

function termHide() {
	if (repeatTimer) clearTimeout(repeatTimer);
	if (termKbdOn) termKbdShow();
	setDivVisibility(termDiv,0)
}

function makeTerm() {
	window.status='Building terminal ...';
	termLayers=(document.layers)? true:false;
	termSubDivs=(navigator.userAgent.indexOf('Gecko')<0);
	var s='';
	s+='<TABLE BORDER="0" CELLSPACING="0" CELLPADDING="1">\n';
	s+='<TR><TD BGCOLOR="'+termFrameColor+'" COLSPAN="2"><TABLE BORDER="0" CELLSPACING="0" CELLPADDING="2"><TR><TD  BGCOLOR="'+termBgColor+'"><TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0">\n';
	var rstr='';
	for (var c=0; c<conf_cols; c++) rstr+='&nbsp;';
	for (var r=0; r<conf_rows; r++) {
		var id=((termLayers) || (termSubDivs))? '' : ' ID="term_'+r+'"';
		s+='<TR><TD NOWRAP HEIGHT="'+conf_rowheigt+'"'+id+' CLASS="term">'+rstr+'<\/TD><\/TR>\n';
	};
	s+='<\/TABLE><\/TD><\/TR>\n';
	s+='<\/TABLE><\/TD><\/TR>\n';

	s+='<TR>\n<TD VALIGN="middle" BGCOLOR="'+termPageColor+'"><TABLE BORDER="0" CELLSPACING="0" CELLPADDING="1"><TR>\n';

// Uncomment below to enable On-Screen Keyboard.
/*
	s+='<TD><A HREF="javasc'+'ript:termKbdShow()" onmouseover="termSetKbdButton(1); window.status=\'show/hide full graphic keyboard\'; return true" onmouseout="termSetKbdButton(0); window.status=\'\'; return true" onfocus="if(this.blur)this.blur()"><IMG SRC="'+termImgPath+'kbd_show_lo.gif" NAME="term_kbd_show" WIDTH="73" HEIGHT="19" BORDER="0" HSPACE="5" ALT="show/hide keyboard"><\/A><\/TD><\/TR><\/TABLE><\/TD>\n';

	s+='<TD ALIGN="right"><TABLE BORDER="0" CELLSPACING="0" CELLPADDING="1"><TR>\n';
	s+='<TD><A HREF="javasc'+'ript:cursorKbdLeft()" onmouseover="termSetImg(\'left\',1); window.status=\'left\'; return true" onmouseout="termSetImg(\'left\',0); window.status=\'\'; return true" onfocus="if(this.blur)this.blur()" TITLE="cursor left" onmousedown="repeatSet(\'left\',1)" onmouseup="repeatClear()"><IMG SRC="'+termImgPath+'left_lo.gif" NAME="term_left" WIDTH="23" HEIGHT="23" ALT="cursor left" BORDER="0"><\/A><\/TD>\n';
	s+='<TD><A HREF="javasc'+'ript:cursorKbdRight()" onmouseover="termSetImg(\'right\',1); window.status=\'right\'; return true" onmouseout="termSetImg(\'right\',0); window.status=\'\'; return true" onfocus="if(this.blur)this.blur()" TITLE="cursor right" onmousedown="repeatSet(\'right\',1)" onmouseup="repeatClear()"><IMG SRC="'+termImgPath+'right_lo.gif" NAME="term_right" WIDTH="23" HEIGHT="23" ALT="cursor right" BORDER="0"><\/A><\/TD>\n';
	s+='<TD><A HREF="javasc'+'ript:termKbdBackspace()" onmouseover="termSetImg(\'delete\',1); window.status=\'backspace\'; return true" onmouseout="termSetImg(\'delete\',0); window.status=\'\'; return true" onfocus="if(this.blur)this.blur()" TITLE="backspace" onmousedown="repeatSet(\'backspace\',1)" onmouseup="repeatClear()"><IMG SRC="'+termImgPath+'delete_lo.gif" NAME="term_delete" WIDTH="23" HEIGHT="23" ALT="backspace" BORDER="0"><\/A><\/TD>\n';
	s+='<TD><A HREF="javasc'+'ript:termKbdEsc()" onmouseover="termSetImg(\'esc\',1); window.status=\'esc\'; return true" onmouseout="termSetImg(\'esc\',0); window.status=\'\'; return true" onfocus="if(this.blur)this.blur()" TITLE="esc"><IMG SRC="'+termImgPath+'esc_lo.gif" NAME="term_esc" WIDTH="23" HEIGHT="23" ALT="esc" BORDER="0"><\/A><\/TD>\n';
*/
	s+='<\/TR><\/TABLE><\/TD><\/TR>\n';
	s+='<\/TABLE>\n';
	if (termLayers) {
		for (var r=0; r<conf_rows; r++) {
			s+='<LAYER NAME="term_'+r+'" TOP="'+(3+r*conf_rowheigt)+'" LEFT="3" CLASS="term"><\/LAYER>\n'
		};
		termDocNS4=document.layers[termDiv].document;
		termStringStart='<TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0"><TR><TD NOWRAP HEIGHT="'+conf_rowheigt+'" CLASS="term">';
		termStringEnd='<\/TD><\/TR><\/TABLE>';
	}
	else if (termSubDivs) {
		for (var r=0; r<conf_rows; r++) {
			s+='<DIV ID="term_'+r+'" STYLE="position:absolute; top:'+(3+r*conf_rowheigt)+'px; left: 3px;" CLASS="term"><\/DIV>\n'
		};
		termStringStart='<TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0"><TR><TD NOWRAP HEIGHT="'+conf_rowheigt+'" CLASS="term">';
		termStringEnd='<\/TD><\/TR><\/TABLE>';
	};
	writeElement(termDiv,s);
	setDivXY(termDiv,conf_term_x,conf_term_y);
	setDivVisibility(termDiv,1);
	window.status=''
}

function termDisplay(r) {
	var s=termStringStart;
	var curStyle=0;
	for (var i=0; i<conf_cols; i++) {
		var c=term[r][i];
		var cs=termStyle[r][i];
		if (cs!=curStyle) {
			if (curStyle) {
				for (var k=termStyles.length-1; k>=0; k--) {
					var st=termStyles[k];
					if (curStyle&st) s+=termStyleClose[st];
				}
			};
			curStyle=cs;
			for (var k=0; k<termStyles.length; k++) {
				var st=termStyles[k];
				if (curStyle&st) s+=termStyleOpen[st];
			}
		};
		s+= (termSpecials[c])? termSpecials[c] : String.fromCharCode(c);
	};
	if (curStyle>0) {
		for (var k=termStyles.length-1; k>=0; k--) {
			var st=termStyles[k];
			if (curStyle&st) s+=termStyleClose[st];
		}
	};
	s+=termStringEnd;
	writeElement('term_'+r,s,termDocNS4)
}

function termGuiReady() {
	ready=true;
	if (termGuiElementReady(termDiv, self.document)) {
		for (var r=0; r<conf_rows; r++) {
			if (termGuiElementReady('term_'+r,termDocNS4)==false) {
				ready=false;
				break
			}
		}
	}
	else ready=false;
	return ready
}


function cursorKbdLeft() {
	keyHandler({which:28})
}

function cursorKbdRight() {
	keyHandler({which:29})
}

function termKbdBackspace() {
	keyHandler({which:8})
}

function termKbdEsc() {
	keyHandler({which:27})
}

function termKbdClear() {
	if ((!cnslLock) && (!cnslRawMode)) cnslReset();
}

// UI-button repeat

function repeatSet(cmd,on) {
	if (repeatTimer) clearTimeout(repeatTimer);
	repeatTimer=setTimeout('repeatDo("'+cmd+'")',conf_repeat_delay1);
}

function repeatClear() {
	if (repeatTimer) clearTimeout(repeatTimer);
}

function repeatDo(cmd) {
	if (repeatTimer) clearTimeout(repeatTimer);
	if (cmd=='left') cursorKbdLeft()
	else if (cmd=='right') cursorKbdRight()
	else if (cmd=='backspace') termKbdBackspace();
	repeatTimer=setTimeout('repeatDo("'+cmd+'")',conf_repeat_delay2);
}


// basic dynamics

function writeElement(e,t,d) {
	if (document.layers) {
		var doc=(d)? d : self.document;
		doc.layers[e].document.open();
		doc.layers[e].document.write(t);
		doc.layers[e].document.close()
	}
	else if (document.getElementById) {
		var obj=document.getElementById(e);
		obj.innerHTML=t
	}
	else if (document.all) {
		document.all[e].innerHTML=t
	}
}

function setDivXY(d,x,y) {
	if (document.layers) {
		document.layers[d].moveTo(x,y)
	}
	else if (document.getElementById) {
		var obj=document.getElementById(d);
		obj.style.left=x+'px';
		obj.style.top=y+'px'
	}
	else if (document.all) {
		document.all[d].style.left=x+'px';
		document.all[d].style.top=y+'px'
	}
}

function setDivVisibility(d,v) {
	if (document.layers) {
		document.layers[d].visibility= (v)? 'show':'hide';
	}
	else if (document.getElementById) {
		var obj=document.getElementById(d);
		obj.style.visibility= (v)? 'visible':'hidden';
	}
	else if (document.all) {
		document.all[d].style.visibility= (v)? 'visible':'hidden';
	}
}

function termGuiElementReady(e,d) {
	if (document.layers) {
		var doc=(d)? d : self.document;
		return ((doc) && (doc.layers[e]))? true:false
	}
	else if (document.getElementById) {
		return (document.getElementById(e))? true:false
	}
	else if (document.all) {
		return (document.all[e])? true:false
	}
	else return false
}

//eof
