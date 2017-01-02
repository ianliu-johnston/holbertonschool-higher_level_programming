// JS/UIX vi (v0.24)
// (c) mass:werk (N.Landsteiner) 2003
// all rights reserved

var viUndoProps=new Array('col','lc','lr','top','curline');
var viUndoBuffer=null;
var viRedoBuffer=null;

function ViBackupData(obj) {
	for (var i=0; i<viUndoProps.length; i++) {
		var p=viUndoProps[i];
		this[p]=obj[p]
	};
	this.buffer=new Array();
	this.bufheight=new Array();
	for (var i=0; i<obj.buffer.length; i++) {
		this.buffer[i]=obj.buffer[i];
		this.bufheight[i]=obj.bufheight[i];
	}
}

function commandVi(env) {
	env.id='vi';
	env.wantChar=true;
	env.status='wait';
	env.bin='viKeyHandler';
	cnslInsert=false;
	env.buffer=[];
	env.bufheight=[];
	var f=null;
	if ((env.stdin) && (env.stdin.file)) {
		f=env.stdin.file
	}
	else if (env.args[1]) {
		env.filename=vfsGetPath(env.args[1],env.cwd);
		f=vfsOpen(env.filename,4);
		if (f<0) {
			krnlFOut(env.stderr,env.filename+': permission denied.');
			env.status='';
			delete(env.bin);
			return
		}
	};
	if (f) {
		if ((f.kind=='f') || (f.kind=='p') || (f.kind=='b')) {
			for (var i=0; i<f.lines.length; i++) {
				var l=f.lines[i];
				env.buffer[i]=l;
				env.bufheight[i]=viGetLineHeight(env,i)
			}
		}
	};
	if (env.buffer.length==0) {
		env.buffer[0]='';
		env.bufheight[0]=1;
	};
	cnslClear();
	env.bl=cnslMaxLines=conf_rows-1;
	term[env.bl]=cnslGetRowArrray(conf_cols,0);
	termStyle[env.bl]=cnslGetRowArrray(conf_cols,0);
	env.top=0;
	env.lc=0;
	viRefresh(env,true);
	viBeep(env,'+++beta restrictions: no numeral modifiers, no search expressions+++');
	env.cursorblink=cnslBlinkmode;
	env.cursorblock=cnslBlockmode;
	cnslBlinkmode=false;
	cnslBlockmode=true;
	cursorOn();
	env.mode=0
}

function viType(text,style) {
	for (var i=0; i<text.length; i++) {
		var ch=text.charCodeAt(i);
		if (t_c>=conf_cols) {
			t_c=0;
			termDisplay(t_r);
			cnslIncRow();
		};
		if ((ch<32) || (ch>255)) ch=94;
		term[t_r][t_c]=ch;
		termStyle[t_r][t_c]=(style)? style:0;
		t_c++;
	};
	termDisplay(t_r)
}

function viRefresh(env, clearall) {
	var b_l, b_r, b_c, b_lofs, b_col;
	var reset=(clearall)? false: true;
	if (reset) {
		b_r=t_r;
		b_c=t_c;
		b_l=env.curline;
		b_col=env.col
	};
	if (env.top>=env.buffer.length) {
		var th=0;
		var tl=0;
		for (var i=env.buffer.length-1; i>=0; i--) {
			th+=env.bufheight[i];
			tl++;
			if (th>=env.bl) break;
		};
		env.top=Math.max(0,env.buffer.length-Math.min(env.bl,tl));
	};
	env.curline=env.top;
	cnslClearFrameBuffer();
	t_r=0; t_c=0;
	var i=0;
	var l=env.top;
	while (i<env.bl) {
		if (l<env.buffer.length) {
			var lh=env.bufheight[l];
			if (i+lh<=env.bl) {
				viType(env.buffer[l]);
				i+=lh;
				l++
			}
			else {
				while (i<env.bl) { termDisplay(i); i++ }
			}
		}
		else {
			viType('~');
			i++;
		};
		if (i<env.bl) newLine();
	};
	env.bottom=Math.max(env.curline,l-1);
	if (reset) {
		env.curline=b_l;
		env.col=b_col;
		cursorSet(b_r,b_c)
	}
	else {
		env.lc=0;
		env.lr=0;
		env.col=0;
		cursorSet(0,0)
	}
}

