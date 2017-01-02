// JS/UIX invaders (v1.01)
// (c) mass:werk (N. Landsteiner) 2005
// all rights reserved
// requires v0.45
// v1.01 - changed to higher score values

cmdFileRegistrate('/usr/bin/invaders', 'b', ['#!/dev/js/commandInvaders'],0755,new Date(2005,6,26,23,0,0));

var invSprites=[
	'       ',' (^o^) ',' (^-^) ',' (( ))',
	' [_A_] ',' [(.)] ',' ( . ) ','( (.) )',
	' ( . ) ','(  .  )','   .   ','       '
	];
var invRows=3;
var invCols=5;
var invMaxBombs=3;
var invBombRate=0.005;
var invTimer=null;
var invDelay=100;
var invNewWaveDelay=1500;

function invObject(y,x) {
	this.x=x;
	this.y=y;
	this.status=1;
}

function commandInvaders(env) {
	env.id='invaders';
	env.wantChar=true;
	env.status='wait';
	env.bin='invSetup';
	cnslInsert=false;
	env._stdout=env.stdout;
	env.stdout=null;
	cnslClear();
	env._bl=cnslMaxLines=conf_rows-1;
	term[env._bl]=cnslGetRowArrray(conf_cols,0);
	termStyle[env._bl]=cnslGetRowArrray(conf_cols,0);
	env.cursorblink=cnslBlinkmode;
	env.cursorblock=cnslBlockmode;
	env.rawmode=cnslRawMode;
	cnslRawMode=true;
	cnslBlinkmode=false;
	cnslBlockmode=true;
	cursorOff();
	invEnv=env;
	krnlFOut(null,[
		'',
		'                       %+i*** JS/UIX - I N V A D E R S ***%-i',
		'',
		'',
		'                       Instructions:',
		'',
		'                       use cursor LEFT and RIGHT to move',
		'                       (or use vi movements alternatively)',
		'                       press space to fire',
		'',
		'                       press "q" or "esc" to quit,',
		'                       "p" to pause the game.',
		'',
		'',
		'',
		'                       %+r press any key to start the game %-r',
		'',
		'',
		'',
		'',
		'',
		'                       (c) mass:werk N.Landsteiner 2005'
		],1)
}

function invSetup() {
	var env=krnlCurPcs;
	var ch=krnlTtyChar;
	if ((ch==27) || (ch==113)) {
		// quit on esc or q
		invQuit()
	}
	else {
		env.bin='invKeyHandler';
		env._right=conf_cols-7;
		env._wave=0;
		env._score=0;
		env._sr=env._bl-2;
		env._bombmaxy=env._sr-4;
		env._bly=env._sr-2;
		var d=Math.floor((conf_cols)/5);
		var d1=Math.floor((conf_cols-3*d)/2);
		env._blockpos=new Array();
		for (var i=0; i<4; i++) {
			var x=d1+i*d;
			env._blockpos[env._blockpos.length]=x-1;
			env._blockpos[env._blockpos.length]=x;
			env._blockpos[env._blockpos.length]=x+1
		};
		invNewWave()
	}
}

function invNewWave() {
	var env=krnlCurPcs;
	cnslLock=true;
	cnslClear();
	env._wave++;
	env._sc=Math.floor((conf_cols-3)/2);
	var c=Math.floor((conf_cols-12)/2);
	cnslTypeAt(4,c,'W A V E  # '+env._wave,4);
	cnslTypeAt(6,c,'Get ready ...');
	if (env._wave>1) {
		cnslTypeAt(env._sr,env._sc,invSprites[4],0);
		invSetScoreBg();
		invScoreDisplay()
	};
	invTimer=setTimeout('invWaveStart()', invNewWaveDelay);
}

function invWaveStart() {
	var env=krnlCurPcs;
	clearTimeout(invTimer);
	cnslClear();
	env._smove=0;
	env._phase=1;
	env._dir=1;
	env._population=0;
	env._shot=0;
	env._over=false;
	env._bombs=0;
	env._inv=new Array();
	env._maxrows=(env._wave==2)? invRows+1:invRows;
	env._maxcols=(env._wave<=2)? invCols:invCols+1;
	for (var r=0; r<env._maxrows; r++) {
		env._inv[r]=new Array();
		for (var c=0; c<env._maxcols; c++) {
			env._inv[r][c]=new invObject(r*2+1,c*8);
			env._population++;
		}
	};
	env._block=cnslGetRowArrray(conf_cols,false);
	for (var i=0; i<env._blockpos.length; i++) {
		var x=env._blockpos[i];
		env._block[x]=true;
		term[env._bly][x]=72
	};
	termDisplay(env._bly);
	env._bomb=new Array();
	env._changed=cnslGetRowArrray(env._bl,false);
	invSetScoreBg();
	invScoreDisplay();
	cnslTypeAt(env._sr,env._sc,invSprites[4],0);
	invStep(env);
	cnslLock=false;
	invTimer=setTimeout('invLoop()', invDelay);
}

