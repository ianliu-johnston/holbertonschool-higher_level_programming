// JS/UIX v0.47
// (c) mass:werk (N.Landsteiner) 2003
// all rights reserved
// JS/UIX is NOT a free software (see faq in history.txt).

// basic term os / kernel

var conf_cols=80;
var conf_rows=24;
var conf_rowheigt=15;
var conf_blink_delay=500;
var conf_defaultmail='iphelix'+'@'+'gmail.com';
var conf_defaulturl='http://www.sf2600.org';
var os_version='JS/UIX 0.48';
var os_greeting=' '+os_version+' - The JavaScript virtual OS and terminal application for the web.';
var cnslMaxLines=conf_rows;
var t_r,t_c;
var term=new Array();
var termStyle=new Array();
var blinkBuffer=0;
var blinkTimer;
var repeatTimer;
var cnslBlinkmode=true;
var cnslBlockmode=true;
var cnslSmartmode=true;
var cnslLock=true;
var cnslInsert=false;
var cnslCharMode=false;
var cnslRawMode=false;
var cnslSB=null;
var manPages=new Array();
var usrPATH=new Array();
var usrALIAS=new Array();
var usrVAR=new Array();
var usrHIST=new Array();
var usrHistPtr=0;
var usrGroups=new Array();
var krnlPIDs=new Array();
var krnlCurPcs=null;
var krnlTtyBuffer='';
var krnlTtyChar=0;
var vfsRoot=null;
var krnlGuiCounter=0;
var krnlInodes=0;
var krnlDevNull=0;
var krnlUIDcnt=100;
var krnlUIDs=new Array();
var krnlGIDs=new Array();
//var conf_rootpassskey='7B56B841C38BF38C';
var conf_rootpassskey='735ABB3DBD9AFA7FF2DE4C';
var os_mdate=new Date(2003,10,05,12,0,0);
var isMac = (navigator.userAgent.indexOf('Mac')>=0)? true: false;

var jsuix_hasExceptions = false;

// constructor mods (ie4 fix)

var IE4_keyref;
var IE4_keycoderef;

function IE4_makeKeyref() {
	IE4_keyref= new Array();
	IE4_keycoderef= new Array();
	var hex= new Array('A','B','C','D','E','F');
	for (var i=0; i<=15; i++) {
		var high=(i<10)? i:hex[i-10];
		for (var k=0; k<=15; k++) {
			var low=(k<10)? k:hex[k-10];
			var cc=i*16+k;
			if (cc>=32) {
				var cs=unescape("%"+high+low);
				IE4_keyref[cc]=cs;
				IE4_keycoderef[cs]=cc;
			}
		}
	}
}

function _ie4_strfrchr(cc) {
	return (cc!=null)? IE4_keyref[cc] : '';
}

function _ie4_strchcdat(n) {
	cs=this.charAt(n);
	return (IE4_keycoderef[cs])? IE4_keycoderef[cs] : 0;
}

if (!String.fromCharCode) {
	IE4_makeKeyref();
	String.fromCharCode=_ie4_strfrchr;
};
if (!String.prototype.charCodeAt) {
	if (!IE4_keycoderef) IE4_makeKeyref();
	String.prototype.charCodeAt=_ie4_strchcdat;
}

// constructors

function ManPage(n,content) {
	this.name=n;
	this.content=content;
	manPages[n]=this
}

function KrnlProcess(args) {
	this.pid=krnlPIDs.length;
	this.id='';
	this.stdin=null;
	this.stdout=null;
	this.stderr=null;
	this.er=null;
	this.cwd=null;
	this.args=args;
	this.status='';
	this.child=null;
	krnlPIDs[krnlPIDs.length]=this;
}

function VfsFile(k, lines) {
	this.mdate=new Date();
	this.kind=k;
	this.lines=(lines)? lines:[];
	this.inode=krnlInodes++;
	this.owner=0;
	this.group=0;
	this.mode=0;
	this.icnt=0
}

function _vffTouch() {
	this.mdate=new Date();
}

VfsFile.prototype.touch=_vffTouch;

function VfsFileHandle(fh) {
	var f=null;
	if ((fh) && (typeof fh == 'object')) f=fh;
	this.file=f;
	this.lp=0;
	this.cp=0;
}

function _vfhReadLine() {
	if ((this.lp<this.file.lines.length) && (this.cp>=this.file.lines[this.lp].length) && (this.file.lines[this.lp]!='')) {
		this.cp=0;
		this.lp++
	};
	if (this.lp<this.file.lines.length) {
		var l=this.file.lines[this.lp].length;
		if (this.cp>0) {
			var p=this.cp;
			this.cp=0;
			return [l-p,this.file.lines[this.lp++].substring(p)]
		}
		else {
			return [l,this.file.lines[this.lp++]]
		}
	}
	else {
		return [-1,'']
	}
}

function _vfhClose() {
	if ((this.file.kind=='d') || (this.file.kind=='l')) return;
	if ((this.file.lines.length>0) && (this.file.lines[this.file.lines.length-1]=='')) {
		this.file.lines.length--
	};
	this.rewind()
}

function _vfhPutLine(t) {
	if (this.file.inode==krnlDevNull) return;
	var cl=Math.max(this.file.lines.length-1,0);
	if (this.file.lines[cl]) {
		this.file.lines[cl]+=t
	}
	else {
		this.file.lines[cl]=t;
	};
	this.file.lines[++cl]='';
	this.lp=cl;
	this.cp=0;
	this.file.touch()
}

function _vfhPutNewLine(t) {
	if (this.file.inode==krnlDevNull) return;
	this.lp=this.file.lines.length;
	this.file.lines[this.lp]=t;
	this.cp=this.file.lines[this.lp].length;
	this.file.touch()
}

function _vfhPutChunk(ch) {
	if (this.file.inode==krnlDevNull) return;
	var cl=Math.max(this.file.lines.length-1,0);
	if (this.file.lines[cl]) {
		this.file.lines[cl]+=t
	}
	else {
		this.file.lines[cl]=t;
	};
	this.lp=cl;
	this.cp=this.file.lines[cl].length;
	this.file.touch()
}

function _vfhGetChar() {
	if ((this.lp<this.file.lines.length) && (this.cp>=this.file.lines[this.lp].length) ) {
		cp=0;
		lp++
	};
	if (this.lp<this.file.lines.length) {
		return this.file.lines[this.lp].charAt(this.cp++)
	}
	else {
		return ''
	}
}

function _vfhUngetChar() {
	if (this.lp>=this.file.lines.length) {
		this.lp=this.file.lines.length-1;
		this.cp=Math.max(0,this.file.lines[this.lp].length-1)
	}
	else if (this.cp>0) {
		this.cp--
	}
	else {
		if (this.lp>0) {
			this.lp--;
			this.cp=Math.max(0,this.file.lines[this.lp].length-1)
		}
		else {
			this.cp=0;
			this.lp=0
		}
	}
}

function _vfhRewind() {
	this.cp=0;
	this.lp=0;
}

VfsFileHandle.prototype.readLine=_vfhReadLine;
VfsFileHandle.prototype.close=_vfhClose;
VfsFileHandle.prototype.putLine=_vfhPutLine;
VfsFileHandle.prototype.putNewLine=_vfhPutNewLine;
VfsFileHandle.prototype.putChunk=_vfhPutChunk;
VfsFileHandle.prototype.getChar=_vfhGetChar;
VfsFileHandle.prototype.ungetChar=_vfhUngetChar;
VfsFileHandle.prototype.rewind=_vfhRewind;