function viBackup(env,m) {
	// m=0  -> new backup; m=1 -> undo; m=2 -> redo
	if ((m==1) && (viUndoBuffer==null)) { viBeep(env,'undo buffer empty'); return }
	else if ((m==2) && (viRedoBuffer==null)) { viBeep(env,'redo buffer empty'); return };
	var bu=new ViBackupData(env);
	if (m) {
		cursorOff();
		var bo=(m==1)? viUndoBuffer:viRedoBuffer;
		for (var i=0; i<viUndoProps.length; i++) {
			var p=viUndoProps[i];
			env[p]=bo[p]
		};
		env.buffer=new Array();
		env.bufheight=new Array();
		for (var i=0; i<bo.buffer.length; i++) {
			env.buffer[i]=bo.buffer[i];
			env.bufheight[i]=bo.bufheight[i];
		};
		if (m==1) {
			viRedoBuffer=bu
		}
		else {
			viUndoBuffer=bu
		};
		viRefresh(env);
		cursorOn();
	}
	else {
		env.changed=true;
		viUndoBuffer=bu;
		viRedoBuffer=null
	}
}

function viStatus(env,text) {
	term[env.bl]=cnslGetRowArrray(conf_cols,0);
	termStyle[env.bl]=cnslGetRowArrray(conf_cols,0);
	var msg=(text)? text : 'line: '+(env.curline+1)+'/'+env.buffer.length+', col: '+(env.col+1);
	cnslTypeAt(env.bl,0,msg);
}

function viBeep(env,text) {
	var msg=(text)? text : ' error ';
	term[env.bl]=cnslGetRowArrray(conf_cols,0);
	termStyle[env.bl]=cnslGetRowArrray(conf_cols,0);
	cnslTypeAt(env.bl,0,msg,1);
}

function viSetCursorPos(env) {
	t_r=0;
	t_c=0;
	var l=env.top;
	for (l=env.top; l<env.curline; l++) t_r+=env.bufheight[l];
	env.lr=t_r;
	var ll=env.buffer[env.curline].length;
	if (ll>0) {
		env.col=Math.min(ll-1,env.lc);
		if (env.col>conf_cols-1) t_r+=Math.floor(env.col/(conf_cols-1));
		t_c+=env.col%(conf_cols)
	}
	else {
		t_c=0;
		env.col=0;
	}
}

function viCursorDown(env, sub) {
	if (!sub) cursorOff();
	if (env.curline<env.bottom) {
		env.curline++;
		viSetCursorPos(env);
	}
	else if (env.bottom<env.buffer.length-1) {
		var dh=env.bufheight[env.bottom+1]-env.bufheight[env.top];
		env.top++;
		if (dh>0) env.top+=dh;
		viRefresh(env);
		env.curline=env.bottom;
		viSetCursorPos(env);
	};
	if (env.mode==0) viStatus(env);
	if (!sub) cursorOn();
}

function viCursorUp(env, sub) {
	if (!sub) cursorOff();
	if (env.curline>env.top) {
		env.curline--;
		viSetCursorPos(env);
	}
	else if (env.curline>0) {
		env.top--;
		viRefresh(env);
		env.curline=env.top;
		viSetCursorPos(env);
	};
	if (env.mode==0) viStatus(env);
	if (!sub) cursorOn();
}

function viCursorLeft(env) {
	cursorOff();
	if (env.col>0) {
		env.lc=env.col-1;
		viSetCursorPos(env);
	};
	if (env.mode==0) viStatus(env);
	cursorOn()
}

function viCursorRight(env) {
	cursorOff();
	if (env.col<env.buffer[env.curline].length-1) {
		env.lc=env.col+1;
		viSetCursorPos(env);
	};
	if (env.mode==0) viStatus(env);
	cursorOn()
}