function invLoop() {
	clearTimeout(invTimer);
	var env=krnlCurPcs;
	env._enter=new Date();
	if (env._smove) {
		env._sc+=env._smove;
		env._smove=0;
		invTypeAt(env._sr,env._sc,invSprites[4]);
	};
	var s=env._score;
	invStep(env);
	env._phase=(env._phase==1)? 2:1;
	for (var i=0; i<=env._sr; i++) {
		if (env._changed[i]) {
			termDisplay(i);
			env._changed[i]=false
		}
	};
	if (s!=env._score) invScoreDisplay();
	if (env._population==0) {
		invTimer=setTimeout('invNewWave()', invDelay)
	}
	else if ((env._invbottom==env._sr) || (env._over)) {
		cnslLock=true;
		env._phase=(env._over)? 5:4;
		invGameOver();
	}
	else {
		invTimer=setTimeout('invRepeat()', 1)
	}
}

function invStep(env) {
	var right=0, left=conf_cols, bottom=0, dir=env._dir;
	var linestep= ((env._invleft==0) || (env._invright==env._right));
	var shot=(env._shot>0), shotx=env._shotx, shoty=env._sr-env._shot;
	var bomb=env._bomb, block=env._block, blocky=env._bly, isblockrow=false;
	if ((shot) && (env._shot>1)) invTypeAt(shoty+1,shotx,' ');
	for (var r=0; r<env._maxrows; r++) {
		for (var c=0; c<env._maxcols; c++) {
			var i=env._inv[r][c];
			if (i.status==1) {
				if (linestep) {
					invTypeAt(i.y,i.x,invSprites[0]);
					i.y++
				};
				if ((shot) && (shoty==i.y) && ((shotx>i.x) && (shotx<(i.x+6)))) {
					i.status=2;
					env._population--;
					env._score+=50;
					env._shot=shot=0;
					invTypeAt(i.y,i.x,invSprites[3])
				}
				else {
					invTypeAt(i.y,i.x,invSprites[env._phase]);
					if ((i.y<env._bombmaxy) && (env._bombs<invMaxBombs) && (Math.random()<invBombRate)) {
						for (var n=0; n<invMaxBombs; n++) {
							if (bomb[n]==null) {
								bomb[n]=new invObject(i.y+1,i.x+3);
								env._bombs++;
								break
							}
						}
					};
					if (i.y==blocky) isblockrow=true;
					i.x+=dir
					right=Math.max(i.x,right);
					left=Math.min(i.x,left);
					bottom=Math.max(i.y,bottom)
				}
			}
			else if (i.status==2) {
				invTypeAt(i.y,i.x,invSprites[0]);
				i.status=0
			}
		}
	};
	for (var n=0; n<invMaxBombs; n++) {
		var b=bomb[n];
		if (b!=null) {
			if (term[b.y-1]==null) alert('b.y = '+b.y+'\nb.x = '+b.x+'\nb: '+b.toSource());
			if (term[b.y-1][b.x]==86) invTypeAt(b.y-1,b.x,' ');
			if ((b.y==blocky) && (block[b.x])) {
				block[b.x]=false;
				invTypeAt(blocky,b.x,' ');
				b=bomb[n]=null;
				env._bombs--
			}
			else if (b.y==env._sr) {
				if ((b.x>env._sc) && (b.x<(env._sc+6))) {
					env._phase=5;
					env._over=true
				}
				else {
					b=bomb[n]=null;
					env._bombs--
				}
			}
			else if (shot) {
				if (((b.y==shoty) || (b.y==shoty+1)) && (Math.abs(b.x-shotx)<2)) {
					b=bomb[n]=null;
					env._bombs--;
					env._score+=5;
					env._shot=shot=0
				}
			};
			if (b) {
				invTypeAt(b.y,b.x,'V');
				b.y++
			}
		}
	};
	if (shot) {
		if (shoty>0) {
			if ((shoty==blocky) && (env._block[shotx])) {
				env._block[shotx]=false;
				invTypeAt(blocky,shotx,' ');
				env._shot=0
				
			}
			else {
				invTypeAt(shoty,shotx,'|');
				env._shot++
			}
		}
		else env._shot=0;
	};
	env._invleft=left;
	env._invright=right;
	env._invbottom=bottom;
	if ((dir=-1) && (left==0)) env._dir=1
	else if ((dir=1) && (right==env._right)) env._dir=-1;
	// restore any overwritten blocks
	if (isblockrow) {
		for (var i=0; i<env._blockpos.length; i++) {
			var x=env._blockpos[i];
			if ((block[x]) && (term[blocky][x]<=32)) invTypeAt(blocky,x,'H');
		}
	}
}