// os boot

function krnlInit() {
	// wait for gui
	if (termGuiReady()) {
		krnlGuiCounter=0;
		cnslMaxLines=conf_rows;
		cnslInsert=false;
		cnslCharMode=false;
		t_r=0;
		t_c=0;
		cnslClear();
		cnslBlinkmode=true;
		cnslBlockmode=true;
		krnlPIDs=[];
		krnlCurPcs=new KrnlProcess(['init']);
		krnlCurPcs.id='init';
		krnlUIDs[0]='root';
		krnlGIDs[0]='system';
		krnlGIDs[1]='wheel';
		krnlGIDs[2]='users';
		var r_col=45;
		cnslType(os_version,2);
		cnslType('  starting up [init] ...'); newLine(); newLine();
		cnslType('  terminal (dhtml-gui) ready.'); newLine();
		cnslType('  bringing up the file-system ... ');
		vfsInit(); t_c=r_col; cnslType('ok'); newLine();
		cnslType('  re-entering file-system as root.'); newLine();
		cnslType('  building tree ... ');
		vfsTreeSetup(); t_c=r_col; cnslType('ok'); newLine();
		cnslType('  trying for RC-file ... '); t_c=r_col-3;
		if (self.jsuixRC) {
			cnslType('found'); newLine();
			if ((self.jsuixRX) && (self.jsuixRX())) {
				cnslType('  rc-profile looks good.'); newLine();
			}
			else {
				cnslType('# rc-profile seems to have syntactical problems,'); newLine();
				cnslType('# system may hang, trying further ...'); newLine()
			};
			cnslType('  initializing rc-profile ... ');
			jsuixRC(); t_c=r_col; cnslType('ok'); newLine();
		}
		else {
			cnslType('not found'); newLine();
		};
		cnslType('  re-entering tree for command-system ... ');
		commandInit(); t_c=r_col; cnslType('ok'); newLine();
		cnslType('  setting up system variables ... ');
		sysvarsInit(); t_c=r_col; cnslType('ok'); newLine();
		cnslType('  system up and stable.'); newLine();
		cnslType('  starting login-demon.');
		cnslClear();
		cnslType(os_version,2);
		newLine();newLine();
		newLine();newLine();
		cnslType('               JJJ    SSSSSS        // UU     UU   IIII   XX    XX'); newLine();
		cnslType('                JJ   SS    SS      //  UU     UU    II     XX  XX'); newLine();
		cnslType('                JJ   SS           //   UU     UU    II      XXXX'); newLine();
		cnslType('                JJ    SSSSSS     //    UU     UU    II       XX'); newLine();
		cnslType('          JJ    JJ         SS   //     UU     UU    II      XXXX'); newLine();
		cnslType('          JJ    JJ   SS    SS  //      UU     UU    II     XX  XX'); newLine();
		cnslType('           JJJJJJ     SSSSSS  //        UUUUUUU    IIII   XX    XX'); newLine();
		krnlLogin()		
	}
	else {
		krnlGuiCounter++;
		if (krnlGuiCounter>18000) {
			if (confirm(os_version+':\nYour browser hasn\'t responded for more than 2 minutes.\nRetry?')) krnlGuiCounter=0
			else return;
		};
		window.setTimeout('krnlInit()',200)
	}
}

function krnlLogin(reenter) {
	usrUID=usrGID=0;
	if (reenter) {
		cnslClear();
		cnslType(os_version,2);
		newLine();newLine();
		cnslType('re-login to system or type "exit" for shut down.'); newLine();
		newLine();newLine();
		cnslType('               JJJ    SSSSSS        // UU     UU   IIII   XX    XX'); newLine();
		cnslType('                JJ   SS    SS      //  UU     UU    II     XX  XX'); newLine();
		cnslType('                JJ   SS           //   UU     UU    II      XXXX'); newLine();
		cnslType('                JJ    SSSSSS     //    UU     UU    II       XX'); newLine();
		cnslType('          JJ    JJ         SS   //     UU     UU    II      XXXX'); newLine();
		cnslType('          JJ    JJ   SS    SS  //      UU     UU    II     XX  XX'); newLine();
		cnslType('           JJJJJJ     SSSSSS  //        UUUUUUU    IIII   XX    XX'); newLine();
	};
	krnlCurPcs=new KrnlProcess(['login']);
	krnlCurPcs.id='logind';
	cnslBlinkmode=true;
	krnlLoginDmn();
}

function krnlLoginDmn(user) {
	var dialogrow=17;
	var errmsg=' invalid user-name  ';
	if (krnlCurPcs.user) {
		if (krnlTtyChar>32) {
			krnlCurPcs.passwd+=String.fromCharCode(krnlTtyChar);
			krnlTtyChar=0;
			return
		}
		else if (krnlTtyChar==13) {
			cursorOff();
			if (krnlCrypt(krnlCurPcs.passwd)==conf_rootpassskey) {
				newLine();
				cnslType(' welcome '+user);
				krnlAddUser(krnlCurPcs.user);
				delete(krnlCurPcs.user);
				delete(krnlCurPcs.passwd);
				cnslRawMode=false;
				delete(krnlCurPcs.bin);
				delete(krnlCurPcs.retry);
				cnslCharMode=false;
				krnlCurPcs.id='ttyd'
				krnlCurPcs.args=['TTY'];
				krnlTTY(krnlCurPcs);
				return
			}
			else {
				term[dialogrow]=cnslGetRowArrray(conf_cols,0);
				cursorSet(dialogrow+1,0);
				cnslType(' access denied.');
				delete(krnlCurPcs.user);
				delete(krnlCurPcs.passwd);
				krnlTtyChar=0;
				cnslCharMode=false;
				krnlCurPcs.retry--
			}
		}
		else return
		
	}
	else if (user!=null) {
		cursorOff();
		for (var ofs=user.indexOf(' '); ofs>=0; ofs=user.indexOf(' ')) user=user.substring(0,ofs)+user.substring(ofs+1);
		var nameok=(user!='');
		for (var i=0; i<user.length; i++) {
			if (!krnlWordChar(user.charAt(i))) {
				nameok=false;
				break
			}
		};
		if (user=='exit') {
			termClose();
			return;
		};
		if (user=='root') {
			cnslCharMode=true;
			cursorSet(dialogrow+1,0);
			term[dialogrow+1]=cnslGetRowArrray(conf_cols,0);
			cnslType(' password: ');
			krnlCurPcs.user='root';
			krnlCurPcs.passwd='';
			cursorOn();
			cnslLock=false;
			return
		};
		if ((user.toLowerCase()=='root') || (user.toLowerCase()=='exit')) nameok=false;
		if (nameok) {
			if (user.length>8) user=user.substring(0,8);
			newLine();
			cnslType(' entering system with id '+user);
			if (usrVAR.USER!=user) {
				usrHIST.length=0;
				usrHistPtr=0
			};
			krnlAddUser(user);
			usrVAR.HOME='/home/'+user
			usrVAR.USER=user;
			cnslRawMode=false;
			delete(krnlCurPcs.bin);
			delete(krnlCurPcs.retry);
			krnlCurPcs.id='ttyd'
			krnlCurPcs.args=['TTY'];
			krnlTTY(krnlCurPcs);
			return
		}
		else {
			term[dialogrow]=cnslGetRowArrray(conf_cols,0);
			cursorSet(dialogrow+1,0);
			cnslType(errmsg);
			krnlCurPcs.retry--
		}
	}
	else {
		cursorSet(dialogrow-2,0);
		cnslType('  JS/UIX:Log-on - type user-name (e.g. "guest") and hit <return>.');
		krnlCurPcs.bin='krnlLoginDmn';
		krnlCurPcs.retry=3;
		cnslCharMode=false;
		cnslRawMode=true;
		enableKeyboard()
	};
	cursorSet(dialogrow,0);
	cnslType(' login:');
	cnslChar(2);
	if (krnlCurPcs.retry<=0) cnslType('guest');
	cursorOn();
	cnslLock=false
}