function viMoveTop(env) {
	cursorOff();
	env.top=env.curline;
	viRefresh(env);
	env.curline=env.top;
	viSetCursorPos(env);
	viStatus(env);
	cursorOn();
}

function viMoveLineEnd(env) {
	cursorOff();
	if (env.col<env.buffer[env.curline].length-1) {
		env.lc=Math.max(0, env.buffer[env.curline].length-1);
		viSetCursorPos(env);
	};
	viStatus(env);
	cursorOn()
}

function viMoveLineStart(env,nonblank) {
	cursorOff();
	env.lc=0;
	if (nonblank) {
		var n=1;
		if ((n<env.buffer[env.curline].length-1) && (env.buffer[env.curline].charAt(n)==' ')) {
			while ((n<env.buffer[env.curline].length-1) && (env.buffer[env.curline].charAt(n)==' ')) n++;
			env.lc=n;
		};
	};
	viSetCursorPos(env);
	viStatus(env);
	cursorOn()
}

function viMoveWord(env,dir) {
	cursorOff();
	var wc=krnlWordChar(env.buffer[env.curline].charAt(env.col));
	env.lc=env.col;
	while (true) {
		if (dir>0) {
			env.lc++
			if (env.lc>=env.buffer[env.curline].length) {
				if (env.curline<env.bottom) {
					env.curline++;
					env.lc=0
				}
				else if (env.bottom<env.buffer.length-1) {
					var dh=env.bufheight[env.bottom+1]-env.bufheight[env.top];
					env.top++;
					if (dh>0) env.top+=dh;
					viRefresh(env);
					env.curline=env.bottom;
					env.lc=0
				}
				else {
					env.lc=env.buffer[env.curline].length-1
				};
				break
			}
		}
		else {
			env.lc--
			if (env.lc<0) {
				if (env.curline>0) {
					if (env.curline>env.top) {
						env.curline--;
					}
					else {
						env.top--;
						viRefresh(env);
						env.curline=env.top;
					}
					env.lc=env.buffer[env.curline].length-1;
				}
				else {
					env.lc=0
				};
				break
			}
		};
		var ch=env.buffer[env.curline].charAt(env.lc);
		if (ch==' ') {
			wc=false;
			continue
		};
		if ((wc) && (krnlWordChar(ch))) continue;
		if ((dir<0)  && (krnlWordChar(ch))) {
			var n=env.lc;
			while ((n>=0) && (krnlWordChar(env.buffer[env.curline].charAt(n-1)))) n--;
			env.lc=n
		}
		break
	};
	viSetCursorPos(env);
	viStatus(env);
	cursorOn()
}

function viMoveWordEnd(env) {
	cursorOff();
	var n=env.col+1;
	while ((n<env.buffer[env.curline].length-1) && (env.buffer[env.curline].charAt(n)==' ')) n++;
	env.col=n;
	if ((env.col<env.buffer[env.curline].length-1) && (krnlWordChar(env.buffer[env.curline].charAt(env.col)))) {
		n=env.col;
		while ((n<env.buffer[env.curline].length-1) && (krnlWordChar(env.buffer[env.curline].charAt(n+1)))) n++;
		env.lc=n;
	}
	else {
		env.lc=env.col;
		if (env.lc>=env.buffer[env.curline].length) {
			if (env.curline<env.bottom) {
				env.curline++;
				env.lc=0
			}
			else if (env.bottom<env.buffer.length-1) {
				var dh=env.bufheight[env.bottom+1]-env.bufheight[env.top];
				env.top++;
				if (dh>0) env.top+=dh;
				viRefresh(env);
				env.curline=env.bottom;
				env.lc=0
			}
			else {
				env.lc=env.buffer[env.curline].length-1
			}
		}
	};
	viSetCursorPos(env);
	viStatus(env);
	cursorOn()
}

function viMoveSentence(env,dir) {
	// coming soon
}

