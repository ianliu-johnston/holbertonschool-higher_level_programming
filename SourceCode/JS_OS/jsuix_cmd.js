// JS/UIX v0.46
// (c) mass:werk (N.Landsteiner) 2003
// all rights reserved

// commands

var usrFDump='';
var usrExWin=null;

function commandHelp(env) {
	env.stdin=new VfsFileHandle(new VfsFile('p',[
	'%+r System Help %-r',
	'JS/UIX is a virtual OS in UN*X-style for JavaScript and web-browsers.',
	'',
	'%+uFor help on specific topics type any of these commands:%-u',
	' ',
	'info                        site information - about %+imass:werk%-i',
	'features                    OS features / system info - about %+i'+os_version+'%-i',
	'man <command>               to display a manual entry for <command>',
	//'-------------------------------------------------------------------------------',
	'',
	'%+uCurrently implemented UN*X-commands (see "man" for implemented options)%-u',
	'',
	' alias      set an alias',
	' apropos    display a short description of a command',
	' cal        display a monthly calendar (non-standard opt. "-w" for weeks-count)',
	' cat        concatenate files',
	' chmod      change file permissions',
	' cd         change current working directory',
	' cp         copy files or directories',
	' date       display date and time (non-standard opt. "-u" for UTC)',
	' echo       write arguments back',
	' halt       halt system, shut down',
	' ls         list directory',
	' logname    display login name',
	' mkdir      make a directory',
	' man        display manual page',
	' more       pager',
	' mv         move/rename files or directories',
	' pager      synonym for more',
	' pg         synonym for more',
	' pr         print (to a browser window)',
	' ps         display list of active processes',
	' pwd        print working directory',
	' reboot     reboot system',
	' rm         remove file(s)',
	' rmdir      remove a directory',
	' set        set a variable',
	' sh         start a new sub-shell',
	' stty       set terminal attributes',
	' su         switch user',
	' touch      set the timestamp of file or create empty file',
	' uname      display system name',
	' unalias    discard an alias',
	' unset      discard a variable',
	' vi         visual editor (simple vi)',
	' view       vi in view mode',
	' wc         word count',
	' which      evaluate command path for command to be executed',
	'',
	'%+uCurrently implemented non-standard commands%-u',
	'',
	' browse     open a new browser window with specified url (or site-homepage)',
	' clear      clear and reset the display',
	' features   display features of the virtual OS and the terminal',
	' fexport    export/backup of home-directory for intersession operability.',
	' fimport    re-import of backuped home-data for intersession operability.',
	' hallo      display a short system-identification',
	' hello      display a short system-identification',
	' help       display this help table',
	' info       display site-information',
	' invaders   the "space invaders" arcade game for JS/UIX',
	' js         javascr'+'ipt debugging',
	' mail       open a mail-client with specified address (default webmaster)',
	' news       displays latest news on system changes',
	' reset      reboot system',
	' splitmode  (on/off) - switch window splitting on|off',
	' time       display system time ("-l" for local, "-u" for UTC)',
	' type       echo with specified type-style (see man page)',
	' web        synonym for "browse"',
	' write      write args with formating (marked up type-styles)',
	'-------------------------------------------------------------------------------',
	'P.S.: Some data for testing can be found in "/var".'
	]));
	env.stdin.close();
	env.args=['more'];
	commandMore(env)
}

function commandNews(env) {
	cnslClear();
	env.args=['news','/etc/news'];
	commandMore(env)
}

function commandClear(env) {
	cnslClear();
}

function commandReset(env) {
	if (env.status=='') {
		cnslType('sure to reboot system [y/n]? ');
		cursorOn();
		env.bin='commandReset';
		env.status='wait';
		env.wantChar=true;
		return
	}
	else if (krnlTtyChar==121) {
		cnslType('y'); newLine(); cnslType('halting system for reboot ...');
		setTimeout('termClose();termOpen()',100)
	}
	else {
		cnslType('n');
		newLine();
	};
	env.status='';
	env.wantChar=false;
	krnlTtyChar=0
}

function commandHalt(env) {
	if (env.status=='') {
		cnslType('sure to halt system [y/n]? ');
		cursorOn();
		env.bin='commandHalt';
		env.status='wait';
		env.wantChar=true;
		return
	}
	else if (krnlTtyChar==121) {
		cnslType('y'); newLine(); cnslType('halting system ...');
		setTimeout('termClose()',100)
	}
	else {
		cnslType('n');
		newLine();
	};
	env.status='';
	env.wantChar=false;
	krnlTtyChar=0
}

function commandHello(env) {
	var now=new Date();
	var t=(self.location.hostname)? ' @ '+self.location.hostname : ' @ localhost';
	t+= ' at '+now.getHours()+':'+txtNormalize(now.getMinutes(),2)+':'+txtNormalize(now.getSeconds(),2) +' local time';
	var s=' '+os_version+t+'\n';
	s+=' by mass:werk - media environments <http://www.masswerk.at>\n';
	s+=' Type "help" for available commands.';
	krnlFOut(env.stdout, s);
}

function commandParse(env) {
	var args=env.args;
	var s='parsed args:';
	if (args.length>1) {
		for (var i=1; i<args.length; i++) s+=' "'+args[i]+'"';
	}
	else {
		s+='none.'
	};
	krnlFOut(env.stdout,s)
}

function commandEcho(env) {
	var args=env.args;
	var s='';
	for (var i=1; i<args.length; i++) {
		s+=args[i];
		if (i+1!=args.length) s+=' ';
	};
	krnlFOut(env.stdout,s);
}