function krnlAddUser(user) {
	var lsh='/bin/sh';
	usrVAR.UID=0; usrVAR.GID=0;
	var etc=vfsGetFile('/etc');
	if ((typeof etc=='object') && (etc.kind!='d')) {
		vfsUnlink('/etc');
		etc=0
	};
	if (etc<=0) etc=vfsCreate('/etc','d',01777);
	usrVAR.GID=1;
	var hdr=vfsGetFile('/home');
	if ((typeof hdr=='object') && (hdr.kind!='d')) {
		vfsUnlink('/home');
		hdr=0
	};
	if (hdr<=0) hdr=vfsCreate('/home','d',0777);
	var hdir='/home/'+user;
	var passwd=vfsGetFile('/etc/passwd');
	if (passwd<=0) {
		passwd=vfsCreate('/etc/passwd','f',0644);
		passwd.lines[0]='root:*:0:1:root:/root:'+lsh
	};
	var group=vfsGetFile('/etc/group');
	if (group<=0) {
		group=vfsCreate('/etc/group','f',0644);
		group.lines[0]='system:0:root';
		group.lines[1]='users:2:';
		group.lines[2]='wheel:1:root'
	};
	if (user=='root') {
		usrVAR.UID='0';
		usrVAR.GID='1';
		usrGroups[0]=1;
		usrGroups[1]=1;
		usrGroups[2]=1;
		usrVAR.USER=user;
		hdir=usrVAR.HOME='/root';
		var uhd=vfsGetFile(hdir);
		if ((typeof uhd=='object') && (uhd.kind!='d')) {
			vfsUnlink(hdir);
			uhd=0
		};
		if (uhd<=0) uhd=vfsCreate(hdir,'d',0700);
		var hstf=vfsGetFile(hdir+'/.history');
		if (hstf<=0) hstf=vfsCreate(hdir+'/.history','f',0600);
		usrHIST=hstf.lines;
		usrHistPtr=hstf.lines.length;
		return
	};
	var exists=false;
	for (var i=1; i<passwd.lines.length; i++) {
		if (passwd.lines[i].indexOf(user+':')==0) {
			exists=true;
			var up=passwd.lines[i].split(':');
			usrVAR.UID=up[2];
			break
		}
	};
	if (!exists) {
		krnlUIDcnt++;
		passwd.lines[passwd.lines.length]=user+':*:'+krnlUIDcnt+':2:'+user+':'+hdir+':'+lsh;
		passwd.touch()
	};
	usrGroups.length=0;
	var groups=new Array('wheel','users');
	var groupids=new Array(1,2);
	for (var i=0; i<groups.length; i++) {
		var gn=groups[i];
		exists=false;
		var gl=-1;
		for (var k=0; k<group.lines.length; k++) {
			if (group.lines[k].indexOf(gn+':')==0) {
				exists=true;
				gl=k;
				break;
			}
		};
		if (exists) {
			var ll=group.lines[gl].substring(gn.length+3);
			var gs=ll.split(',');
			var uexists=false;
			for (var j=0; j<gs.length; j++) {
				if (gs[j]==user) uexists=true;
			};
			if (!uexists) {
				if (ll) {
					gs[gs.length]=user;
					group.lines[gl]=gn+':'+groupids[i]+':'+gs.join();
				}
				else {
					group.lines[gl]=gn+':'+groupids[i]+':'+user
				};
				group.touch()
			}
		}
		else {
			group.lines[group.lines.length]=gn+':'+groupids[i]+':'+user;
			group.touch()
		}
	};
	usrVAR.HOME=hdir;
	var uhd=vfsGetFile(hdir);
	if ((typeof uhd=='object') && (uhd.kind!='d')) {
		vfsUnlink(hdir);
		uhd=0
	};
	if (uhd<=0) uhd=vfsCreate(hdir,'d',0750);
	uhd.owner=krnlUIDcnt;
	usrVAR.UID=''+krnlUIDcnt;
	krnlUIDs[krnlUIDcnt]=user;
	usrVAR.GID='2';
	usrGroups[1]=1;
	usrGroups[2]=1;
	var hstf=vfsGetFile(hdir+'/.history');
	if (hstf<=0) hstf=vfsCreate(hdir+'/.history','f',0600);
	usrHIST=hstf.lines;
	usrHistPtr=hstf.lines.length;

}


// crypt

var crptSalt= '0e7aff21';
var crptHexCode = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F');
var crptKeyquence= new Array();

for (var i = 0; i<crptSalt.length; i+=2) {
	crptKeyquence[crptKeyquence.length]=parseInt(crptSalt.substring(i, i+2),16);
}

function krnlCrypt(x) {
	var enc='';
	var k=0;
	var last=0;
	for (var i=0; i<x.length; i++) {
		var s= (x.charCodeAt(i)+crptKeyquence[k++]+last) % 256;
		last=s;
		var h= Math.floor(s/16);
		var l= s-(h*16);
		enc+= crptHexCode[h]+crptHexCode[l];
		if (k==crptKeyquence.length) k=0;
	};
	return enc
}

// console

function cnslClearFrameBuffer() {
	for (var r=0; r<conf_rows; r++) {
		term[r]=cnslGetRowArrray(conf_cols,0);
		termStyle[r]=cnslGetRowArrray(conf_cols,0)
	}
}

function cnslGetRowArrray(l,v) {
	var a=new Array();
	for (var i=0; i<l; i++) a[i]=v;
	return a
}

function cnslType(text,style) {
	for (var i=0; i<text.length; i++) {
		var ch=text.charCodeAt(i);
		if ((ch<32) || (ch>255)) ch=94;
		term[t_r][t_c]=ch;
		termStyle[t_r][t_c]=(style)? style:0;
		var last_r=t_r;
		cnslIncCol();
		if (t_r!=last_r) termDisplay(last_r);
	};
	termDisplay(t_r)
}

function cnslWrite(text) {
	// term type with style markup (%+<style> | %-<style> | %n); <style> ::= p|r|u|i|s
	var chunks=text.split('%');
	var esc=(text.charAt(0)!='%');
	var style=0;
	for (var i=0; i<chunks.length; i++) {
		if (esc) {
			if (chunks[i].length>0) cnslType(chunks[i],style)
			else if (i>0) cnslType('%', style);
			esc=false
		}
		else {
			var func=chunks[i].charAt(0);
			if ((chunks[i].length==0) && (i>0)) {
				cnslType("%",style);
				esc=true
			}
			else if (func=='n') {
				newLine();
				if (chunks[i].length>1) cnslType(chunks[i].substring(1),style);
			}
			else if (func=='+') {
				var opt=chunks[i].charAt(1);
				opt=opt.toLowerCase();
				if (opt=='p') style=0
				else if (opt=='r') style|=1
				else if (opt=='u') style|=2
				else if (opt=='i') style|=4
				else if (opt=='s') style|=8;
				if (chunks[i].length>2) cnslType(chunks[i].substring(2),style);
			}
			else if (func=='-') {
				var opt=chunks[i].charAt(1);
				opt=opt.toLowerCase();
				if (opt=='p') style|=0
				else if (opt=='r') style&=~1
				else if (opt=='u') style&=~2
				else if (opt=='i') style&=~4
				else if (opt=='s') style&=~8;
				if (chunks[i].length>2) cnslType(chunks[i].substring(2),style);
			}
			else if ((chunks[i].length>1) && (chunks[i].charAt(0)=='C') && (chunks[i].charAt(1)=='S')) {
				cnslClear();
				if (chunks[i].length>3) cnslType(chunks[i].substring(3),style);
			}
			else {
				if (chunks[i].length>0) cnslType(chunks[i],style);
			}
		}
	}
}