function viDelete(env,ofs) {
	var ll=env.buffer[env.curline].length;
	var n=env.col-ofs;
	if ((ll)  && (n>=0)) {
		cursorOff();
		viBackup(env,0);
		var h1=env.bufheight[env.curline];
		for (var i=0; i<h1; i++) term[env.lr+i]=cnslGetRowArrray(conf_cols,0);
		if (n<env.buffer[env.curline].length-1) {
			env.buffer[env.curline]=env.buffer[env.curline].substring(0,n)+env.buffer[env.curline].substring(n+1)
		}
		else {
			env.buffer[env.curline]=env.buffer[env.curline].substring(0,n)	
		};
		var h2=env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
		if (ofs) env.lc--;
		cursorSet(env.lr,0);
		viType(env.buffer[env.curline]);
		viSetCursorPos(env);
		if (h1!=h2) viRefresh(env);
		cursorOn();
	}
}

function viChange(env,what,del) {
	cursorOff();
	viBackup(env,0);
	var l=env.buffer[env.curline];
	var h1=env.bufheight[env.curline];
	var h2=0;
	var p1=0;
	var p2=0;
	var l1=env.curline;
	for (var i=0; i<h1; i++) term[env.lr+i]=cnslGetRowArrray(conf_cols,0);
	if ((what=='C') || (what=='C')) {
		env.buffer[env.curline]=l.substring(0,env.col);
		h2=env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
	}
	else if (what=='c') {
		env.buffer[env.curline]='';
		h2=env.bufheight[env.curline]=1;
		viSetCursorPos(env)
	}
	else if (what=='w') {
		p1=env.col;
		viMoveWord(env,1),
		p2=env.col;
	}
	else if (what=='b') {
		p2=env.col;
		viMoveWord(env,-11),
		p1=env.col;
	}
	else if (what=='e') {
		p1=env.col;
		viMoveWordEnd(env),
		p2=env.col;
	}
	else if (what=='e') {
		p1=env.col;
		viMoveWordEnd(env),
		p2=env.col;
	}
	else if (what=='$') {
		p1=env.col;
		viMoveLineEnd(env),
		p2=env.col;
	}
	else if (what=='0') {
		p2=env.col;
		viMoveLineStart(env),
		p1=env.col;
	}
	else if (what=='^') {
		p2=env.col;
		viMoveLineStart(env,1),
		p1=env.col;
	}
	else if (what=='d') {
		env.copy=env.buffer[env.curline];
		env.linecopy=true;
		for (var i=l1; i<env.buffer.length-2; i++) {
			env.buffer[i]=env.buffer[i+1];
			env.bufheight[i]=env.bufheight[i+1]
		};
		env.buffer.length--;
		env.bufheight.length--;
		if (env.curline==env.buffer.length) {
			env.curline--;
			if (env.buffer.length<=0) {
				env.curline=0;
				env.buffer[0]='';
				env.bufheight[0]=1
			};
			viSetCursorPos(env)
		};
		h2=-1
	};
	if (h2==0) {
		cursorOff();
		if (l1==env.curline) {
			var n1=Math.min(p1,p2);
			var n2=Math.max(p1,p2);
			var ln='';
			var ll=env.buffer[l1].length;
			if (n1>0) ln+=l.substring(0,n1);
			if ((n2>0) && (n2<ll-1)) ln+=l.substring(n2+1);
			env.buffer[l1]=ln;
			h2=env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
			env.lc=n1
		}
		else if ((what=='w') || (what=='e')) {
			env.curline=l1;
			env.lc=env.buffer[l1].length-1;
			h2=h1
		}
		else if (what=='b') {
			env.curline=l1;
			if (p2>0) env.buffer[env.curline]=l.substring(p2);
			h2=env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
			env.lc=0
		}
		else {
			viRefresh(env);
			env.mode=0;
			env.modifier='';
			viBeep(env,' change in same line only ');
			cursorOn();
			return
		}
	};
	viSetCursorPos(env);
	if (h1!=h2) viRefresh(env)
	else {
		cursorSet(env.lr,0);
		viType(env.buffer[env.curline])
	};
	viSetCursorPos(env);
	env.modifier='';
	if (del) {
		viStatus(env);
		env.mode=0
		cursorOn();
	}
	else {
		env.mode=2;
		viStatus(env,' -- INSERT -- ');
		env.append=false;
		cursorOn()
	}
}