function commandType(env) {
	var args=env.args;
	var s='';
	var style=-1;
	var a=1;
	var opt=krnlGetOpts(args,1);
	if (krnlTestOpts(opt,'npruis')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	if (opt.length) {
		style=0;
		if (opt.n) {
			if (args.length>2) {
				var sn=parseInt(args[2]);
				if (isNaN(sn)==false) {
					style=sn&15;
					a++
				}
			}
		}
		else {
			if (opt.p) style|=0;
			if (opt.r) style|=1;
			if (opt.u) style|=2;
			if (opt.i) style|=4;
			if (opt.s) style|=8;
		}
	};
	a+=opt.length;
	if (style>=0) {
		for (var i=a; i<args.length; i++) {
			s+=args[i];
			if (i+1!=args.length) s+=' ';
		};
		cnslType(s,style);
		newLine()
	}
	else {
		commandEcho(env)
	}
}

function commandWrite(env) {
	var args=env.args;
	var s='';
	for (var i=1; i<args.length; i++) {
		s+=args[i];
		if (i+1!=args.length) s+=' ';
	};
	krnlFOut(env.stdout,s,1);
}

function commandTime(env) {
	var args=env.args;
	var utc=0;
	var opt=krnlGetOpts(args,1);
	if (krnlTestOpts(opt,'ul')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	if (opt.u) utc=1;
	else if (opt.l) utc=0;
	var now=new Date();
	if (utc) {
		var s=now.getUTCHours()+':'+txtNormalize(now.getUTCMinutes(),2)+':'+txtNormalize(now.getUTCSeconds(),2);
		krnlFOut(env.stdout,s+' UTC')
	}
	else {
		var s=now.getHours()+':'+txtNormalize(now.getMinutes(),2)+':'+txtNormalize(now.getSeconds(),2);
		krnlFOut(env.stdout,s)
	}
}

function commandDate(env) {
	var args=env.args;
	var m=new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
	var d=new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
	var now=new Date();
	var utc=false;
	var a=1;
	var opt=krnlGetOpts(args,1);
	if (krnlTestOpts(opt,'ul')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	a+=opt.length;
	if (opt.u) {
		now=new Date(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate(),
			now.getUTCHours(),
			now.getUTCMinutes(),
			now.getUTCSeconds()
		);
		utc=true;
	};
	var s='';
	if ((args.length>a) && (args[a].charAt(0)=='+')) {
		// unix style formats
		var ta=args[a].split('%');
		for (var i=1; i<ta.length;i++) {
			var f=(ta[i].length>0)? ta[i].charAt(0):'';
			if (f=='a') s+=d[now.getDay()]
			else if (f=='D') s+=txtNormalize(now.getMonth()+1,2)+'/'+txtNormalize(now.getDate(),2)+'/'+txtNormalize(now.getFullYear()%100,2)
			else if (f=='T') s+=txtNormalize(now.getHours(),2)+':'+txtNormalize(now.getMinutes(),2)+':'+txtNormalize(now.getSeconds(),2)
			else if (f=='H') s+=txtNormalize(now.getHours(),2)
			else if (f=='M') s+=txtNormalize(now.getMinutes(),2)
			else if (f=='S') s+=txtNormalize(now.getSeconds(),2)
			else if (f=='d') s+=now.getDate()
			else if (f=='h') s+=m[now.getMonth()]
			else if (f=='m') s+=txtNormalize(now.getMonth()+1,2)
			else if (f=='w') s+=now.getDay()
			else if (f=='y') s+=mormalize(now.getFullYear()%100,2)
			else if (f=='t') s+=' '
			else if (f=='r') {
				var h=now.getHours();
				var z;
				if (h>12) {
					h-=12; z=' PM'
				}
				else z=' AM';
				s+=h+':'+txtNormalize(now.getMinutes(),2)+':'+txtNormalize(now.getSeconds(),2)+z;
			}
			else if (f=='j') {
				var y=now.getFullYear();
				var m=now.getMonth();
				var isLeap=(((y%4==0) && (y%100>0)) || (y%400==0))? true: false;
				var mLength=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
				var ds=0;
				for (var k=0; k<m; k++) ds+=((k==1) && (isLeap))? mLength[k]+1: mLength[k];
				ds+=now.getDate();
				s+=txtNormalize(ds,3)
			}
			else if (f=='n') s+='%n';
		}
	}
	else {
		var s=d[now.getDay()]+', '+now.getDate()+' '+m[now.getMonth()]+' '+now.getFullYear();
		s+=' '+now.getHours()+':'+txtNormalize(now.getMinutes(),2)+':'+txtNormalize(now.getSeconds(),2);
		if (utc) s+=' UTC';
	};
	krnlFOut(env.stdout,s)
}

function commandCal(env) {
	var args=env.args;
	var mLength=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var mLabel=new Array('January','February','March','April','May','June','July','August','September','October','November','December');
	var now=new Date();
	var weeks=false;
	var m,y;
	var a=1;
	var opt=krnlGetOpts(args,1);
	if (krnlTestOpts(opt,'w')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	if (opt.w) weeks=true;
	a+=opt.length;
	if (args.length==a) {
		m=now.getMonth();
		y=now.getFullYear()
	}
	else if (args.length<a+3) {
		m=parseInt(args[a],10);
		a++;
		if ((isNaN(m)) || (m<1) || (m>12)) {
			krnlFOut(env.stderr,'usage: '+args[0]+' [-w] [<month_nr>] [<year>] - month_nr must be in 1..12');
			return
		};
		m--;
		if (args.length==a+1) {
			y=parseInt(args[a],10);
			if ((isNaN(y)) || (y<1900) || (y>9999)) {
				krnlFOut(env.stderr,'usage: '+args[0]+' [-w] [<month_nr>] [<year>] - year must be in 1900..9999');
				return
			}
		}
		else {
			y=now.getFullYear()
		}
	}
	else {
		krnlFOut(env.stderr,'usage: '+args[0]+' [-w] [<month_nr>] [<year>] - to many arguments');
		return
	};
	var isLeap=(((y%4==0) && (y%100>0)) || (y%400==0))? true: false;
	var wcnt=0;
	var wos=0;
	var d=new Date(y,m,1,0,0,0);
	var buf=txtCenter(mLabel[m]+' '+y,20)+'\n S  M Tu  W Th  F  S';
	if (weeks) {
		buf+='  week';
		var df=new Date(y,0,1,0,0,0);
		var yds=df.getDay();
		for (var mi=0; mi<m; mi++) yds+= ((mi==1) && (isLeap))? mLength[mi]+1 : mLength[mi];
		wos=yds%7;
		wcnt=Math.floor(yds/7)+1;
	};
	buf+='\n';
	var os=d.getDay();
	var l=mLength[m];
	if ((m==1) && (isLeap)) l++;
	for (var i=0; i<os; i++) buf+='   ';
	for (var i=1; i<=l; i++) {
		var s= (i<10)? ' ': '';
		s+=i;
		if ((i+os)%7==0) {
			buf+=s;
			if (weeks) {
				var ws=(wcnt<10)? ' '+wcnt:wcnt;
				buf+='   '+ws;
				wcnt++
			};
			buf+='\n';
		}
		else buf+=s+' ';
		if ((weeks) && (i==l) && ((i+os)%7>0)) {
			var ii=i+os;
			var ss='';
			while (ii%7>0) {
				ss+='   ';
				ii++
			};
			var ws=(wcnt<10)? ' '+wcnt:wcnt;
			buf+='  '+ss+ws;
		}
	};
	krnlFOut(env.stdout, buf+'\n');
}

function commandMail(env) {
	var args=env.args;
	var to=conf_defaultmail;
	if (args.length==2) to=args[1]
	else if (args.length>2) {
		krnlFOut(env.stderr,'usage: '+args[0]+' [<user@host>] - to many arguments');
		return
	};
	var os1=to.indexOf('@');
	var os2=to.indexOf('.',Math.max(0,os1));
	if ((os1<1) || (os2<0)) {
		krnlFOut(env.stderr,'usage: '+args[0]+' [<user@host>] - illegal address');
		return
	};
	krnlFOut(env.stdout,'opening mail-client for "'+to+'".');
	self.location.href='mailto:'+to
}

function commandBrowse(env) {
	var args=env.args;
	var url=conf_defaulturl;
	var a=1;
	var n=true; // open in new window!
	if (args[1]=='-n') {
		a++;
		n=true
	};
	if (args.length==a+1) {
		url=args[a];
		if (url.charAt(0)=='-') {
			krnlFOut(env.stderr,'usage: '+args[0]+' [-n] [<url>] - illegal option');
			return
		}
	}
	else if (args.length>a) {
		krnlFOut(env.stderr,'usage: '+args[0]+' [-n] [<url>] - to many arguments');
		return
	};
	if ((url.indexOf('http://')!=0) && (url.indexOf('https://')!=0) && (url.indexOf('ftp://')!=0) && (url.indexOf('ftps://')!=0) && (url.indexOf('file:')!=0) && (url.indexOf('mailto:')!=0)) url='http://'+url;
	if (n) {
		krnlFOut(env.stdout,'opening url "'+url+'" in new browser window.');
		var w=window.open(url);
		if (window.focus) w.focus();
	}
	else {
		if (confirm('Sure to open the URL "'+url+'" in the same window?')) {
			krnlFOut(env.stdout,'opening url "'+url+'".');
			self.location.href=url
		}
		else {
			krnlFOut(env.stdout,'cancled by user. use -n to open an address in a new window.')
		}
	}
}

function commandSplitScreen(env) {
	var args=env.args;
	var split=false;
	if (args.length==2) {
		if (args[1]=='on') {
			split=true;
		}
		else if (args[1]!='off') {
			krnlFOut(env.stderr,'usage: '+args[0]+' on|off  - illegal argument');
			return
		}
	}
	else {
		krnlFOut(env.stderr,'usage: '+args[0]+' on|off');
		return
	};
	cnslClear();
	if (split) {
		cnslType('split mode on',1); newLine();
		cnslTypeAt(conf_rows-2,0,'--------------------------------------------------------------------------------');
		cnslTypeAt(conf_rows-1,0,'JS/UIX by mass:werk. type "splitmode off" or "clear" to return to normal mode.');
		cnslMaxLines=conf_rows-2
	}
	else  {
		krnlFOut(env.stdout,'split mode off',1)
	}
}

function commandInfo(env) {
	cnslClear();
	krnlFOut(env.stdout,[
		'%+r Site Information %-r',
		'',
		'  .oooooo..o oooooooooooo   .oooo.       .ooo     .oooo.     .oooo.    ',
		' d8P`    `Y8 `888`     `8 .dP""Y88b    .88`      d8P``Y8b   d8P``Y8b   ',
		' Y88bo.       888               ]8P`  d88`      888    888 888    888  ',
		'  `"Y8888o.   888oooo8        .d8P`  d888P"Ybo. 888    888 888    888  ',
		'      `"Y88b  888    "      .dP`     Y88[   ]88 888    888 888    888  ',
		' oo     .d8P  888         .oP     .o `Y88   88P `88b  d88` `88b  d88`  ',
		' 8""88888P`  o888o        8888888888  `88bod8`   `Y8bd8P`   `Y8bd8P`   ',
		'                                                                       ',
		'                      a hacker meeting in downtown sf                  ',
		'',
		'Type "mail" for email, "web" for website, "help" for available commands.'
		],1);
}

function commandFeatures(env) {
	env.stdin=new VfsFileHandle(new VfsFile('p',[
		'%+r System Features %-r',
		os_greeting,
		' by mass:werk - media environments; (c) N.Landsteiner <http://www.masswerk.at>',
		' ',
		' JS/UIX is a virtual terminal and UN*X-like operating system for web browsers.',
		' It is written completely in JavaScript using DHTML for the display.',
		' The current version is v0.46 (Feb. 2007).',
		' ',
		' ',
		'%+uFeatures%-u:',
		' ',
		'     * virtual machine and operating system with:',
		'     * keyboard input supporting US-ASCII charset',
		'     * multi-line input and output, line-editing, insert mode',
		'     * input modes (getChar, cooked, raw mode)',
		'     * scrolling & cursor movements',
		'     * overlapping type styles (plain, %+rreverse%-r, %+uunderline%-u, %+iitalics%-i, %+sstrike%-s)',
		'     * window splitting (e.g. reserved status line)',
		'     * shell (sh alike) with',
		'       - command parsing and interpretation',
		'         supports quoting with backslash, single- and double-quotes, backticks',
		'       - variables and aliases with interpolation',
		'       - positional parameters',
		'       - command path (configurable commands)',
		'       - simple shell-scripts (e.g. initialization via /etc/profile)',
		'       - command history (cursor up/down)',
		'       - output redirection (>, >>), pipes (|)',
		'     * virtual file-system with permissions, users & groups',
		'     * filehandles, STDIN/STDOUT/STDERR streaming',
		'     * environment- and process-management with fork, subshells, pipes',
		'     * cooperative multitasking',
		'     * man-system',
		'     * vi - visual editor',
		'     * export/backup and import of home-directory for intersession oparibility.',
		'     * web and mail launch (external)',
		'     * compatibility for all major browsers',
		'       (e.g. Netscape 4+, MS IE 4+, DOM-aware browsers as Mozilla.)',
		' ',
		'%+uTo Do%-u:',
		' ',
		'     * shell globbing ',
		'     * some more commands (e.g. grep, egrep ...)',
		'     * some shell features (e.g. input redirection)',
		'     * complex shell scripts (control structures and clauses)',
		'     * flock / semaphores',
		'     * %+icould be:%-i interface for remote tasks via CGI',
		' ',
		'%+uWhat For?%-u',
		' ',
		' First of all, because it\'s possible.',
		' Second this could well be the basis for some fail-safe remote-job-systems',
		'needing a local environment for command parsing, interpretation and/or exe-',
		'cution. Think of \'rlogin\' to a remote host (via a CGI-process) for an example.',
		' ',
		'LEGAL',
		'This system and its applications are built entirely from scratch and subject to',
		'an all black-box-type re-engeering. I state not to have known any line of code',
		'of any UN*X-type system (e.g. AT&T/SCO-UNIX, AIX, HPUIX, SunOS, BSD, Darwin,',
		'Irix, Linux, Minix, GNU, etc) or any of its applications. This implementation:',
		'All rights reserved, (c) 2003, N. Landsteiner, mass:werk - media environments.',
		' '
	]));
	env.stdin.close();
	env.args=['more'];
	commandMore(env)
}

function commandApropos(env) {
	var args=env.args;
	if (args.length==1) {
		krnlFOut(env.stderr,'usage: '+args[0]+' <command> - no argument')
		return
	};
	var cmd=args[1];
	if ((manPages[cmd]) && (manPages[cmd].content) && (manPages[cmd].content.apropos)) {
		krnlFOut(env.stdout,manPages[cmd].content.apropos)
	}
	else {
		krnlFOut(env.stderr,'no entry found for "'+cmd+'".')
	}
}

function commandMan(env) {
	var args=env.args;
	if (args.length==1) {
		krnlFOut(env.stderr,'usage: '+args[0]+' <command> - no argument')
		return
	};
	var cmd=args[1];
	var opt=krnlGetOpts(args,1);
	if (krnlTestOpts(opt,'p')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	if (opt.p) {
		krnlFOut(env.stderr,'opening new window with full list ...');
		manPrintAll()
	}
	else if (manPages[cmd]) {
		var fh=(env.stdin)? env.stdin : new VfsFileHandle(new VfsFile('p',[]));
		//if (env.stdout) fh=env.stdout;
		//else {
		//	fh=new VfsFileHandle(new VfsFile('p',[]));
		//	env.pager=true
		//};
		var mc=manPages[cmd].content;
		krnlFOut(fh,'%+uSynopsis%-u:',1);
		if (mc.synopsis) krnlFOut(fh,mc.synopsis+'\n',1);
		//krnlFOut(fh,'%+uDescription%-u:',1);
		if (mc.description) {
			krnlFOut(fh,mc.description,1);
		};
		if (mc.link) {
			krnlFOut(fh,'=> '+mc.link,1);
			env.stdin=fh;
			env.args=['man',mc.link];
			commandMan(env);
			return
		};
		if (mc.arguments) {
			krnlFOut(fh,'\n%+uArguments%-u:',1);
			var ofs=0;
			for (var i=0; i<mc.arguments.length; i+=2) ofs=Math.max(ofs,mc.arguments[i].length);
			for (var i=0; i<mc.arguments.length; i+=2) {
				var arg=mc.arguments[i];
				var s='    '+arg+'  ';
				for (var k=arg.length; k<ofs; k++) s+=' ';
				var lines=mc.arguments[i+1].split('\n');
				for (var n=0; n<lines.length; n++) {
					if (n>0) {
						for (var m=0; m<ofs+6; m++) s+=' ';
					};
					s+=lines[n];
					if (n<lines.length-1) s+='\n';
				};
				krnlFOut(fh,s,1)
			}
		};
		if (mc.options) {
			krnlFOut(fh,'\n%+uOptions%-u:',1);
			var ofs=0;
			for (var i=0; i<mc.options.length; i+=2) ofs=Math.max(ofs,mc.options[i].length);
			for (var i=0; i<mc.options.length; i+=2) {
				var opt=mc.options[i];
				var s='    '+opt+'  ';
				for (var k=opt.length; k<ofs; k++) s+=' ';
				var lines=mc.options[i+1].split('\n');
				for (var n=0; n<lines.length; n++) {
					if (n>0) {
						for (var m=0; m<ofs+6; m++) s+=' ';
					};
					s+=lines[n];
					if (n<lines.length-1) s+='\n';
				};
				krnlFOut(fh,s,1)
			}
		};
		//if (env.pager) {
			//env.stdout=null;
			fh.close();
			env.stdin=fh;
			env.args=['more'];
			commandMore(env)
		//}
	}
	else if (usrALIAS[cmd]) {
		var s=usrALIAS[cmd];
		var cs='';
		for (var i=0; i<s.length; i++) {
			var ch=s.charAt(i);
			if (krnlWordChar(ch)) cs+=ch
			else break
		}
		krnlFOut(env.stderr,'"'+cmd+'" is an alias to "'+usrALIAS[cmd]+'".\n=> see "man '+cs+'" for more.',1)
	}
	else {
		krnlFOut(env.stderr,'no manual entry found for "'+cmd+'".')
	}
}

function manPrintAll() {
	var cmds=new Array();
	var cmdcols=0;
	for (var n in manPages) {
		cmds[cmds.length]=n;
		cmdcols=Math.max(cmdcols,n.length)
	};
	cmds.sort();
	cmdcols+=2;
	var s='Man Pages for '+os_version+'\n\n\n';
	s+='Contents:\n\n';
	for (var cnr=0; cnr<cmds.length; cnr++) {
		var cmd=cmds[cnr];
		if (cmd=='shell') continue;
		var mc=manPages[cmd].content;
		s+='  '+cmd;
		if (mc.apropos) {
			for (var i=cmd.length; i<=cmdcols; i++) s+=' ';
			s+=mc.apropos
		};
		s+='\n'
	};
	s+='\n'
	for (var cnr=0; cnr<cmds.length; cnr++) {
		var cmd=cmds[cnr];
		var mc=manPages[cmd].content;
		s+='\n\n'+cmd+'\n\n';
		s+='* Synopsis:\n';
		if (mc.synopsis) s+=txtStripStyles(mc.synopsis);
		s+='\n\n';
		//s+='* Description:\n';
		if (mc.description) {
			s+=txtStripStyles(mc.description)+'\n';
		};
		if (mc.link) {
			s+='\n=> see "'+mc.link+'".\n';
			continue
		};
		if (mc.arguments) {
			s+='\n* Arguments:\n';
			var ofs=0;
			for (var i=0; i<mc.arguments.length; i+=2) ofs=Math.max(ofs,mc.arguments[i].length);
			for (var i=0; i<mc.arguments.length; i+=2) {
				var arg=mc.arguments[i];
				var sl='    '+arg+'  ';
				for (var k=arg.length; k<ofs; k++) sl+=' ';
				var lines=mc.arguments[i+1].split('\n');
				for (var n=0; n<lines.length; n++) {
					if (n>0) {
						for (var m=0; m<ofs+6; m++) sl+=' ';
					};
					sl+=txtStripStyles(lines[n])+'\n'
				};
				s+=sl
			}
		};
		if (mc.options) {
			s+='\n* Options:\n';
			var ofs=0;
			for (var i=0; i<mc.options.length; i+=2) ofs=Math.max(ofs,mc.options[i].length);
			for (var i=0; i<mc.options.length; i+=2) {
				var opt=mc.options[i];
				var sl='    '+opt+'  ';
				for (var k=opt.length; k<ofs; k++) sl+=' ';
				var lines=mc.options[i+1].split('\n');
				for (var n=0; n<lines.length; n++) {
					if (n>0) {
						for (var m=0; m<ofs+6; m++) sl+=' ';
					};
					sl+=txtStripStyles(lines[n])+'\n'
				};
				s+=sl
			}
		}
	};
	s+='\n\n(c) mass:werk 2003; <http://www.masswerk.at>';
	var w=window.open();
	w.document.write('<xmp>');
	w.document.write(s);
	w.document.write('<\/xmp>');
	w.document.close();
	if (window.focus) w.focus();
}

function commandLs(env) {
	var dir=new Array();
	var a=1;
	var opt=krnlGetOpts(env.args,1);
	if (opt.length>0) a+=opt.length;
	if (krnlTestOpts(opt,'aCFilL')<0) {
		krnlFOut(env.stderr,'illegal option - use "./<filename>" for files of "-*".');
		return
	};
	var dname=(env.args[a])? vfsGetPath(env.args[a],env.cwd) : env.cwd;
	var dfile=vfsOpen(dname,4);
	if (dfile==0) {
		krnlFOut(env.stderr,dname+': no such file or directory.');
		return
	}
	else if (dfile<0) {
		krnlFOut(env.stderr,dname+': permission denied.');
		return
	}
	else if (dfile.kind!='d') {
		dfile=vfsGetParent(dname);
		dir=[vfsBasename(dname)];
		opt.a=1
	}
	else {
		dir=vfsDirList(dfile)
	};
	var l=0;
	var so='';
	for (var i=0; i<dir.length; i++) {
		var n=dir[i];
		if ((n.charAt(0)=='.') && (opt.a==null)) continue;
		var ff;
		if (n=='.') ff=dfile
		else if (n=='..') {
			ff=vfsGetParent(dname)
			if (ff<=0) continue
		}
		else ff=dfile.lines[n];
		if (opt.l) {
			if (ff.kind=='d') so+='d'
			else if (ff.kind=='l') so+='l'
			else so+='-';
			if (ff.mode) {
				var m=ff.mode;
				var ma=new Array();
				for (var mi=0; mi<4; mi++) {
					ma[mi]=m&7;
					m>>=3
				};
				for (var mi=2; mi>=0; mi--) {
					so+= (ma[mi]&4)? 'r':'-';
					so+= (ma[mi]&2)? 'w':'-';
					if (mi==0) {
						if (ma[3]&1) {
							so+= (ma[mi]&1)? 't':'T';
						}
						else {
							so+= (ma[mi]&1)? 'x':'-';
						}
					}
					else so+= (ma[mi]&1)? 'x':'-';
				}
			}
			else so+='---------';
			so+='  ';
			so+=(ff.icnt)? ff.icnt:'?';
			var fo=(ff.owner!=null)? krnlUIDs[ff.owner] : 'unknown';
			var fg=(ff.group!=null)? krnlGIDs[ff.group] : 'unknown';
			while (fo.length<8) fo+=' ';
			while (fg.length<8) fg+=' ';
			so+='  '+fo+'  '+fg+'  ';
			if (ff.kind=='d') so+='--------  '
			else if (ff.kind=='b') so+='bin/n.a.  '
			else so+=txtFillLeft(vfsGetSize(ff),8)+'  ';
			so+= vfsGetMdate(ff) +'  '+n;
			if (i<dir.length-1) so+='\n';
		}
		else {
			if (opt.F) {
				if (ff.kind=='d') n+='/'
				else if ((ff.kind=='b') || (ff.mode&0111)) n+='*'
				else if (ff.kind=='l') n+='@';
			};
			if (opt.i) n+='    '+ ff.inode;
			if ((opt.L) || (((env.stdout) || (opt.i)) && (!opt.C))) {
				so+=n;
				if (i<dir.length-1) so+='\n';
				continue
			};
			var s='';
			if (l>0) {
				s=' ';
				for (var k=(l+2)%12; k<12; k++) s+=' ';
			};
			l+=n.length+s.length;
			if (l>=conf_cols) {
				so+='\n';
				l=n.length;
				s=''
			};
			so+=s+n
		}
	};
	krnlFOut(env.stdout,so)
}

function commandTouch(env) {
	var files=new Array();
	if (env.stdin) {
		for (var i=0; i<env.stdin.lines.length; i++) files[files.length]=vfsGetPath(env.stdin.lines[i],env.cwd);
	};
	for (var i=1; i<env.args.length; i++) files[files.length]=vfsGetPath(env.args[i],env.cwd);
	for (var n=0; n<files.length; n++) {
		var fn=files[n];
		if (fn=='') continue;
		var f=vfsOpen(fn,2);
		if (f<0) krnlFOut(env.stderr,fn+': permission denied.')
		else if (f==0) {
			f=vfsCreate(fn,'f',0660);
			if (f<0) krnlFOut(env.stderr,fn+': permission denied.')
			else if (f==0) krnlFOut(env.stderr,fn+': no such directory '+vfsDirname(fn));
		}
		else f.touch()
	}
}

function commandPs(env) {
	var buf=new Array();
	buf[buf.length]=' PID   COMMAND';
	buf[buf.length]='---------------';
	for (var i=0; i<krnlPIDs.length; i++) {
		if (krnlPIDs[i]) {
			s=' '+i;
			if (i<10) s+=' ';
			if (i<100) s+=' ';
			if (i<1000) s+=' ';
			s+='  '+krnlPIDs[i].id;
			buf[buf.length]=s
		}
	};
	krnlFOut(env.stdout, buf);
}

function commandWc(env) {
	var l=0;
	var w=0;
	var c=0;
	var fh=null;
	var a=1;
	var opt=krnlGetOpts(env.args,1);
	if (krnlTestOpts(opt,'clw')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	if (opt.length>0) a+=opt.length
	else {
		opt.l=1;
		opt.c=1;
		opt.w=1
	};
	if (env.stdin) fh=env.stdin
	else if (env.args[a]) {
		var fn=vfsGetPath(env.args[a],env.cwd);
		var f=vfsOpen(fn,4);
		if (f<0) {
			krnlFOut(env.stderr,fn+': permission denied.');
			return
		}
		if (f==0) {
			krnlFOut(env.stderr,env.args[a]+': file not found.');
			return
		}
		else if (f) fh=new VfsFileHandle(f);
	};
	if (fh!=null) {
		var ldscrp=fh.readLine();
		while (ldscrp[0]>=0) {
			if (opt.l) l++;
			if (opt.c) c+=ldscrp[1].length+1;
			if (opt.w) {
				var word=false;
				var ln=ldscrp[1];
				for (var i=0; i<ln.length; i++) {
					if (ln.charCodeAt(i)>32) {
						if (!word) {
							word=true;
							w++
						}
					}
					else if (word) {
						word=false
					}
				}
			};
			ldscrp=fh.readLine();
		}
	};
	var s='';
	if ((opt.l) && (opt.c) && (opt.w)) {
		s=txtFillLeft(l,8)+' '+txtFillLeft(w,7)+' '+txtFillLeft(c,7)
	}
	else {
		if (opt.l) {
			if (s) s+=' ';
			s+=l
		};
		if (opt.w) {
			if (s) s+=' ';
			s+=w
		};
		if (opt.c) {
			if (s) s+=' ';
			s+=c
		}
	};
	//if (env.stdin) s+='  Total'
	if (env.args[a]) s+='  '+env.args[a];
	krnlFOut(env.stdout,s)
}

function commandCat(env) {
	var fh=null;
	var a=1;
	var buf=new Array();
	if (env.stdin) {
		fh=env.stdin
	}
	else if (env.args[1]) {
		var f=vfsOpen(vfsGetPath(env.args[1],env.cwd),4);
		if (f<0) {
			krnlFOut(env.stderr,vfsGetPath(env.args[1],env.cwd)+': permission denied.');
			return
		}
		else if (typeof f=='object') fh=new VfsFileHandle(f);
		a++
	};
	while (fh) {
		var ldscrp=fh.readLine();
		while (ldscrp[0]>=0) {
			buf[buf.length]=ldscrp[1];
			ldscrp=fh.readLine();
		};
		fh=null;
		if (env.args[a]) {
			var f=vfsOpen(vfsGetPath(env.args[a],env.cwd),4);
			if (f<0) {
				krnlFOut(env.stderr,vfsGetPath(env.args[a],env.cwd)+': permission denied.');
				return
			}
			else if (typeof f=='object') fh=new VfsFileHandle(f);
			a++
		}
	};
	krnlFOut(env.stdout,buf)
}

function commandPr(env) {
	var fh=null;
	var a=1;
	var lines=new Array();
	if (env.stdin) {
		fh=env.stdin
	}
	else if (env.args[1]) {
		var f=vfsOpen(vfsGetPath(env.args[1],env.cwd),4);
		if (f<0) {
			krnlFOut(env.stderr,vfsGetPath(env.args[1],env.cwd)+': permission denied.');
			return
		}
		else if (typeof f=='object') fh=new VfsFileHandle(f);
		a++
	};
	while (fh) {
		var ldscrp=fh.readLine();
		while (ldscrp[0]>=0) {
			lines[lines.length]=ldscrp[1];
			ldscrp=fh.readLine();
		};
		fh=null;
		if (env.args[a]) {
			var f=vfsOpen(vfsGetPath(env.args[a],env.cwd),4);
			if (f<0) {
				krnlFOut(env.stderr,vfsGetPath(env.args[a],env.cwd)+': permission denied.');
				return
			}
			else if (typeof f=='object') fh=new VfsFileHandle(f);
			a++
		}
	};
	var w=window.open();
	w.document.open();
	w.document.write('<xmp>');
	for (var i=0; i<lines.length; i++) w.document.write(txtStripStyles(lines[i])+'\n');
	w.document.write('<\/xmp>');
	w.document.close();
}

function commandMore(env) {
	if (env.status=='') {
		var fh=null;
		var a=1;
		env.more=new Array();
		if (env.stdin) {
			fh=env.stdin
		}
		else if (env.args[1]) {
			var f=vfsOpen(vfsGetPath(env.args[1],env.cwd),4);
			if (f<0) {
				krnlFOut(env.stderr,vfsGetPath(env.args[1],env.cwd)+': permission denied.');
				return
			}
			else if (typeof f=='object') fh=new VfsFileHandle(f);
			a++
		};
		while (fh) {
			var ldscrp=fh.readLine();
			while (ldscrp[0]>=0) {
				env.more[env.more.length]=ldscrp[1];
				ldscrp=fh.readLine();
			};
			fh=null;
			if (env.args[a]) {
				var f=vfsOpen(vfsGetPath(env.args[a],env.cwd),4);
				if (f<0) {
					krnlFOut(env.stderr,vfsGetPath(env.args[a],env.cwd)+': permission denied.');
					return
				}
				else if (typeof f=='object') fh=new VfsFileHandle(f);
				a++
			}
		};
		env.line=0;
		krnlTtyChar=32
	};
	if (env.stdout) {
		for (var i=0; i<env.more.length; i++) krnlFOut(env.stdout,txtStripStyles(env.more[i]));
	}
	else if (env.line<env.more.length) {
		if (krnlTtyChar==32) {
			var l1=env.line;
			if ((env.line) || (env.more.length-(env.line+t_r)>=cnslMaxLines-2)) cnslClear();
			var a=env.line;
			var b=Math.min(a+cnslMaxLines-1,env.more.length);
			//for (env.line=a; env.line<b; env.line++) krnlFOut(null,env.more[env.line],1);
			var buf=new Array();
			for (env.line=a; env.line<b; env.line++) buf[buf.length]=env.more[env.line];
			krnlFOut(null,buf,1);
			if (env.line<env.more.length) cnslWrite('%+r -- MORE -- %-r (Type: space to continue, \'q\' to quit)',1);
		};
		if ((env.line<env.more.length) && (krnlTtyChar!=113)) {
			env.bin='commandMore';
			env.status='wait';
			env.wantChar=true;
			return
		}
		else if (krnlTtyChar==113) {
			t_c=0;
			term[t_r]=cnslGetRowArrray(conf_cols,0);
			termStyle[t_r]=cnslGetRowArrray(conf_cols,0);
			termDisplay(t_r)
		};
	};
	env.status='';
	env.wantChar=false;
	krnlTtyChar=0
}

function commandCd(env,evaluate) {
	// secundary cd for current subprocess only
	var cwd1=env.cwd;
	shellCmdCd(env,env.args);
	if (evaluate) {
		return vfsGetPath(env.args[1],env.pwd)
	}
	else return null;
}

function commandStty(env) {
	if (env.args.length>1) {
		var opt=env.args[1];
		if (opt.length) {
			var onoff=true;
			if (opt.charAt(0)=='-') {
				onoff=false;
				opt=opt.substring(1);
			};
			if (opt=='blink') cnslBlinkmode=onoff
			else if (opt=='block') cnslBlockmode=onoff
			else if (opt=='smart') cnslSmartmode=onoff
			else if (opt=='rows') {
				if (onoff) {
					var rl=parseInt(env.args[2]);
					if ((isNaN(rl)==false) && (rl<=conf_rows)) {
						cnslClear();
						cnslMaxLines=rl
					}
				}
				else {
					cnslMaxLines=conf_rows;
					cnslClear()
				}
			}
			else if ((opt=='sane') && (onoff)) {
				cnslMaxLines=conf_rows;
				cnslBlinkmode=true;
				cnslBlockmode=true;
				cnslSmartmode=true;
				cnslClear()
			}
			else if (((opt=='a') || (opt=='g')) && (!onoff)) {
				var oa=new Array();
				var buf=new Array();
				oa['blink']=(cnslBlinkmode)? 1:0;
				oa['block']=(cnslBlockmode)? 1:0;
				oa['smart']=(cnslSmartmode)? 1:0;
				oa['rows']=cnslMaxLines;
				var keys=new Array();
				for (var k in oa) keys[keys.length]=k;
				keys.sort();
				if (opt=='a') {
					for (var i=0; i<keys.length; i++) buf[buf.length]=keys[i]+' '+oa[keys[i]];
				}
				else {
					var l=0;
					for (var i=0; i<keys.length; i++) {
						if (keys[i].length>l) l=keys[i].length;
					};
					l+=2;
					for (var i=0; i<keys.length; i++) {
						var s=keys[i];
						for (var b=keys[i].length; b<l; b++) s+=' ';
						buf[buf.length]=s+oa[keys[i]];
					}
				};
				krnlFOut(term.stdout, buf)
			}
			else {
				krnlFOut(env.stderr,'illegal option.')
			}
		}
	}
}


function commandLogname(env) {
	krnlFOut(env.stdout,usrVAR.USER)
}

function commandUname(env) {
	krnlFOut(env.stdout,os_version)
}

function commandWhich(env) {
	var cmd=env.args[1];
	var which='';
	if (cmd) {
		var cmdpath=(cmd.indexOf('/')>=0)? [env.cwd]:usrVAR.PATH.split(' ');
		for (var pi=0; pi<cmdpath.length; pi++) {
			var path=vfsGetPath(cmd, cmdpath[pi]);
			var cmdf=vfsOpen(path,1);
			if ((typeof cmdf=='object') && (cmdf.lines[0]) && ((cmdf.kind=='b') || (cmdf.kind=='f'))) {
				which=path;
				break
			}
		}
	};
	krnlFOut(env.stdout,which)
}

function commandMkdir(env) {
	var dirs=new Array();
	if (env.stdin) {
		ldscrp=env.stdin.readLine();
		while (ldscrp[0]>=0) {
			dirs[dirs.length]=vfsGetPath(ldscrp[1],env.cwd);
			ldscrp=env.stdin.readLine();
		}
	};
	for (var a=1; a<env.args.length; a++) {
		dirs[dirs.length]=vfsGetPath(env.args[a],env.cwd);
	};
	for (var i=0; i<dirs.length; i++) {
		if (dirs[i]!='') {
			var d=vfsCreate(dirs[i],'d',0750);
			if (d==-3) {
				krnlFOut(env.stderr,dirs[i]+': file already exists.')
			}
			else if (d<0) {
				krnlFOut(env.stderr,dirs[i]+': permission denied.')
			}
		}
	}
}

function commandRmdir(env) {
	var dirs=new Array();
	var opt=krnlGetOpts(env.args,1);
	if (krnlTestOpts(opt,'i')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	var verbous=(opt.i)? false:true;
	if (env.stdin) {
		ldscrp=env.stdin.readLine();
		while (ldscrp[0]>=0) {
			dirs[dirs.length]=vfsGetPath(ldscrp[1],env.cwd);
			ldscrp=env.stdin.readLine();
		}
	};
	for (var a=1+opt.length; a<env.args.length; a++) {
		dirs[dirs.length]=vfsGetPath(env.args[a],env.cwd);
	};
	for (var i=0; i<dirs.length; i++) {
		if (dirs[i]!='') {
			var dn=dirs[i];
			var d=vfsOpen(dn);
			if (d<0) {
				if (verbous) krnlFOut(env.stderr,dn+': path permission denied.');
				continue
			}
			else if (d==0) {
				if (verbous) krnlFOut(env.stderr,dn+': directory not found.');
				continue
			}
			else if (d.kind!='d') {
				if (verbous) krnlFOut(env.stderr,dn+': is not a directory.');
				continue
			}
			else if (vfsGetSize(d)) {
				if (verbous) krnlFOut(env.stderr,dn+': directory not empty.');
				continue
			};
			if (vfsCheckInPath(env.cwd,d)) {
				if (verbous) krnlFOut(env.stderr,dn+'can\'t delete directory in current path.');
				continue
			};
			var st=vfsUnlink(dn);
			if (!st) {
				if (verbous) krnlFOut(env.stderr,dn+': permission denied.');
				continue
			}
		}
	}
}

function commandChmod(env) {
	var args=env.args;
	var a=1;
	var rec=false;
	var files=new Array();
	if ((args[1]) && (args[1].charAt(0)=='-')) {
		if (args[1]=='-R') {
			rec=true;
			a++
		}
		else {
			krnlFOut(env.stderr,'usage: '+args[0]+' [-R] <mode> <filelist> -- illegal option.');
			return
		}
	};
	if (args.length<a+2) {
		krnlFOut(env.stderr,'usage: '+args[0]+' [-R] <mode> <filelist>');
		return
	};
	var mstr=args[a];
	for (var i=a+1; i<args.length; i++) {
		var fn=vfsGetPath(args[i],env.cwd);
		var f=vfsGetFile(fn);
		if (f<0) {
			krnlFOut(env.stderr,fn+': no search permission.');
			continue
		}
		else if (f==0) {
			krnlFOut(env.stderr,fn+': file not found.');
			continue
		}
		else if (f.owner!=usrVAR.UID) {
			krnlFOut(env.stderr,fn+': not owner.');
			continue
		}
		else files[files.length]=f;
		if ((f.kind=='d') && (rec)) commandChmodLoop(files, fn);
	}
	var ok=false;
	if (mstr) {
		var m=parseInt(mstr,8);
		if (isNaN(m)==false) {
			for (var i=0; i<files.length; i++) files[i].mode=m;
			ok=true
		}
		else if ((mstr.indexOf('+')>0) || (mstr.indexOf('-')>0)) {
			var who=new Array();
			var add=false;
			var ormask=0;
			var andmask=07777;
			var sm=0;
			var whomask={u:0100,g:010,o:1};
			var modemask={r:4,w:2,x:1,s:0};
			for (var k=0; k<mstr.length; k++) {
				var ch=mstr.charAt(k);
				if ((sm<2) && ((ch=='u') || (ch=='g') || (ch=='o') || (ch=='a'))) {
					sm=1;
					who[who.length]=ch
				}
				else if ((sm==1) && ((ch=='+') || (ch=='-'))) {
					sm=2;
					add=(ch=='+');
				}
				else if ((sm==2) && ((ch=='r') || (ch=='w') || (ch=='x') || (ch=='s'))) {
					for (var w=0; w<who.length; w++) {
						for (var wm in whomask) {
							if ((who[w]=='a') || (who[w]==wm)) {
								var mm=((ch=='s') && ((who[w]=='o') || (who[w]=='a')))? 01000:modemask[ch]*whomask[wm];
								if (add) ormask|=mm
								else andmask&=07777^mm
							}
						}
					};
					if (k==mstr.length-1) ok=true;
				}
			};
			if (ok) {
				for (var i=0; i<files.length; i++) files[i].mode= (files[i].mode&andmask)|ormask;
			}
		}
		else if (mstr.indexOf('=')>0) {
			var who=new Array();
			var who2='';
			var m=0;
			var sm=0;
			var whomask={u:0100,g:010,o:1};
			for (var k=0; k<mstr.length; k++) {
				var ch=mstr.charAt(k);
				if ((sm<2) && ((ch=='u') || (ch=='g') || (ch=='o') || (ch=='a'))) {
					sm=1;
					who[who.length]=ch
				}
				else if ((sm==1) && (ch=='=')) {
					sm=2
				}
				else if ((sm==2) && ((ch=='u') || (ch=='g') || (ch=='o'))) {
					sm=3;
					who2=ch;
					if (k==mstr.length-1) ok=true;
				}
			};
			if (ok) {
				for (var i=0; i<files.length; i++) {
					var f=files[i];
					var m;
					if (who2=='o') m=f.mode&7
					else if (who2=='g') m=(f.mode>>3)&7
					else if (who2=='u') m=(f.mode>>6)&7;
					for (var w=0; w<who.length; w++) {
						for (var wm in whomask) {
							if (who[w]==who2) continue;
							if ((who[w]=='a') || (who[w]==wm)) {
								f.mode= (f.mode & (07777^(7*whomask[wm]))) | whomask[wm]*m;
							}
						}
					}
				}
			}
		};
		if (!ok) {
			krnlFOut(env.stderr,'usage: '+args[0]+' [-R] <mode> <filelist> -- syntax error:');
			krnlFOut(env.stderr,'<mode> must be octal number or {u|g|o|a}(+|-){w|r|x|s} or {u|g|o|a}=(o|u|g).');
			return
		};
	};
	if (!ok) {
		krnlFOut(env.stderr,'usage: '+args[0]+' [-R] <mode> <filelist>');
		return
	}
}

function commandChmodLoop(files, dn) {
	var d=vfsGetFile(dn);
	var flist=[];
	if (typeof d=='object') flist=vfsDirList(f);
	for (var i=0; i<flist.length; i++) {
		if ((flist[i]=='.') || (flist[i]=='.')) continue;
		var fn=vfsGetPath(flist[i],dn);
		var f=vfsGetFile(fn);
		if (f<0) {
			krnlFOut(env.stderr,fn+': no search permission.');
			continue
		}
		else if (f==0) {
			krnlFOut(env.stderr,fn+': file not found.');
			continue
		}
		else if (f.owner!=usrVAR.UID) {
			krnlFOut(env.stderr,fn+': not owner.');
			continue
		}
		else files[files.length]=f;
		if ((f.kind=='d') && (rec)) commandChmodLoop(files, dn);

	}
}

function commandRm(env) {
	var files=new Array();
	var opt=krnlGetOpts(env.args,1);
	if (krnlTestOpts(opt,'ir')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	var verbous=(opt.i)? false:true;
	if (env.stdin) {
		ldscrp=env.stdin.readLine();
		while (ldscrp[0]>=0) {
			if (ldscrp[0]>0) files[files.length]=ldscrp[1];
			ldscrp=env.stdin.readLine();
		}
	};
	if (env.stdin) {
		ldscrp=env.stdin.readLine();
		while (ldscrp[0]>=0) {
			if (ldscrp[0]>0) files[files.length]=ldscrp[1];
			ldscrp=env.stdin.readLine();
		}
	};
	for (var a=1+opt.length; a<env.args.length; a++) {
		if (env.args[a]!='') files[files.length]=env.args[a];
	};
	if (files.length==0) {
		if (verbous) krnlFOut(env.stderr,'Usage: '+env.args[0]+' [-ri] <filename> {<filename>}');
		return
	}
	for (var i=0; i<files.length; i++) {
		var fn=vfsGetPath(files[i],env.cwd);
		while (fn.charAt(fn.length-1)=='/') fn=fn.substring(0,fn.length-1);
		var f= vfsGetFile(fn);
		if (f<=0) {
			if (verbous) krnlFOut(env.stderr,fn+': file not found.');
			return;
		};
		if (f.kind=='d') {
			if (!opt.r) {
				if (verbous) krnlFOut(env.stderr,fn+': can\'t delete a directory. use "rmdir" or "rm -r" in stead.');
				return
			}
			else if (vfsCheckInPath(env.cwd,f)) {
				if (verbous) krnlFOut(env.stderr,fn+': can\'t delete directory in current path.');
				return
			}
			else if (vfsCheckInPath(usrVAR.HOME,f)) {
				if (verbous) krnlFOut(env.stderr,fn+': can\'t delete directory in current home path.');
				return
			}
		};
		var r=vfsUnlink(fn);
		if (r<0) {
			if (verbous) krnlFOut(env.stderr,fn+': permission denied.');
			return
		}
	}
}

function commandCp(env) {
	var files=new Array();
	var f2='';
	var k2='';
	var opt=krnlGetOpts(env.args,1);
	if (krnlTestOpts(opt,'rpi')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	var verbous=(opt.i)? false:true;
	if (env.stdin) {
		ldscrp=env.stdin.readLine();
		while (ldscrp[0]>=0) {
			if (ldscrp[0]>0) files[files.length]=ldscrp[1];
			ldscrp=env.stdin.readLine();
		}
	};
	for (var a=1+opt.length; a<env.args.length; a++) {
		if (env.args[a]!='') files[files.length]=env.args[a];
	};
	if (files.length>=2) {
		f2=vfsGetPath(files[files.length-1],env.cwd);
		files.length--;
		var tgtf= vfsOpen(f2,2);
		if (tgtf<0) {
			if (verbous) krnlFOut(env.stderr,f2+': permission denied.');
			return
		}
		else if (typeof tgtf=='object') {
			if (tgtf.inode==krnlDevNull) return
			else if (tgtf.kind=='d') k2='d';
			else if (files.length>1) {
				if (verbous) {
					krnlFOut(env.stderr,f2+': must be directory - invalid file path.');
					krnlFOut(env.stderr,'Usage: '+env.args[0]+' [-irp] <sourcefile> {<sourcefile>} <targetfile>')
				};
				return
			}
			else k2='f';
		}
		else {
			var dn2=vfsDirname(f2);
			tgtf=vfsOpen(dn2,2);
			if (tgtf<0) {
				if (verbous) krnlFOut(env.stderr,dn2+': permission denied.');
				return
			}
			else if ((typeof tgtf=='object') && (tgtf.kind=='d')) {
				k2='f';
			}
			else {
				if (verbous) krnlFOut(env.stderr,dn2+': no such directory.');
				return
			}
		};
		for (var i=0; i<files.length; i++) commandCpLoop(env,files[i],f2,k2,opt.r,verbous,0,opt.p);
	}
	else {
		if (verbous) krnlFOut(env.stderr,'Usage: '+env.args[0]+' [-irp] <sourcefile> {<sourcefile>} <targetfile>')
	}
}

function commandCpLoop(env,f1,f2,k2,rec,verbous,moveonly,perm) {
	var fn1=vfsGetPath(f1,env.cwd);
	var srcf=vfsOpen(fn1,4);
	if (srcf<0) {
		if (verbous) krnlFOut(env.stderr,fn1+': permission denied.');
		return
	}
	else if (srcf==0) {
		if (verbous) krnlFOut(env.stderr,fn1+': file not found.');
		return
	}
	else {
		k1=(srcf.kind=='d')? 'd':'f';
	};
	var fn=(k2=='d')? f2+'/'+vfsBasename(fn1): f2;
	var devnull=((fn=='/dev/null') || (fn.indexOf('/dev/null/')==0));
	if ((devnull) && (!moveonly)) return;
	var f=vfsOpen(fn,2);
	if (f<0) {
		if (verbous) krnlFOut(env.stderr,fn+': permission denied.');
		return
	};
	if ((typeof f=='object') && (f.kind=='d') && ((moveonly) || (k1='f')) && (vfsGetSize(f)>0)) {
		if (verbous) krnlFOut(env.stderr,fn+': directory not empty.');
		return
	};
	if (moveonly) {
		if (vfsCheckInPath(env.cwd,srcf)) {
			if (verbous) krnlFOut(env.stderr,'can\'t move directory in current path.');
			return
		}
		else if (vfsCheckInPath(usrVAR.HOME,srcf)) {
			if (verbous) krnlFOut(env.stderr,'can\'t move directory in current home path.');
			return
		};
		var r=(devnull)? vfsUnlink(fn1) : vfsMove(fn1,fn);
		if (r<0) {
			if (verbous) {
				if ((devnull) || (r<-1)) krnlFOut(env.stderr,fn1+': permission denied.')
				else krnlFOut(env.stderr,fn+': permission denied.')
			}
		}
		else if (r==0) {
			if (verbous) krnlFOut(env.stderr,f2+':  invalid file path.');
		};
		return
	}
	else {
		var nf;
		var m;
		if (k1=='d') {
			if ((typeof f=='object') && (f.kind=='d') && (k1=='d')) {
				if (!vfsPermission(f,2)) {
					if (verbous) krnlFOut(env.stderr,f2+': permission denied.');
					return
				}
				else nf=f;
			}
			else {
				m=(perm)? srcf.mode:0750;
				nf=vfsCreate(fn,'d',m);
			}
		}
		else {
			m=(perm)? srcf.mode:0640;
			nf=vfsCreate(fn,'f',m);
		};
		if (nf<0) {
			if (verbous) krnlFOut(env.stderr,f2+': permission denied.');
			return
		}
		else if (!nf) {
			if (verbous) krnlFOut(env.stderr,f2+': invalid file path.');
			return
		};
		if (k1=='f') vfsFileCopy(srcf,nf)
		else if (rec) {
			for (var fi in srcf.lines) commandCpLoop(env,f1+'/'+fi,fn,'d',1,verbous,0,perm);
		}
	}
}

function commandMv(env) {
	var files=new Array();
	var f2='';
	var k2='';
	var opt=krnlGetOpts(env.args,1);
	if (krnlTestOpts(opt,'i')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	var verbous=(opt.i)? false:true;
	if (env.stdin) {
		ldscrp=env.stdin.readLine();
		while (ldscrp[0]>=0) {
			if (ldscrp[0]>0) files[files.length]=ldscrp[1];
			ldscrp=env.stdin.readLine();
		}
	};
	for (var a=1+opt.length; a<env.args.length; a++) {
		if (env.args[a]!='') files[files.length]=env.args[a];
	};
	if (files.length>=2) {
		f2=vfsGetPath(files[files.length-1],env.cwd);
		files.length--;
		var tgtf= vfsOpen(f2,2);
		if (tgtf<0) {
			if (verbous) krnlFOut(env.stderr,f2+': permission denied.');
			return
		}
		else if (typeof tgtf=='object') {
			if (tgtf.kind=='d') k2='d';
			else if (files.length>1) {
				if (verbous) {
					krnlFOut(env.stderr,f2+': must be directory - invalid file path.');
					krnlFOut(env.stderr,'Usage: '+env.args[0]+' [-i] <sourcefile> {<sourcefile>} <targetfile>')
				};
				return
			}
			else k2='f';
		}
		else {
			var dn2=vfsDirname(f2);
			tgtf=vfsOpen(dn2,2);
			if (tgtf<0) {
				if (verbous) krnlFOut(env.stderr,dn2+': permission denied.');
				return
			}
			else if ((typeof tgtf=='object') && (tgtf.kind=='d')) {
				k2='f';
			}
			else {
				if (verbous) krnlFOut(env.stderr,dn2+': no such directory.');
				return
			}
		};
		for (var i=0; i<files.length; i++) commandCpLoop(env,files[i],f2,k2,0,verbous,1,0);
	}
	else {
		if (verbous) krnlFOut(env.stderr,'Usage: '+env.args[0]+' [-i] <sourcefile> {<sourcefile>} <targetfile>')
	}
}

function commandSu(env) {
	if (env.status=='wait') {
		if (krnlTtyChar>32) {
			env.passwd+=String.fromCharCode(krnlTtyChar);
		}
		else if (krnlTtyChar==13) {
			cursorOff();
			newLine();
			if (krnlCrypt(env.passwd)==conf_rootpassskey) krnlAddUser(env.user)
			else krnlFOut(env.stderr,'Sorry.');
			env.status='';
			env.wantChar=false;
			krnlTtyChar=0
		};
		return
	};
	var user=env.args[1];
	if (user==null) user='root';
	for (var ofs=user.indexOf(' '); ofs>=0; ofs=user.indexOf(' ')) user=user.substring(0,ofs)+'_'+user.substring(ofs+1);
	var nameok=true;
	var nameok=((user!='') && (((user.charAt(0)>='A') && (user.charAt(0)<='Z')) || ((user.charAt(0)>='a') && (user.charAt(0)<='z'))));
	for (var i=1; i<user.length; i++) {
		if (!krnlWordChar(user.charAt(i))) {
			nameok=false;
			break
		}
	};
	if (user=='root') {
		env.bin='commandSu';
		env.status='wait';
		env.wantChar=true;
		cnslType('password: ');
		env.user='root';
		env.passwd='';
		cursorOn();
		return
	}
	else if ((user.toLowerCase()=='root') || user.toLowerCase()=='exit') {
		krnlFOut(env.stderr, 'Sorry - invalid user-id');
		return
	}
	if (nameok) {
		if (user.length>8) user=user.substring(0,8);
		krnlAddUser(user);
		usrVAR.USER=user;
		usrVAR.HOME='/home/'+user+'/';
		return
	};
	krnlFOut(env.stderr, 'Sorry - invalid user-id');
}

function cmdGetFDump(win) {
	win.document.forms.fdump.content.value=usrFDump;
	usrFDump=''
}

function cmdSetFDump(win) {
	var home=usrVAR.HOME;
	var s=win.document.forms.fdump.content.value;
	s=txtStringReplace('&gt;','>',s);
	s=txtStringReplace('&lt;','<',s);
	s=txtStringReplace('&amp;','&',s);
	var sl=s.split('\n');
	var li=0;
	var f=null;
	var ok=false;
	var files=new Array();
	var dirs=new Array();
	var start;
	for (start=0; start<sl.length; start++) {
		if (sl[li]=='<fdump>') {
			ok=true;
			break
		}
	};
	if (ok) {
		cnslType('found start tag, starting import ...');
		newLine();
		ok=false
	}
	else {
		cnslType('error: import abborted on missing start tag.');
		newLine();
		keyHandler({which:27});
		return
	};
	for (var li=start+1; li<sl.length; li++) {
		var l=sl[li];
		var k=l.charAt(0);
		if (((k=='d') || (k=='f') || (k=='b') || (k=='l')) && (l.charAt(1)==':')) {
			var o1=l.indexOf(' ');
			var fn=l.substring(2,o1);
			var fd=l.substring(o1+1);
			var y=parseInt(fd.substring(0,4),10);
			var m=parseInt(fd.substring(5,7),10);
			var d=parseInt(fd.substring(8,10),10);
			var hh=parseInt(fd.substring(11,13),10);
			var mm=parseInt(fd.substring(14,16),10);
			var ss=parseInt(fd.substring(17,19),10);
			var md=new Date(y,m-1,d,hh,mm,ss);
			var mx=fd.substring(21);
			var mode = (isNaN(parseInt(mx)))? '': parseInt(mx,8)&07777;
			if (k=='d') {
				dirs[dirs.length]=[fn,md,mode];
				f=null
			}
			else f=files[files.length]=[fn,md,[],k,mode];
		}
		else if (k=='>') {
			if (f) f[2][f[2].length]=l.substring(1);
		}
		else if (l.indexOf('</fdump>')==0) {
			ok=true;
			break
		}
		else {
			if ((f) && (f[2].length)) f[2][f[2].length-1]+='\n'+l.substring(1);
		}
	};
	if ((win) && (win.closed==false)) win.close();
	if (ok) {
		cnslType('imported data seems good, found end tag.')
		newLine();
		cnslType('found '+dirs.length+' directories, '+files.length+' files.');
		newLine();
		cnslType('mounting imported data ...');
		newLine();
	}
	else {
		cnslType('error: import abborted on missing end tag.');
		newLine();
		keyHandler({which:27});
		return
	};
	for (var i=0; i<dirs.length; i++) {
		var fn=vfsGetPath(dirs[i][0],home);
		var md=dirs[i][1];
		var mode=dirs[i][2];
		if (mode=='') mode=0750;
		var d=vfsGetFile(fn);
		if (typeof d=='object') {
			if (d.kind=='d') {
				cnslType('- dir  "'+fn+'" already exists, skipped.'); newLine()
			}
			else {
				cnslType('- dir  "'+fn+'" failed, file with same name already exists.'); newLine()
			}
		}
		else {
			d=vfsCreate(fn,'d',mode,md);
			if (typeof d=='object') {
				cnslType('- dir  "'+fn+'" created.'); newLine()
			}
			else {
				cnslType('- dir  "'+fn+'" failed.'); newLine()
			}
		}
	};
	for (var i=0; i<files.length; i++) {
		var fn=vfsGetPath(files[i][0],home);
		var md=files[i][1];
		var lines=files[i][2];
		var kind=files[i][3];
		var mode=files[i][4];
		if (mode=='') mode=0640;
		var f=vfsGetFile(fn);
		if (typeof f=='object') {
			if (f.kind=='d') {
				cnslType('- file "'+fn+'" failed, directory with same name already exists.'); newLine()
			}
			else {
				cnslType('- file "'+fn+'" already exists, skipped.'); newLine()
			}
		}
		else {
			f=vfsCreate(fn,kind,mode,md);
			if (typeof f=='object') {
				f.lines=lines;
				cnslType('- file "'+fn+'" created.'); newLine()
			}
			else {
				cnslType('- file "'+fn+'" failed.'); newLine()
			}
		}
	};
	cnslType('import completed.');
	newLine();
	keyHandler({which:27})
}

function commandHomeExport(env) {
	var d=vfsOpen(usrVAR.HOME,2);
	if (typeof d=='object') {
		usrFDump=cmdDirDump(d,'');
		if (usrFDump=='') {
			krnlFOut(env.stderr,'found no data to export in directory '+usrVAR.HOME);
			return
		};
		usrFDump=txtStringReplace('&','&amp;','<fdump>\n'+usrFDump+'</fdump>');
		usrFDump=txtStringReplace('>','&gt;',usrFDump);
		usrFDump=txtStringReplace('<','&lt;',usrFDump);
		var w=window.open();
		w.opener=self;
		var wd=w.document;
		wd.open();
		wd.write('<html><head><title>home export</title></head>\n<body onload="self.opener.cmdGetFDump(self);document.forms.fdump.content.select()"><p>copy the following lines for later re-import:<p><form name="fdump"><textarea name="content" wrap="virtual" rows="20" cols="83"></textarea><p><input type="button" value="close window" onclick="self.close()"></p></form>\n</body>\n</html>');
		wd.close()
	}
	else if (d==0) {
		krnlFOut(env.stderr,'can\'t export home directory.\n'+usrVAR.HOME+': permission denied.');
	}
	else {
		krnlFOut(env.stderr,'can\'t export home directory.\nno such directory: '+usrVAR.HOME);
	}
}

function commandHomeImport(env) {
	if (env.status=='') {
		cnslType('please insert file-dump in the opening form.'); newLine();
		cnslType('type "c" to abbort ...'); newLine();
		usrExWin=window.open();
		usrExWin.opener=self;
		var wd=usrExWin.document;
		wd.open();
		wd.write('<html><head><title>home import</title></head>\n<body onload="document.forms.fdump.content.select()"><p>insert home-dump and press &quot;import&quot;:<p><form name="fdump"><textarea name="content" wrap="virtual" rows="20" cols="83"></textarea><p><input type="button" value="import data" onclick="self.opener.cmdSetFDump(self)"></p>\n</form>\n</body>\n</html>');
		wd.close();
		env.bin='commandHomeImport';
		env.status='wait';
		env.wantChar=true;
	}
	else if (krnlTtyChar==99) {
		cnslType('import terminated by user.'); newLine();
		if ((usrExWin) && (usrExWin.closed==false)) usrExWin.close();
		env.status='';
		env.wantChar=false;
		krnlTtyChar=0
	}
	else if ((krnlTtyChar==27)) {
		env.status='';
		env.wantChar=false;
		krnlTtyChar=0
	}
	else {
		termImportCompleted=false;
		env.bin='commandHomeImport';
		env.status='wait';
		env.wantChar=true;
	}
}

function cmdDirDump(d,prefix) {
	if (prefix) prefix+='/';
	var s='';
	var files=new Array();
	var dirs=new Array();
	for (var i in d.lines) {
		if (d.lines[i].kind=='f') files[files.length]=i
		else if ((d.lines[i].kind=='d') || (d.lines[i].kind=='b') || (d.lines[i].kind=='l')) dirs[dirs.length]=i;
	};
	files.sort();
	for (var fi=0; fi<files.length; fi++) {
		if (files[fi].charAt(0)=='.') continue;
		var f=d.lines[files[fi]];
		var mstr=', 0'+((f.mode>>9)&7)+((f.mode>>6)&7)+((f.mode>>3)&7)+(f.mode&7);
		s+=d.lines[i].kind+':'+prefix+files[fi]+' '+vfsGetMdate(d)+mstr+'\n';
		for (var l=0; l<f.lines.length; l++) s+='>'+f.lines[l]+'\n';
	}
	dirs.sort();
	for (var di=0; di<dirs.length; di++) {
		var f=d.lines[dirs[di]];
		var mstr=', 0'+((d.mode>>9)&7)+((d.mode>>6)&7)+((d.mode>>3)&7)+(d.mode&7);
		s+='d:'+prefix+dirs[di]+' '+vfsGetMdate(f)+mstr+'\n';
	};
	for (var di=0; di<dirs.length; di++) s+=cmdDirDump(d.lines[dirs[di]],prefix+dirs[di]);
	return s
}

function commandJs(env) {
	var a=1;
	var opt=krnlGetOpts(env.args, 1);
	if (krnlTestOpts(opt,'elts')<0) {
		krnlFOut(env.stderr,'illegal option.');
		return
	};
	a+=opt.length;
	var vn=env.args[a];
	var vstring=vn;
	var vobj=null;
	if ((opt.l) || (opt.t) || (opt.s)) {
		if ((vn!=null) && ((vn.indexOf('.')>=0) || (vn.indexOf('[')>=0))) {
			var va1=vn.split('.');
			var va=new Array();
			var vt=new Array();
			for (var i=0; i<va1.length; i++) {
				if (va1[i]=='') continue;
				if (va1[i].indexOf('[')>=0) {
					var va2=va1[i].split('[');
					for (var k=0; k<va2.length; k++) {
						if (va2[k]=='') continue;
						if ((va2[k].length) && (va2[k].charAt(va2[k].length-1)==']')) va2[k]=va2[k].substring(0,va2[k].length-1);
						va[va.length]=va2[k];
						vt[vt.length]=(k==0)?'.':'['
					}
				}
				else {
					va[va.length]=va1[i];
					vt[vt.length]='.';
				}
			};
			var vobj=self;
			var vi=0;
			var vstring='self';
			while ((vobj!=null) && (vi<va.length)) {
				vstring+=(vt[vi]=='[')? '['+va[vi]+']' : '.'+va[vi];
				vobj=vobj[va[vi++]]
			}
		}
		else vobj=self[vn]
	};
	var ok=false
	if (opt.t) {
		var s=(vobj)? typeof vobj : 'undefined';
		if ((vobj!=null) && (typeof vobj=='object') && (vobj.constructor)) {
			var sc=''+vobj.constructor;
			var ofs1=sc.indexOf(' ');
			var ofs2=sc.indexOf('(');
			if ((ofs1>0) && (ofs2>0)) s+=' '+sc.substring(ofs1+1,ofs2);
		};
		krnlFOut(env.stdout,vstring+': '+s);
		ok=true
	};
	if (opt.l) {
		if (vobj==null) krnlFOut(env.stdout,'undefined')
		else if (typeof vobj=='object') {
			var s='';
			if (vobj.length) {
				for (var i=0; i<vobj.length; i++) {
					if (vobj[i]!=null) {
						if (s!='') s+='\n';
						s+='['+i+']: '+ ((jsuix_hasExceptions)? eval('try{String(vobj[i])} catch(e){"#ERROR ON ACCESSING PROPERTY#"}') : vobj[i]);
					}
				}
			}
			else {
				for (var i in vobj) {
					if (s!='') s+='\n';
					s+= i+': '+ ((jsuix_hasExceptions)? eval('try{String(vobj[i])} catch(e){"#ERROR ON ACCESSING PROPERTY#"}') : vobj[i]);
				}
			};
			krnlFOut(env.stdout,s);
		}
		else krnlFOut(env.stdout,vobj);
		ok=true
	}
	else if (opt.s) {
		if (env.args.length>a+1) {
			var val=''
			for (var ari=a+1; ari<env.args.length; ari++) {
				if (env.args[ari]!='') val+=env.args[ari];
			};
			if (opt.n) {
				eval(vstring+'='+val);
				krnlFOut(env.stderr,'js-var self.'+vstring+' set to "'+val+'" (plain value).')
			}
			else {
				for (var ofs=val.indexOf("'"); val>=0; ofs=val.indexOf("'",ofs+2)) val=val.substring(0,ofs)+"\\'"+val.substring(ofs+1);
				eval(vstring+'="'+val+'"');
				krnlFOut(env.stderr,'js-var self.'+vstring+' set to \''+val+'\' (string value).')
			}
		}
		else {
			krnlFOut(env.stdout,'usage: '+env.args[0]+' -e|l[t]|s|t <expression> -- set: <expression> ::= <varname> <value>');
		};
		ok=true
	}
	else if (opt.e) {
		for (var ari=a+1; ari<env.args.length; ari++) {
			if (env.args[ari]!='') vn+=env.args[ari];
		};
		krnlFOut(env.stdout,'evaluating "'+vn+'" in js ...');
		var result = (jsuix_hasExceptions)? eval('try{eval('+vn+')} catch(e){e}') : eval(vn);
		//var result=eval(vn);
		krnlFOut(env.stdout,"returned: "+result);
		ok=true
	};
	if (!ok) {
			krnlFOut(env.stdout,'usage: '+env.args[0]+' -e|l[t]|s|t <expression>');
	}
}

// commands as files

var cmdFileStack=new Array();

function cmdFileRegistrate(path,kind,file,perm,date) {
	// registrate a file for boot time (owner=root, group=wheel)
	cmdFileStack[cmdFileStack.length]=[path,kind,file,perm,date]
}

function commandInit() {

	var cmdFiles= [
	'/sbin/clear', ['#!/dev/js/commandClear'],
	'/sbin/reset', ['#!/dev/js/commandReset'],
	'/sbin/reboot', ['#!/dev/js/commandReset'],
	'/sbin/halt', ['#!/dev/js/commandHalt'],
	'/sbin/fexport', ['#!/dev/js/commandHomeExport'],
	'/sbin/fimport', ['#!/dev/js/commandHomeImport'],
	'/sbin/js', ['#!/dev/js/commandJs'],
	'/bin/cd', ['#!/dev/js/commandCd','# piped to shell cd','# for current subprocess only'],
	'/bin/cal', ['#!/dev/js/commandCal'],
	'/bin/date', ['#!/dev/js/commandDate'],
	'/bin/features', ['#!/dev/js/commandFeatures'],
	'/bin/hello', ['#!/dev/js/commandHello'],
	'/bin/hallo', ['#!/dev/js/commandHello'],
	'/bin/help', ['#!/dev/js/commandHelp'],
	'/bin/info', ['#!/dev/js/commandInfo'],
	'/bin/ls', ['#!/dev/js/commandLs'],
	'/bin/mail', ['#!/dev/js/commandMail'],
	'/bin/man', ['#!/dev/js/commandMan'],
	'/bin/browse', ['#!/dev/js/commandBrowse'],
	'/bin/ps', ['#!/dev/js/commandPs'],
	'/bin/web', ['#!/dev/js/commandBrowse'],
	'/bin/parse', ['#!/dev/js/commandParse'],
	'/bin/time', ['#!/dev/js/commandTime'],
	'/bin/wc', ['#!/dev/js/commandWc'],
	'/bin/cat', ['#!/dev/js/commandCat'],
	'/bin/echo', ['#!/dev/js/commandEcho'],
	'/bin/type', ['#!/dev/js/commandType'],
	'/bin/write', ['#!/dev/js/commandWrite'],
	'/bin/more', ['#!/dev/js/commandMore'],
	'/bin/pager', ['#!/dev/js/commandMore'],
	'/bin/pg', ['#!/dev/js/commandMore'],
	'/bin/splitmode', ['#!/dev/js/commandSplitScreen'],
	'/bin/stty', ['#!/dev/js/commandStty'],
	'/bin/sh', ['#!/dev/js/shellExec'],
	'/bin/cp', ['#!/dev/js/commandCp'],
	'/bin/mv', ['#!/dev/js/commandMv'],
	'/bin/mkdir', ['#!/dev/js/commandMkdir'],
	'/bin/rmdir', ['#!/dev/js/commandRmdir'],
	'/bin/rm', ['#!/dev/js/commandRm'],
	'/bin/su', ['#!/dev/js/commandSu'],
	'/bin/pr', ['#!/dev/js/commandPr'],
	'/bin/touch', ['#!/dev/js/commandTouch'],
	'/bin/chmod', ['#!/dev/js/commandChmod'],
	'/usr/bin/logname', ['#!/dev/js/commandLogname'],
	'/usr/bin/uname', ['#!/dev/js/commandUname'],
	'/usr/bin/vi', ['#!/dev/js/commandVi'],
	'/usr/bin/view', ['#!/dev/js/commandVi'],
	'/usr/bin/which', ['#!/dev/js/commandWhich'],
	'/usr/bin/apropos', ['#!/dev/js/commandApropos'],
	'/usr/bin/news', ['#!/dev/js/commandNews']
	];
	for (var i=0; i<cmdFiles.length; i+=2) vfsForceFile(cmdFiles[i], 'b', cmdFiles[i+1], 0755, os_mdate);
	for (var i=0; i<cmdFileStack.length; i++) {
		var f=cmdFileStack[i];
		vfsForceFile(f[0], f[1], f[2], f[3], f[4]);
	}
}

function sysvarsInit() {
	// preset vars
	usrVAR['PATH']='/bin/ /sbin/ /usr/bin/ ~/';
	usrVAR['USER']='user';
	usrVAR['VERSION']=os_version;
	usrVAR['HOME']='/home';
	usrVAR['HOST']=(self.location.hostname)? self.location.hostname : 'localhost';
	
	// aliased commands
	usrALIAS['about']= 'features',
	usrALIAS['masswerk']= usrALIAS['mass:werk']='info';
	usrALIAS['quit']= usrALIAS['close']= 'exit';
	usrALIAS['split']= 'splitmode on';
	usrALIAS['unsplit']= 'splitmode off';
}

/// eof