// smart console suite for minimal scrolling

function cnslSmartWrite(text) {
	// term type with minimal scrolling (via krnlFOut only)
	var chunks=text.split('%');
	var esc=(text.charAt(0)!='%');
	var style=0;
	for (var i=0; i<chunks.length; i++) {
		if (esc) {
			if (chunks[i].length>0) cnslSmartType(chunks[i],style)
			else if (i>0) cnslSmartType('%', style);
			esc=false
		}
		else {
			var func=chunks[i].charAt(0);
			if ((chunks[i].length==0) && (i>0)) {
				cnslSmartType("%",style);
				esc=true
			}
			else if (func=='n') {
				cnslSBNewLine();
				if (chunks[i].length>1) cnslSmartType(chunks[i].substring(1),style);
			}
			else if (func=='+') {
				var opt=chunks[i].charAt(1);
				opt=opt.toLowerCase();
				if (opt=='p') style=0
				else if (opt=='r') style|=1
				else if (opt=='u') style|=2
				else if (opt=='i') style|=4
				else if (opt=='s') style|=8;
				if (chunks[i].length>2) cnslSmartType(chunks[i].substring(2),style);
			}
			else if (func=='-') {
				var opt=chunks[i].charAt(1);
				opt=opt.toLowerCase();
				if (opt=='p') style|=0
				else if (opt=='r') style&=~1
				else if (opt=='u') style&=~2
				else if (opt=='i') style&=~4
				else if (opt=='s') style&=~8;
				if (chunks[i].length>2) cnslSmartType(chunks[i].substring(2),style);
			}
			else if ((chunks[i].length>1) && (chunks[i].charAt(0)=='C') && (chunks[i].charAt(1)=='S')) {
				cnslClear();
				cnslSBInit();
				if (chunks[i].length>3) cnslSmartType(chunks[i].substring(3),style);
			}
			else {
				if (chunks[i].length>0) cnslSmartType(chunks[i],style);
			}
		}
	}
}

function cnslSmartType(text,style) {
	// type to scroll buffer cnslSB (via krnlFOut only)
	for (var i=0; i<text.length; i++) {
		var ch=text.charCodeAt(i);
		if ((ch<32) || (ch>255)) ch=94;
		cnslSB.lines[cnslSB.r][cnslSB.c]=ch;
		cnslSB.styles[cnslSB.r][cnslSB.c]=(style)? style:0;
		cnslSB.c++;
		if (cnslSB.c>=conf_cols) cnslSBNewLine();
	}
}

function cnslSBNewLine() {
	cnslSB.r++;
	cnslSB.c=0;
	cnslSB.lines[cnslSB.r]=cnslGetRowArrray(conf_cols,0);
	cnslSB.styles[cnslSB.r]=cnslGetRowArrray(conf_cols,0)
}

function cnslSBInit() {
	cnslSB=new Object();
	cnslSB.lines=new Array();
	cnslSB.styles=new Array();
	cnslSB.r=0;
	cnslSB.c=t_c;
	cnslSB.lines[0]=cnslGetRowArrray(conf_cols,0);
	cnslSB.styles[0]=cnslGetRowArrray(conf_cols,0);
	for (var i=0; i<t_c; i++) {
		cnslSB.lines[0][i]=term[t_r][i];
		cnslSB.styles[0][i]=termStyle[t_r][i];
	}
}

function cnslSBOut() {
	var buflen=cnslSB.lines.length;
	if (t_r+buflen<cnslMaxLines) {
		for (var i=0; i<buflen; i++) {
			var r=t_r+i;
			term[r]=cnslSB.lines[i];
			termStyle[r]=cnslSB.styles[i];
			termDisplay(r)
		};
		t_r+=cnslSB.r;
		t_c=cnslSB.c
	}
	else if (buflen>=cnslMaxLines) {
		var ofs=buflen-cnslMaxLines;
		for (var i=0; i<cnslMaxLines; i++) {
			var r=ofs+i;
			term[i]=cnslSB.lines[r];
			termStyle[i]=cnslSB.styles[r];
			termDisplay(i)
		};
		t_r=cnslMaxLines-1;
		t_c=cnslSB.c
	}
	else {
		var dr=cnslMaxLines-buflen;
		var ofs=t_r-dr;
		for (var i=0; i<dr; i++) {
			var r=ofs+i;
			for (var c=0; c<conf_cols; c++) {
				term[i][c]=term[r][c];
				termStyle[i][c]=termStyle[r][c];
			};
			termDisplay(i)
		};
		for (var i=0; i<buflen; i++) {
			var r=dr+i;
			term[r]=cnslSB.lines[i];
			termStyle[r]=cnslSB.styles[i];
			termDisplay(r)
		};
		t_r=cnslMaxLines-1;
		t_c=cnslSB.c
	};
	cnslSB=null
}

// text related

function txtStripStyles(text) {
	// strip markup from text
	var chunks=text.split('%');
	var esc=(text.charAt(0)!='%');
	var rs='';
	for (var i=0; i<chunks.length; i++) {
		if (esc) {
			if (chunks[i].length>0) rs+=chunks[i];
			else if (i>0) rs+='%';
			esc=false
		}
		else {
			var func=chunks[i].charAt(0);
			if ((chunks[i].length==0) && (i>0)) {
				rs+='%';
				esc=true
			}
			else if (func=='n') {
				rs+='\n';
				if (chunks[i].length>1) rs+=chunks[i].substring(1);
			}
			else if ((func=='+') || (func=='-')) {
				if (chunks[i].length>2) rs+=chunks[i].substring(2);
			}
			else {
				if (chunks[i].length>0) rs+=chunks[i];
			}
		}
	};
	return rs
}

function txtNormalize(n,m) {
	var s=''+n;
	while (s.length<m) s='0'+s;
	return s
}

function txtFillLeft(t,n) {
	if (typeof t != 'string') t=''+t;
	while (t.length<n) t=' '+t;
	return t  
}

function txtCenter(t,l) {
	var s='';
	for (var i=t.length; i<l; i+=2) s+=' ';
	return s+t
}

function txtStringReplace(s1,s2,t) {
	var l1=s1.length;
	var l2=s2.length;
	var ofs=t.indexOf(s1);
	while (ofs>=0) {
		t=t.substring(0,ofs)+s2+t.substring(ofs+l1);
		ofs=t.indexOf(s1,ofs+l2)
	};
	return t
}

// basic console output