function viNewLine(env) {
	var n=env.col;
	var ol='';
	var nl='';
	cursorOff();
	if ((n>0) && (env.append)) n++;
	ol=env.buffer[env.curline].substring(0,n);
	if (n<env.buffer[env.curline].length) nl=env.buffer[env.curline].substring(n);
	env.buffer[env.curline]=ol;
	env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
	viOpenLine(env,1);
	env.lc=0;
	if (nl) {
		env.buffer[env.curline]=nl;
		env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
		viRefresh(env);
	};
	viSetCursorPos(env);
	cursorOn()
}

function viJoinLines(env) {
	if (env.curline<env.buffer.length-1) {
		cursorOff();
		viBackup(env,0);
		env.buffer[env.curline]=env.buffer[env.curline]+env.buffer[env.curline+1];
		env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
		for (var i=env.curline+1; i<env.buffer.length-1; i++) {
			env.buffer[i]=env.buffer[i+1];
			env.bufheight[i]=env.bufheight[i+1]
		};
		env.buffer.length--;
		env.bufheight.length--;
		viStatus(env);
		viRefresh(env);
		cursorOn()
	}
}

function viPaste(env,ofs) {
	if (!env.copy) return;
	cursorOff();
	viBackup(env,0);
	if (env.linecopy) {
		var arg=(ofs)? 0:1;
		viOpenLine(env,arg);
		env.buffer[env.curline]=env.copy;
		env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
		env.lc=0;
		viStatus(env);
		viSetCursorPos(env);
		viRefresh(env);
	};
	cursorOn()
}

function viInsert(env,ch) {
	cursorOff();
	n=env.col;
	var l=env.buffer[env.curline];
	var ll=l.length;
	var lh1=env.bufheight[env.curline];
	if (ll==0) {
		env.buffer[env.curline]=ch;
		cursorSet(env.lr,0);
		viType(env.buffer[env.curline]);
		env.bufheight[env.curline]=1;
		viSetCursorPos(env);
		env.append=true
	}
	else {
		if (env.append) n++;
		var le=(n>=ll-1);
		if ((le) && (env.append)) {
			env.buffer[env.curline]=l+ch;
		}
		else {
			env.buffer[env.curline]=l.substring(0,n)+ch+l.substring(n);
		};
		cursorSet(env.lr,0);
		viType(env.buffer[env.curline]);
		var lh2=env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
		if (env.append) env.append=le;
		env.lc=(env.append)? n:n+1;
		viSetCursorPos(env);
		if (lh1!=lh2) viRefresh(env);
	};
	cursorOn()
}

function viReplace(env,ch) {
	cursorOff();
	n=env.col;
	var l=env.buffer[env.curline];
	var ll=l.length;
	var lh1=env.bufheight[env.curline];
	if (l==0) {
		env.buffer[env.curline]=ch;
		cursorSet(env.lr,0);
		viType(env.buffer[env.curline]);
		env.bufheight[env.curline]=1;
		viSetCursorPos(env);
	}
	else {
		var le=(n>=ll-1);
		if (le) {
			env.buffer[env.curline]=l+ch;
		}
		else {
			if (n<ll-1) env.buffer[env.curline]=l.substring(0,n)+ch+l.substring(n+1)
			else env.buffer[env.curline]=l.substring(0,n)+ch;
		};
		cursorSet(env.lr,0);
		viType(env.buffer[env.curline]);
		var lh2=env.bufheight[env.curline]=viGetLineHeight(env,env.curline);
		env.lc=n+1;
		viSetCursorPos(env);
		if (lh1!=lh2) viRefresh(env);
	};
	cursorOn()
}