function invRepeat() {
	// repeat with respect to utime
	clearTimeout(invTimer);
	var leave=new Date();
	invTimer=setTimeout('invLoop()', Math.max(3,invDelay-(leave.getTime() - krnlCurPcs._enter.getTime())))
}

function invGameOver() {
	clearTimeout(invTimer);
	var env=krnlCurPcs;
	if (env._phase==invSprites.length) {
		var c=Math.floor((conf_cols-26)/2);
		cnslTypeAt(3, c, '                          ');
		cnslTypeAt(4, c, '    G A M E  O V E R !    ');
		cnslTypeAt(5, c, '                          ');
		cnslTypeAt(6, c, ' press any key to restart,');
		cnslTypeAt(7, c, ' "q" or "esc" for quit.   ');
		cnslTypeAt(8, c, '                          ');
		cnslLock=false;
		env.bin='invSetup'
	}
	else {
		invTypeAt(env._sr,env._sc,invSprites[env._phase++]);
		termDisplay(env._sr);
		invTimer=setTimeout('invGameOver()', invDelay*2)
	}
}

function invPauseEnter() {
	clearTimeout(invTimer);
	var c=Math.floor((conf_cols-21)/2);
	invTypeAt(4,c,' *** P A U S E D *** ');
	termDisplay(4);
	krnlCurPcs.bin='invPauseHandler'
}

function invPauseHandler() {
	var c=Math.floor((conf_cols-19)/2);
	var ch=krnlTtyChar;
	if ((ch==27) || (ch==113)) {
		// esc or q
		invQuit()
	}
	else {
		var c=Math.floor((conf_cols-21)/2);
		invTypeAt(4,c,'                     ');
		termDisplay(4);
		krnlCurPcs.bin='invKeyHandler';
		invLoop()
	}
}

function invQuit() {
	if (invTimer) clearTimeout(invTimer);
	var env=krnlCurPcs;
	env.wantChar=false;
	env.status='';
	env.bin='invNOP';
	cnslMaxLines=conf_rows;
	cnslBlinkmode=env.cursorblink;
	cnslBlockmode=env.cursorblock;
	cnslRawMode=env.rawmode;
	env.stdout=env._stdout;
	delete(env._stdout);
	cnslClear();
	cursorOn();
	// pick up pending processes
	keyHandler({which:0})
}

function invNOP() {}

function invScoreDisplay() {
	term[krnlCurPcs._bl]=cnslGetRowArrray(conf_cols,0);
	var text=' JS/UIX - Invaders | "q","esc":quit "p":pause |  Wave: '+krnlCurPcs._wave+'  Score: '+krnlCurPcs._score;
	var tbl=term[krnlCurPcs._bl];
	for (var i=0; i<text.length; i++) tbl[i]=text.charCodeAt(i);
	termDisplay(krnlCurPcs._bl)
}

function invSetScoreBg() {
	termStyle[krnlCurPcs._bl]=cnslGetRowArrray(conf_cols,1);
}

function invTypeAt(r,c,text) {
	for (var i=0; i<text.length; i++) term[r][c+i]=text.charCodeAt(i);
	krnlCurPcs._changed[r]=true
}


// input driver

function invKeyHandler() {
	cnslInsert=false;
	var ch=krnlTtyChar;
	var env=krnlCurPcs;
	if ((ch<28) && (ch>=32) && (repeatTimer)) clearTimeout(repeatTimer);
	// cursor movements
	if ((ch==28) || (ch==104)) {
		// left
		if (env._sc>0) env._smove=-1;
	}
	else if ((ch==29) || (ch==108)) {
		// right
		if (env._sc<env._right) env._smove=1;
	}
	else if (ch==32) {
		// space
		if (env._shot==0) {
			env._shot=1;
			env._shotx=env._sc+3
		}
	}
	else if ((ch==27) || (ch==113)) {
		// esc or q
		invQuit()
	}
	else if (ch==112) {
		// p
		invPauseEnter()
	}
}

// eof