function cnslTypeAt(r,c,text,style) {
	var tr1=t_r;
	var tc1=t_c;
	cursorSet(r,c);
	for (var i=0; i<text.length; i++) {
		var ch=text.charCodeAt(i);
		if ((ch<32) || (ch>255)) ch=94;
		term[t_r][t_c]=ch;
		termStyle[t_r][t_c]=(style)? style:0;
		var last_r=t_r;
		cnslIncCol();
		if (t_r!=last_r) termDisplay(last_r);
	};
	termDisplay(t_r);
	t_r=tr1;
	t_c=tc1
}

function cnslChar(ch, style) {
	term[t_r][t_c]=ch;
	termStyle[t_r][t_c]=(style)? style:0;
	termDisplay(t_r);
	cnslIncCol()
}

function cnslSet(ch,r,c,style) {
	term[r][c]=ch;
	termStyle[t_r][t_c]=(style)? style:0;
	termDisplay(r);
}

function cnslIncCol() {
	t_c++;
	if (t_c>=conf_cols) {
		t_c=0;
		cnslIncRow();
	}
}

function cnslIncRow() {
	t_r++;
	if (t_r>=cnslMaxLines) {
		// scroll
		cnslScrollLines(0,cnslMaxLines);
		t_r=cnslMaxLines-1
	}
}

function cnslScrollLines(start, end) {
	window.status='Scrolling lines ...';
	start++;
	for (var ri=start; ri<end; ri++) {
		var rt=ri-1;
		term[rt]=term[ri];
		termStyle[rt]=termStyle[ri]
	};
	// clear last line
	var rt=end-1;
	term[rt]=cnslGetRowArrray(conf_cols,0);
	termStyle[rt]=cnslGetRowArrray(conf_cols,0);
	termDisplay(rt);
	for (var r=end-1; r>=start; r--) termDisplay(r-1);
	window.status='';
}

function newLine() {
	t_c=0;
	cnslIncRow();
}

function cnslClear() {
	window.status='Clearing display ...';
	cnslMaxLines=conf_rows;
	cnslInsert=false;
	for (var ri=0; ri<cnslMaxLines; ri++) {
		term[ri]=cnslGetRowArrray(conf_cols,0);
		termStyle[ri]=cnslGetRowArrray(conf_cols,0);
		termDisplay(ri)
	};
	t_r=0;
	t_c=0;
	window.status=''
}

function cursorSet(r,c) {
	t_r=r%conf_rows;
	t_c=c%conf_cols;
}

function cursorOn() {
	if (blinkTimer) clearTimeout(blinkTimer);
	blinkBuffer=termStyle[t_r][t_c];
	cursorBlink()
}

function cursorOff() {
	if (blinkTimer) clearTimeout(blinkTimer);
	termStyle[t_r][t_c]=blinkBuffer;
	termDisplay(t_r)
}

function cursorBlink() {
	if (blinkTimer) clearTimeout(blinkTimer);
	if (cnslBlockmode) {
		termStyle[t_r][t_c]=(termStyle[t_r][t_c]&1)? termStyle[t_r][t_c]&254:termStyle[t_r][t_c]|1;
	}
	else {
		termStyle[t_r][t_c]=(termStyle[t_r][t_c]&2)? termStyle[t_r][t_c]&253:termStyle[t_r][t_c]|2;
	};
	termDisplay(t_r);
	if (cnslBlinkmode) blinkTimer=setTimeout('cursorBlink()', conf_blink_delay)
}

function cursorLeft() {
	cursorOff();
	var r=t_r;
	var c=t_c;
	if (c>0) c--
	else if (r>0) {
		c=conf_cols-1;
		r--
	};
	if (term[r][c]>=32) {
		t_r=r;
		t_c=c
	}
	else {
		if (repeatTimer) clearTimeout(repeatTimer);
	}
	cnslInsert=true;
	cursorOn()
}

function cursorRight() {
	cursorOff();
	var r=t_r;
	var c=t_c;
	if (c<conf_cols-1) c++
	else if (r<cnslMaxLines-1) {
		c=0;
		r++
	};
	if (term[r][c]<32) {
		cnslInsert=false;
		if (repeatTimer) clearTimeout(repeatTimer);
	};
	if (term[t_r][t_c]>=32) {
		t_r=r;
		t_c=c
	};
	cursorOn()
}

function cnslBackspace() {
	cursorOff();
	var r=t_r;
	var c=t_c;
	if (c>0) c--
	else if (r>0) {
		c=conf_cols-1;
		r--
	};
	if (term[r][c]>=32) {
		cnslScrollLeft(r, c);
		t_r=r;
		t_c=c
	};	
	cursorOn()
}

function cnslScrollLeft(r,c) {
	var rows=new Array();
	rows[0]=r;
	while (term[r][c]>=32) {
		var ri=r;
		var ci=c+1;
		if (ci==conf_cols) {
			ci=0;
			if (ri<cnslMaxLines-1) {
				ri++;
				rows[rows.length]=ri
			}
		};
		term[r][c]=term[ri][ci];
		termStyle[r][c]=termStyle[ri][ci];
		c++;
		if (c==conf_cols) {
			c=0;
			if (r<cnslMaxLines-1) {
				r++
			}
		}
	};
	if (term[r][c]!=0) term[r][c]=0;
	for (var i=0; i<rows.length; i++) termDisplay(rows[i]);
}

function cnslScrollRight(r,c) {
	var rows=new Array();
	rows[0]=r;
	var end=cnslGetLineEnd(r,c);
	var ri=end[0];
	var ci=end[1];
	if ((ci==conf_cols-1) && (ri==cnslMaxLines-1)) {
		cnslScrollLines(0,cnslMaxLines);
		t_r--;
		rows[0]--;
		ri--
	};
	while (term[ri][ci]>=32) {
		var rt=ri;
		var ct=ci+1;
		if (ct==conf_cols) {
			ct=0;
			rt++
		};
		term[rt][ct]=term[ri][ci];
		termStyle[rt][ct]=termStyle[ri][ci];
		if ((ri==r) && (ci==c)) break;
		ci--;
		if (ci<0) {
			ci=conf_cols-1;
			ri--;
			rows[rows.length]=ri
		}
	};
	for (var i=0; i<rows.length; i++) termDisplay(rows[i]);
}

function cnslReset() {
	if (cnslLock) return;
	if (repeatTimer) clearTimeout(repeatTimer);
	cursorOff();
	cnslLock=true;
	cnslClear();
	cnslPrompt();
	cursorOn()
}

function cnslPrompt() {
	cnslLock=true;
	var prompt='';
	if (usrVAR.PS) {
		var pv=shellSubstitute(usrVAR.PS);
		prompt=pv.join(' ');
	};
	if (!prompt) prompt=(usrVAR.USER)? '['+usrVAR.USER+']':'[]';
	cnslType(prompt);
	if (usrVAR.UID=='0') cnslChar(4)
	else cnslChar(1);
	cnslChar(2);
	cnslLock=false
}


function cnslGetLineEnd(r,c) {
	if (term[r][c]<32) {
		c--;
		if (c<0) {
			if (r>0) {
				r--;
				c=conf_cols-1
			}
			else {
				c=0
			}
		}
	};
	while (term[r][c]>=32) {
		var ri=r;
		var ci=c+1;
		if (ci==conf_cols) {
			ci=0;
			if (ri<cnslMaxLines-1) ri++;
		};
		if (term[ri][ci]<32) break;
		c++;
		if (c==conf_cols) {
			c=0;
			if (r<cnslMaxLines-1) {
				r++
			}
		}
	};
	return [r,c];
}