function viOpenLine(env,ofs) {
	var n=env.curline+ofs;
	if (n>=env.buffer.length) {
		n=env.buffer.length;
		env.buffer[n]='';
		env.bufheight[n]=1
	}
	else if (n<0) {
		n=0;
		var b=[''];
		var bh=[1];
		for (var i=0; i<env.buffer.length;i++) {
			b[i+1]=env.buffer[i];
			bh[i+1]=env.bufheight[i]
		};
		env.buffer=b;
		env.bufheight=bh
	}
	else {
		var b=[];
		var bh=[];
		for (var i=0; i<n; i++) {
			b[i]=env.buffer[i];
			bh[i]=env.bufheight[i]
		};
		b[n]='';
		bh[n]=1;
		for (var i=n; i<env.buffer.length;i++) {
			b[i+1]=env.buffer[i];
			bh[i+1]=env.bufheight[i]
		};
		env.buffer=b;
		env.bufheight=bh
	};
	env.curline=n;
	if (env.top>n) env.top=n;
	viSetCursorPos(env);
	viRefresh(env);
	viSetCursorPos(env)
}

function viGetLineHeight(env,l) {
	return Math.max(1,1+Math.floor((env.buffer[l].length-1)/conf_cols))
}

function viQuit(env) {
	env.wantChar=false;
	env.status='';
	cnslMaxLines=conf_rows;
	cnslBlinkmode=env.cursorblink
	cnslBlockmode=env.cursorblock
}

function viCmdError(env,msg) {
	cursorOff();
	viBeep(env,msg);
	env.mode=0;
	env.cmd='';
	cnslMaxLines=env.bl
	t_r=env.t_r;
	t_c=env.t_c;
	cursorOn()
}

function viNavCharHandler(env,ch) {
	if (env.modifier) {
		if (env.modifier=='c') {
			if (ch==119) viChange(env,'e') //w
			else if (ch==101) viChange(env,'e')
			else if (ch==98) viChange(env,'b')
			else if (ch==99) viChange(env,'c')
			else if (ch==36) viChange(env,'$')
			else if (ch==94) viChange(env,'^')
			else if (ch==48) viChange(env,'0')
			else {
				env.modifier='';
				viStatus(env);
			}
		}
		else if (env.modifier=='d') {
			if (ch==119) viChange(env,'e',1) //w
			else if (ch==101) viChange(env,'e',1)
			else if (ch==98) viChange(env,'b',1)
			else if (ch==100) viChange(env,'d',1)
			else if (ch==36) viChange(env,'$',1)
			else if (ch==94) viChange(env,'^',1)
			else if (ch==48) viChange(env,'0',1)
			else {
				env.modifier='';
				viStatus(env);
			}
		}
		else if (env.modifier=='y') {
			if (ch==121) {
				env.copy=env.buffer[env.curline];
				env.linecopy=true
			};
			env.modifier='';
			viStatus(env);
		};
		return
	};
	if (ch==111) { viBackup(env,0); viOpenLine(env,1) }
	else if (ch==79) { viBackup(env,0);viOpenLine(env,0) };
	if (ch==99) {
		env.modifier='c';
		viStatus(env,'                                                                    c')
	}
	else if (ch==100) {
		env.modifier='d';
		viStatus(env,'                                                                    d')
	}
	else if (ch==121) {
		env.modifier='y';
		viStatus(env,'                                                                    y')
	}
	else if (ch==104) viCursorLeft(env)
	else if (ch==108) viCursorRight(env)
	else if (ch==107) viCursorUp(env)
	else if (ch==106) viCursorDown(env)
	else if (ch==88) viDelete(env,1)
	else if (ch==120) viDelete(env,0)
	else if (ch==48) viMoveLineStart(env)
	else if (ch==94) viMoveLineStart(env,1)
	else if (ch==36) viMoveLineEnd(env)
	else if (ch==119) viMoveWord(env,1)
	else if (ch==98) viMoveWord(env,-1)
	else if (ch==101) viMoveWordEnd(env)
	else if (ch==122) viMoveTop(env)
	else if (ch==41) viMoveSentence(env,1)
	else if (ch==40) viMoveSentence(env,-1)
	else if (ch==67) viChange(env,'C')
	else if (ch==68) viChange(env,'D',1)
	else if (ch==112) viPaste(env,0)
	else if (ch==80) viPaste(env,1)
	else if (ch==74) viJoinLines(env)
	else if (ch==45) { cursorOff(); viCursorUp(env,1); viMoveLineStart(env,1)}
	else if (ch==43) { cursorOff(); viCursorDown(env,1); viMoveLineStart(env,1)}
	else if (ch==117) viBackup(env,1)
	else if (ch==85) viBackup(env,2)
	else if ((ch==105) || (ch==111) || (ch==79) || (ch==97) || (ch==65) || (ch==73)) {
		env.mode=2;
		cursorOff()
		viStatus(env,' -- INSERT -- ');
		if (ch==65) { viMoveLineEnd(env); cursorOff() }
		else if (ch==73) { viMoveLineStart(env,1); cursorOff() };
		env.append=((ch==97)  || (ch==65));
		if ((ch!=111) && (ch!=79)) viBackup(env,0);
		cursorOn()
	}
	else if (ch==82) {
		env.mode=3;
		cursorOff()
		viStatus(env,' -- REPLACE -- ');
		viBackup(env,0);
		cursorOn()
	}
	else if (ch==58) {
		cursorOff();
		env.t_r=t_r;
		env.t_c=t_c;
		env.cmd='';
		viStatus(env,':');
		cursorSet(env.bl,1);
		cnslMaxLines=conf_cols;
		env.mode=4;
		cursorOn()
	}
}

function viCommandHandler(env) {
	if (env.cmd=='ZZ') env.cmd='x'
	else if (env.cmd=='$') env.cmd=env.buffer.length+1;
	
	if ((env.cmd=='q') || (env.cmd=='quit') || (env.cmd=='q!') || (env.cmd=='quit!'))  {
		// simple quit
		if ((env.changed) && (env.cmd.indexOf('!')<0)) {
			viCmdError(env,'no write since last change (use ! to override)');
			return
		};
		cnslClear();
		viQuit(env);
		return
	}
	else if ((env.cmd) && ((env.cmd.indexOf('w')==0) || (env.cmd.indexOf('x')==0))) {
		// quit and save
		var sp=env.cmd.indexOf(' ');
		var fn='';
		if (sp>0) {
			fn=env.cmd.substring(sp+1);
			env.cmd=env.cmd.substring(0,sp);
			while ((fn) && (fn.charAt(0)==' ')) fn=fn.substring(1);
			while ((fn) && (fn.charAt(fn.length-1)==' ')) fn=fn.substring(0,fn.length-1);
		};
		var force= (env.cmd.indexOf('!')>0);
		var quit= ((env.cmd.indexOf('x')==0) || (env.cmd.indexOf('q')>0));
		if (fn) {
			env.filename=vfsGetPath(fn,env.cwd);
			env.newname=true;
		};
		if (!env.filename) {
			viCmdError(env,'no filename specified'); return
		}
		else if ((env.args[0]=='view') && (!env.newname)) {
			viCmdError(env,'opened in read only mode (write with new name)'); return
		};
		var f=vfsOpen(env.filename,2);
		if (f!=0) {
			if (f==-2) {
				viCmdError(env,env.filename+': permission denied.'); return
			}
			else if (f<0) {
				viCmdError(env,env.filename+':no write permission in parent directory.'); return
			}
			else if (f.inode==krnlDevNull) {
				f.touch();
				viStatus(env, '/dev/null: 0 lines 0 characters')
			}
			else if (f.kind!='f') {
				viCmdError(env,env.filename+': not a plain file'); return
			}
			else if ((env.newname) && (env.changed) && (!force)) {
				viCmdError(env,env.filename+': allready exists (use ! to override)'); return
			}
			else if (!((env.cmd.indexOf('x')==0) && (env.changed==null))) {
				f.lines=env.buffer;
				env.changed=null;
				var chrs=0;
				for (var li=0; li<env.buffer.length; li++) {
					chrs+=env.buffer[li].length;
					f.lines[li]=env.buffer[li]
				};
				f.touch();
				viStatus(env, env.filename+': '+env.buffer.length+' lines '+chrs+' characters')
			}
		}
		else {
			f=vfsCreate(env.filename,'f',0660);
			if (f<0) {
				viCmdError(env,env.filename+': permission denied.'); return
			}
			else if (f==0) {
				viCmdError(env,env.filename+': directory not found.'); return
			}
			else {
				env.changed=null;
				var chrs=0;
				for (var li=0; li<env.buffer.length; li++) {
					chrs+=env.buffer[li].length;
					f.lines[li]=env.buffer[li]
				};
				viStatus(env, env.filename+': '+env.buffer.length+' lines '+chrs+' characters');
			}
		};
		if (quit) {
			cnslClear();
			viQuit(env);
			return
		}
		else {
			env.mode=0
		}
	}
	else if ((env.cmd) && (env.cmd.charAt(0)=='/')) viCmdError(env,'search not implemented yet')
	else if (parseInt(env.cmd,10)>0) {
		// goto line
		cursorOff();
		cnslMaxLines=env.bl;
		env.top=parseInt(env.cmd,10)-1;
		env.cmd='';
		env.mode=0;
		viRefresh(env,true);
		viStatus(env);
		cursorOn()
	}
	else viCmdError(env,'invalid command')
}