function cnslGetLine() {
	var end=cnslGetLineEnd(t_r,t_c);
	var r=end[0];
	var c=end[1];
	var input=new Array();
	while (term[r][c]>=32) {
		input[input.length]=String.fromCharCode(term[r][c]);
		if (c>0) c--
		else if (r>0) {
			c=conf_cols-1;
			r--
		}
		else break;
	};
	input.reverse();
	return input.join('')
}

function cnslClearLine() {
	var end=cnslGetLineEnd(t_r,t_c);
	var r=end[0];
	var c=end[1];
	var line='';
	while (term[r][c]>=32) {
		term[r][c]=0;
		if (c>0) {
			c--
		}
		else if (r>0) {
			termDisplay(r);
			c=conf_cols-1;
			r--
		}
		else break;
	};
	if (r!=end[0]) termDisplay(r);
	c++;
	cursorSet(r,c)
}

// vfs file system

function vfsGetPath(path,cwd) {
	while ((cwd) && (cwd.charAt(cwd.length-1)=='/')) cwd=cwd.substring(0,cwd.length-1);
	if (path) {
		if (path.charAt(0)!='/') path=cwd+'/'+path;
	}
	else path=cwd;
	var pa=path.split('/');
	var cwa=new Array();
	for (var i=0; i<pa.length; i++) {
		var f=pa[i];
		if (f=='') continue;
		if (f=='..') {
			if (cwa.length>0) cwa.length--;
		}
		else if (f=='~') { cwa.length=0; cwa[0]=usrVAR.HOME.substring(1) }
		else if (f!='.') cwa[cwa.length]=f;
	};
	return fp='/'+cwa.join('/')
}

function vfsGetDir(absPath) {
	var pa=absPath.split('/');
	var d=new Array();
	d[0]=vfsRoot;
	di=0;
	for (var i=1; i<pa.length; i++) {
		cd=d[di];
		var pd=pa[i];
		if ((!cd) || (cd.kind!='d')) {
			return 0;
		}
		else if (!vfsPermission(cd,1)) return -1
		else if ((pd=='.')  || (pd=='')) continue
		else if (pd=='..') {
			if (di>0) {
				di--;
				d.length--
			}
		}
		else if ((cd.lines[pd]) && (cd.lines[pd].kind=='d')) {
			di++;
			d[di]=cd.lines[pd]
		}
		else {
			return 0
		}
	};
	return d[di]
}

function vfsGetFile(absPath) {
	while (absPath.charAt(absPath.length-1)=='/') absPath=absPath.substring(0,absPath.length-1);
	var pa=absPath.split('/');
	var f=vfsRoot;
	for (var i=0; i<pa.length; i++) {
		if (pa[i]=='') continue
		else if (f.lines[pa[i]]) {
			if (vfsPermission(f,1)) f=f.lines[pa[i]]
			else return -1;
		}
		else return 0
	};
	return f
}

function vfsGetParent(absPath) {
	while (absPath.charAt(absPath.length-1)=='/') absPath=absPath.substring(0,absPath.length-1);
	if (absPath=='') return null;
	var pn=vfsDirname(absPath);
	return vfsGetDir(pn)
}

function vfsBasename(path) {
	if (path=='') return '';
	var fos=path.lastIndexOf('/');
	return (fos==path.length-1)? '': (fos>=0)? path.substring(fos+1): path;
}

function vfsDirname(path) {
	if (path=='') return '';
	var fos=path.lastIndexOf('/');
	return (fos==0)? '/' : (fos>0)? path.substring(0,fos): '';
}

function vfsOpen(absPath,m) {
	var f=vfsGetFile(absPath);
	if (f<=0) return f;
	if ((m) && (!vfsPermission(f,m))) return -2
	else if (f) return f
	else return 0;
}

function vfsFileCopy(sf,tf,append) {
	if (!append) tf.lines=[];
	for (var i=0; i<sf.lines.length; i++) tf.lines[tf.lines.length]=sf.lines[i];
}

function vfsCreate(absPath,kind,fmode,cdate) {
	var fn=vfsBasename(absPath);
	var pn=vfsDirname(absPath);
	if ((fn=='') || (fn=='.') || (fn=='..') || (fn=='~')) return 0;
	if ((fn) && (pn)) {
		var pd=vfsGetDir(pn);
		if (pd<=0) return pd
		else if (pd) {
			if ((pd.mode) && (!vfsPermission(pd,2))) return -1;
			//if (pd.lines[fn]) return -3;
			var f=(kind=='d')? new VfsFile('d',{}) :  new VfsFile(kind,[]);
			f.icnt=(kind=='d')? 2:1;
			if (cdate) f.mdate=cdate;
			if (fmode) f.mode=fmode;
			if (usrVAR.UID!=null) f.owner=usrVAR.UID;
			if (usrVAR.GID!=null) f.group=usrVAR.GID;
			pd.lines[fn]=f;
			pd.mdate=f.mdate;
			return f
		}
	};
	return 0
}

function vfsForceFile(absPath,kind,flines,fmode,cdate) {
	var f=vfsCreate(absPath,kind,fmode,cdate);
	if (typeof f=='object') f.lines=flines;
	return f
}

function vfsUnlink(absPath) {
	var fn=vfsBasename(absPath);
	var pn=vfsDirname(absPath);
	if ((fn=='') || (fn=='.') || (fn=='~') || (fn=='..')) return 0;
	if ((fn) && (pn)) {
		var pd=vfsGetDir(pn);
		if (pd<=0) return pd
		else if (pd) {
			if ((pd.mode) && (!vfsPermission(pd,2))) return -1;
			if (pd.lines[fn]) {
				if ((pd.mode&01000) && ((pd.owner!=usrVAR.UID) && (pd.lines[fn].owner!=usrVAR.UID))) return -1;
				delete(pd.lines[fn])
				pd.touch();
				return 1
			}
		}
	};
	return 0
}

function vfsMove(fn1,fn2) {
	var f1=vfsOpen(fn1,4);
	if (typeof f1=='object') {
		var d=vfsGetParent(fn2);
		if (typeof d=='object') {
			if ((vfsPermission(d,2)) && (vfsUnlink(fn1)>0)) {
				d.lines[vfsBasename(fn2)]=f1;
				d.touch();
				return 1
			}
			else return -1
		}
		else return d
	}
	else return f1
}

function vfsGetSize(f) {
	var n=0;
	if ((f) && (f.kind=='d')) {
		for (var i in f.lines) n++;
	}
	else if (f) {
		for (var i=0; i<f.lines.length; i++) n+=f.lines[i].length;
	};
	return n
}

function vfsGetMdate(f) {
	var fd=f.mdate;
	return (fd)? fd.getFullYear()+'/'+txtNormalize(fd.getMonth()+1,2)+'/'+txtNormalize(fd.getDate(),2)+' '+txtNormalize(fd.getHours(),2)+':'+txtNormalize(fd.getMinutes(),2)+':'+txtNormalize(fd.getSeconds(),2) : '???';
}

function vfsDirList(d) {
	var list=new Array();
	if ((d) && (d.lines)) {
		list[0]='.';
		list[1]='..';
		for (var i in d.lines) list[list.length]=i;
	};
	list.sort();
	return list
}

function vfsPermission(f,mode) {
	if (f) {
		if (usrVAR.UID==0) return ((mode) && (mode&1) && (f.kind!='d'))? f.mode&0100:1;
		var m=0;
		if (usrVAR.UID==f.owner) m= (f.mode>>6)&7
		else if (usrGroups[f.group]) m= (f.mode>>3)&7
		else m= f.mode&7;
		return m&mode
	}
	else return 0
}