// input driver

function viKeyHandler(env) {
	cnslInsert=false;
	var ch=krnlTtyChar;
	if ((ch<28) && (ch>=32) && (repeatTimer)) clearTimeout(repeatTimer);
	if (ch==27) {
		// esc
		cursorOff();
		if (env.mode==4) env.cmd='';
		env.mode=0;
		env.modifier='';
		env.append=false;
		viStatus(env);
		viSetCursorPos(env);
		cursorOn()
	}
	// cursor movements
	else if (ch==28) {
		// left
		if (env.mode<4) { env.modifier=''; viCursorLeft(env) }
	}
	else if (ch==29) {
		// right
		if (env.mode<34) { env.modifier=''; viCursorRight(env) }
	}
	else if (ch==8) {
		// backspace
		if (env.mode==0) { env.modifier=''; viCursorLeft(env) }
		else if (env.mode<4) viDelete(env,1)
		else if ((env.mode==4) && (env.cmd!='')) {
			cursorOff();
			env.cmd=env.cmd.substring(0,env.cmd.length-1);
			var display=(env.cmd.length<conf_cols-3)? ':'+env.cmd : ':'+env.cmd.substr(env.cmd.length-(conf_cols-3));
			viStatus(env,display);
			cursorSet(env.bl, display.length);
			cursorOn();
		}
	}
	else if (ch==30) {
		// up
		if (env.mode<4) { env.modifier=''; viCursorUp(env) }
	}
	else if (ch==31) {
		// down
		if (env.mode<4) { env.modifier=''; viCursorDown(env) }
	}
	else if ((ch>=32) && (ch<256)) {
		if (env.mode==0) viNavCharHandler(env,ch)
		else if (env.mode==2) viInsert(env,String.fromCharCode(ch))
		else if (env.mode==3) viReplace(env,String.fromCharCode(ch))
		else if (env.mode==4) {
			cursorOff();
			env.cmd+=String.fromCharCode(ch);
			var display=(env.cmd.length<conf_cols-3)? ':'+env.cmd : ':'+env.cmd.substr(env.cmd.length-(conf_cols-3));
			viStatus(env,display);
			cursorSet(env.bl, display.length);
			cursorOn()
		}
	}
	else if (ch==13) {
		if (env.mode==0) {
			env.modifier='';
			cursorOff(); 
			viCursorDown(env,1);
			viMoveLineStart(env,1)
		}
		else if (env.mode<4) viNewLine(env)
		else if (env.mode==4) viCommandHandler(env)
	}
}

// eof