function vfsCheckInPath(fn,fobj) {
	if ((typeof fobj=='object') && (fobj.kind=='d')) {
		while (fn) {
			while (fn.charAt(fn.length-1)=='/') fn=fn.substring(0,fn.length-1);
			var fp=vfsGetFile(fn);
			if ((fp.inode==fobj.inode) && (fobj.inode!=vfsRoot.inode)) return true;
			fn=vfsDirname(fn)
		}
	};
	return false
}

function vfsInit() {
	krnlInodes=100;
	vfsRoot=new VfsFile('d',{});
	vfsRoot.mdate=os_mdate;
	vfsRoot.mode=01777;
	vfsRoot.owner=0;
	vfsRoot.group=0;
	vfsRoot.icnt=2
}

function vfsTreeSetup() {
	var sysDirs=new Array('/sbin', '/dev');
	var wheelDirs=new Array('/bin', '/home', '/usr', '/var', '/usr/bin');
	usrVAR.UID=0;
	usrVAR.GID=0;
	for (var i=0; i<sysDirs.length; i++) {
		var d=vfsCreate(sysDirs[i],'d',0775,os_mdate);
	};
	vfsCreate('/etc','d',01777,os_mdate);
	vfsCreate('/tmp','d',01777,os_mdate);
	vfsCreate('/root','d',0700,os_mdate);
	var f;
	f=vfsCreate('/dev/null','b',0666,os_mdate);
	f=vfsCreate('/dev/js','b',0755,os_mdate);
	f.lines=['JavaScript native code'];
	f=vfsCreate('/dev/console','b',0644,os_mdate);
	f.lines=['1'];
	usrVAR.GID=1;
	for (var i=0; i<wheelDirs.length; i++) {
		var d=vfsCreate(wheelDirs[i],'d',0777,os_mdate);
	}
}

// krnl prcs

function krnlGetEnv(args,fhin,fhout) {
	var env=new KrnlProcess([args]);
	var fi=null;
	var fo=null;
	if ((fhin) && (typeof fhin == 'object')) fi=fhin;
	if ((fhout) && (typeof fhout == 'object')) fo=fhout;
	if (fi) env.stdin=new VfsFileHandle(fi);
	if (fo) env.stdin=new VfsFileHandle(fo);
	return env
}

function krnlFork(env) {
	var child=new KrnlProcess([]);
	child.id=env.id;
	child.stdin=env.stdin;
	child.stdout=env.stdout;
	child.stderr=env.stderr;
	child.cwd=env.cwd;
	env.child=child;
	return child
}

function krnlWordChar(ch) {
	return (((ch>='a') && (ch<='z')) || ((ch>='A') && (ch<='Z')) || ((ch>='0') && (ch<='9')) || (ch=='_'));
}

function krnlGetOpt(s) {
	var opts=new Object();
	opts.length=0;
	if ((s) && (s.charAt(0)=='-')) {
		for (var i=1; i<s.length; i++) {
			opts[s.charAt(i)]=1;
			opts.length++
		}
	};
	return opts
}

function krnlGetOpts(args,ofs) {
	var opts=new Object();
	var pos=1;
	opts.length=0;
	if (ofs==null) ofs=1;
	while ((args.length>ofs) && (args[ofs]!=null)) {
		var s=args[ofs];
		if ((s) && (s.charAt(0)=='-')) {
			opts.length++;
			ofs++;
			for (var i=1; i<s.length; i++) opts[s.charAt(i)]=pos++;
		}
		else break
	};
	return opts
}


function krnlTestOpts(opt,optstr) {
	var legalopts={length:1};
	if (opt.length==0) return 0;
	for (var i=0; i<optstr.length; i++) legalopts[optstr.charAt(i)]=1;
	for (var oi in opt) {
		if (!legalopts[oi]) return -1;
	};
	return 1
}

function krnlCsl2stdin() {
	var iln=krnlTtyBuffer;
	krnlTtyBuffer='';
	return [0,iln]
}

function krnlTTY(env,bincmd) {
	cnslCharMode=false;
	if ((env) && (env.args[0]=='TTY')) {
		// init && start login shell
		this.env=null;
		this.cmdbin='';
		cnslLock=true;
		cnslRawMode=false;
		var shenv;
		var pfg= vfsGetFile('/etc/profile');
		shenv=krnlGetEnv(['shell'],pfg,null);
		shenv.cwd=usrVAR.HOME;
		shenv.loginShell=true;
		cnslClear();
		shellExec(shenv,'shellExec');
	}
	else if (env) {
		this.env=env;
		this.bincmd=bincmd;
		if (env.wantChar) cnslCharMode=true
		else if (env.wantMore) {
			cnslChar(3);
			cnslChar(2);
			cursorOn()
		}
		else {
			cnslPrompt();
			cursorOn()
		};
		cnslLock=false
	}
	else if (this.env) {
		cnslLock=true;
		krnlCurPcs=this.env;
		this.env=null;
		self[this.bincmd](krnlCurPcs)
	}
	else {
		krnlPIDs.length=1;
		krnlLogin(1)
	}
}

function krnlKill(pid) {
	var child=krnlPIDs[pid].child;
	if (child!=null) {
		if (child.pid==pid) {
			//alert('PID recursion: '+pid+' ('+krnlPIDs[pid].args[0]+')');
		}
		else  {
			krnlKill(child.pid);
			krnlPIDs[pid].child=null
		}
	};
	krnlPIDs[pid]=null;
	krnlPIDs.length--
}

function krnlFOut(fh,t,style) {
	if (typeof t != 'object') {
		if (typeof t!='string') t=''+t;
		t=t.split('\n')
	};
	if (fh==null) {
		if (cnslSmartmode) {
			cnslSBInit();
			if (style) {
				for (var i=0; i<t.length; i++) { cnslSmartWrite(t[i]); cnslSBNewLine() }
			}
			else {
				for (var i=0; i<t.length; i++) { cnslSmartType(t[i]); cnslSBNewLine() }
			};
			cnslSBOut()
		}
		else if (style) {
			for (var i=0; i<t.length; i++) { cnslWrite(t[i]); newLine() }
		}
		else {
			for (var i=0; i<t.length; i++) { cnslType(t[i]); newLine() }
		}
	}
	else {
		for (var i=0; i<t.length; i++) fh.putLine(t[i]);
	}
}


// keyboard

var domKeyRef = {
	DOM_VK_LEFT: 28,
	DOM_VK_RIGHT: 29,
	DOM_VK_UP: 30,
	DOM_VK_DOWN: 31,
	DOM_VK_BACK_SPACE: 8,
	DOM_VK_RETURN: 13,
	DOM_VK_ENTER: 13,
	DOM_VK_ESCAPE: 27,
	DOM_VK_DELETE: 8
};

function enableKeyboard() {
	if (document.addEventListener) document.addEventListener("keypress", keyHandler, true)
	else {
		if ((self.Event) && (self.Event.KEYPRESS)) document.captureEvents(Event.KEYPRESS);
		document.onkeypress = keyHandler
	};
	window.document.onkeydown=keyIEFix
}

var isSafari = (navigator.userAgent.indexOf('Safari') >= 0);
var isOpera = (window.opera && navigator.userAgent.indexOf('Opera')>=0)? true:false;
var isChrome = (navigator.userAgent.indexOf('Chrome/')>=0 && navigator.userAgent.indexOf('WebKit')>=0)? true:false;

function keyIEFix() {
	if (window.event) {
		var ch=window.event.keyCode;
		var e=window.event;
		if (isMac) {
			// Mac OS dead keys fix
			var replaceCode=0;
			if (e.altKey && ch == 78) {
				replaceCode=126;
			}
			else if (e.shiftKey && ch == 187) {
				replaceCode=96;
			}
			if (replaceCode) {
				keyHandler({which:replaceCode,jsuix_remapped:true});
				if (e.preventDefault) e.preventDefault();
				if (e.stopPropagation) e.stopPropagation();
				e.cancleBubble=true;
				return false;
			}
		}
		if (e.DOM_VK_UP) {
			for (var i in domKeyRef) {
				if ((e[i]) && (ch == e[i])) {
					keyHandler({which:domKeyRef[i],jsuix_remapped:true});
					if (e.preventDefault) e.preventDefault();
					if (e.stopPropagation) e.stopPropagation();
					e.cancleBubble=true;
					return false;
				}
			};
			e.cancleBubble=false;
			return true;
		}
		else {
			// no DOM support
			if ((ch==8) && (isChrome || (!isSafari && !isOpera))) keyHandler({which:8,jsuix_remapped:true})
			else if (ch==37) keyHandler({which:28,jsuix_remapped:true})
			else if (ch==39) keyHandler({which:29,jsuix_remapped:true})
			else if (ch==38) keyHandler({which:30,jsuix_remapped:true})
			else if (ch==40) keyHandler({which:31,jsuix_remapped:true})
			else if (ch==27) keyHandler({which:27,jsuix_remapped:true})
			else if ((ch>=57373) && (ch<=57376)) {
				if (ch==57373) keyHandler({which:30,jsuix_remapped:true})
				else if (ch==57374) keyHandler({which:31,jsuix_remapped:true})
				else if (ch==57375) keyHandler({which:28,jsuix_remapped:true})
				else if (ch==57376) keyHandler({which:29,jsuix_remapped:true});
			}
			else {
				e.cancleBubble=false;
				return true;
			};
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation();
			e.cancleBubble=true;
			return false;
		}
	}
}

function keyHandler(e) {
	if (cnslLock) return true;
	if (e && e.metaKey) return true;
	if ((window.event) && (window.event.preventDefault)) window.event.preventDefault()
	else if ((e) && (e.preventDefault)) e.preventDefault();
	if ((window.event) && (window.event.stopPropagation)) window.event.stopPropagation()
	else if ((e) && (e.stopPropagation)) e.stopPropagation();
	var ch;
	var ctrlShift=false;
	var remapped=false;
	if (e) {
		ch=e.which;
		ctrlShift=(((e.ctrlKey) && (e.shiftKey)) || (e.modifiers==6));
		if (e.jsuix_remapped) remapped=true;
	}
	else if (window.event) {
		ch=window.event.keyCode;
		ctrlShift=((window.event.ctrlKey) && (window.event.shiftKey));
	}
	else {
		return true
	};
	if ((ch=='') && (remapped==false)) {
		// map specials
		if (e==null) e=window.event;
		if ((e.charCode==0) && (e.keyCode)) {
			if (e.DOM_VK_UP) {
				for (var i in domKeyRef) {
					if ((e[i]) && (e.keyCode == e[i])) {
						ch=domKeyRef[i];
						break
					}

				}
			}
			else {
				// Mozilla alike but no DOM support
				if (e.keyCode==37) ch=28
				else if (e.keyCode==39) ch=29
				else if (e.keyCode==38) ch=30
				else if (e.keyCode==40) ch=31
				else if (e.keyCode==27) ch=27;
			}
		}
	}
	else if (ctrlShift) {
		// remap ctrlshift
		if (ch==52) ch=28
		else if (ch==54) ch=29
		else if (ch==56) ch=30
		else if (ch==50) ch=31
		else if (ch==48) ch=8;
	};
	// key actions
	if (cnslCharMode) {
		cnslInsert=false;
		krnlTtyChar=ch;
		krnlTtyBuffer='';
		if (cnslRawMode) self[krnlCurPcs.bin]()
		else krnlTTY();
		if (ch<=32) {
			if (window.event) window.event.cancleBubble=true;
			return false
		}
		else return true
	}
	else if (ch==28) {
		// left
		cursorLeft();
		if (window.event) window.event.cancleBubble=true;
		return false
	}
	else if (ch==29) {
		// right
		cursorRight();
		if (window.event) window.event.cancleBubble=true;
		return false
	}
	else if (ch==27) {
		// esc/delete
		if (window.event) window.event.cancleBubble=true;
		return false
	}
	else if (ch==8) {
		// backspace
		cnslBackspace();
		if (window.event) window.event.cancleBubble=true;
		return false
	}
	else if (ch==30) {
		// up
		if (!cnslRawMode) {
			cursorOff();
			if (usrHistPtr==usrHIST.length) this.lastLine=cnslGetLine();
			cnslClearLine();
			if ((usrHIST.length) && (usrHistPtr>=0)) {
				if (usrHistPtr>0) usrHistPtr--;
				cnslType(usrHIST[usrHistPtr]);
			}
			else if (this.lastLine) cnslType(this.lastLine);
			cursorOn()
		};
		if (window.event) window.event.cancleBubble=true;
		return false
	}
	else if (ch==31) {
		// down
		if (!cnslRawMode) {
			cursorOff();
			if (usrHistPtr==usrHIST.length) this.lastLine=cnslGetLine();
			cnslClearLine();
			if ((usrHIST.length) && (usrHistPtr<=usrHIST.length)) {
				if (usrHistPtr<usrHIST.length) usrHistPtr++;
				if (usrHistPtr<usrHIST.length-1) cnslType(usrHIST[usrHistPtr])
				else if (this.lastLine) cnslType(this.lastLine);
			}
			else if (this.lastLine) cnslType(this.lastLine);
			cursorOn()
		};
		if (window.event) window.event.cancleBubble=true
		return false
	}
	else if ((ch>=32) && (ch<256)) {
		if (blinkTimer) clearTimeout(blinkTimer);
		if (cnslInsert) {
			cursorOff();
			cnslScrollRight(t_r,t_c)
		};
		cnslChar(ch);
		cursorOn();
		if (ch==32) {
			if (window.event) window.event.cancleBubble=true;
			return false
		}
		else if ((window.opera) && (window.event)) window.event.cancleBubble=true
		else return true
	}
	else if (ch==13) {
		cursorOff();
		if (repeatTimer) clearTimeout(repeatTimer);
		cnslInsert=false;
		this.lastLine='';
		if (cnslRawMode) {
			cnslLock=true;
			self[krnlCurPcs.bin](cnslGetLine());
			return
		};
		krnlTtyBuffer=cnslGetLine();
		krnlTtyChar=0;
		if (krnlTtyBuffer) {
			usrHIST[usrHIST.length]=krnlTtyBuffer
			usrHistPtr=usrHIST.length;
		};
		newLine();
		krnlTTY();
		if (window.event) window.event.cancleBubble=true
		return false
	};
	return true
}

function termClose() {
	cnslLock=true;
	if (blinkTimer) clearTimeout(blinkTimer);
	termHide();
}

function termOpen() {
	makeTerm();
	krnlInit();
}

/// eof
