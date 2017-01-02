// JS/UIX v0.44
// (c) mass:werk (N.Landsteiner) 2003
// all rights reserved

// command shell

var shellCookie='#!/bin/sh';

function shellExec(env) {
	krnlCurPcs=env;
	env.id='sh';
	if (env.child) {
		if ((env.child.bin) && (self[env.child.bin])) {
			krnlCurPcs=env.child;
			self[env.child.bin](env.child);
			if (env.child.status=='') {
				shellFhReset(env);
				shellWait(true,env)
			}
			else {
				shellWait(false,env);
				return
			};
			krnlCurPcs=env
		}
		else {
			// forced kill
			env.status=(env.loginShell)? '': 'wait';
			env.child.status='';
			shellFhReset(env);
			shellWait(true,env)
		}
	};
	var thread=true;
	var curLine=(env.curLine)? env.curLine:'';
	env.curLine='';
	if (!env.PLH) env.PLH=null;
	if (!env.PRH) env.PRH=null;
	while ((thread) || (curLine!='')) {
		shellFhPermute(env);
		// get line
		if ((env.wantMore) || (curLine=='')) {
			var linedescriptor;
			if (env.stdin) {
				linedescriptor=env.stdin.readLine()
			}
			else {
				linedescriptor=krnlCsl2stdin();
				thread=false;
			};
			var l=linedescriptor[0];
			if (l==-1) { shellWait(false,env,(!env.loginShell)); return}; //eof
			if (env.wantMore) {
				curLine+=linedescriptor[1];
				env.wantMore=false
			}
			else curLine=linedescriptor[1];
			if (env.stdin) {
				while (curLine.charAt(curLine.length-1)=='\\') {
					curLine=curLine.substring(0,curLine.length-1);
					var nl=env.stdin.readLine();
					if (nl[0]>0) curLine+=nl[1];
				}
			}
			else {
				if (curLine.charAt(curLine.length-1)=='\\') {
					env.curLine=curLine.substring(0,curLine.length-1);
					env.wantMore=true;
					shellWait(false,env,false); return;
				}
			}
		};
		var args=shellParseLine(curLine,1);
		var ctrlchar=args[args.length-2];
		curLine=args[args.length-1];
		args.length-=2;
		// backticks eval
		if (env.preargs) {
			var pal=env.preargs.length;
			for (var i=0; i<args.length; i++) env.preargs[pal+i]=args[i];
			args=env.preargs;
			env.preargs=null
		};
		if (ctrlchar=='`') {
			var cmdstr=shellSubstitute(args[args.length-1]);
			var subfh=new VfsFileHandle(new VfsFile('p',[cmdstr.join('')]));
			args.length--;
			env.preargs=args;
			env.args=['sh'];
			var pipe=new VfsFileHandle(new VfsFile('p',[]));
			env.curLine=curLine;
			shellFhSet(env,pipe);
			env.stdin=subfh;					
			shellFork(env,'shellExec',['sh']);
			if (env.child.status=='') {
				var ret=env.stdout.file.lines.join(' ');
				shellFhReset(env);
				curLine=ret+env.curLine;
				shellWait(true,env);
				continue
			}
			else {
				env.curLine=curLine;
				shellWait(false,env)
				return;
			}
		};
		// clean up args
		while ((args.length>0) && (args[0].length==0)) {
			for (var i=0; i<args.length-2; i++) args[i]=args[i+1];
			args.length--
		};
		if (args.length==0) {
			if ((curLine) || (thread)) continue
			else {shellWait(thread,env); return};
		};
		// substitute aliases
		var aref=new Array();
		while (usrALIAS[args[0]]) {
			if (aref[args[0]]) {
				krnlFOut(env.stderr,'error: circular aliases.');
				shellWait(thread,env); return
			};
			aref[args[0]]=1;
			var a2= shellParseLine(usrALIAS[args[0]],1);
			var cc2=a2[a2.length-2];
			var cl2=a2[a2.length-1];
			if ((cc2) && (cl2)) {
				curLine=cl2+ctrlchar+curLine;
				ctrlchar=cc2
			};
			var l2=a2.length-3;
			if (l2>0) {
				for (var i=args.length-1; i>0; i--) args[i+l2]=args[i];
			};
			for (var i=0; i<=l2; i++) args[i]=a2[i];
			while ((args.length>0) && (args[0].length==0)) {
				for (var i=0; i<args.length-2; i++) args[i]=args[i+1];
				args.length--
			};
			if (args.length==0) {
				if ((curLine) || (thread)) continue
				else {shellWait(thread,env); return};
			}
		};
		// exec
		var pipe=((ctrlchar=='|') || (ctrlchar=='>'))? new VfsFileHandle(new VfsFile('p',[])) : null;
		var cmd=args[0];
		if (cmd.charAt(0)=='#') {
			if (thread) continue
			else {shellWait(thread,env); return};
		}
		else if (cmd=='exit') {
			if ((usrHIST) && (usrHIST.length)) usrHIST.length--; // pop this command
			shellWait(thread,env,true);
			return
		}
		else if ((cmd=='>') || (cmd=='>>')){
			// write redirected stdout
			shellWriteOut(env,args[1],env.PLH,(cmd=='>>'));
			env.PLH=null;
			if (curLine) continue
		}
		else if (cmd.charAt(cmd.length-1)=='/') {
			krnlFOut(env.stderr,'"'+cmd+'" is not a command.');
		}
		else if (shellCMD[cmd]) {
			// shell cmd
			shellFhSet(env,pipe);
			shellCMD[cmd](env,args);
			shellFhReset(env);
			if (curLine) continue
		}
		else {
			var cmdfound=false;
			var cmdpath=(cmd.indexOf('/')>=0)? [env.cwd]:usrVAR.PATH.split(' ');
			for (var pi=0; pi<cmdpath.length; pi++) {
				var cmdf=vfsOpen(vfsGetPath(cmd, cmdpath[pi]),1);
				if ((typeof cmdf=='object') && (cmdf.lines[0]) && ((cmdf.kind=='b') || (cmdf.kind=='f')) && (cmdf.lines[0].indexOf('#!/dev/js/')==0)) {
					// binary cmd
					cmdbin=cmdf.lines[0].substring(10);
					if (self[cmdbin]) {
						cmdfound=true;
						env.curLine=curLine;
						shellFhSet(env,pipe);
						shellFork(env,cmdbin,args);
						if (env.child.status=='') {
							shellFhReset(env);
							shellWait(true,env);
							break
						}
						else {
							env.curLine=curLine;
							shellWait(false,env)
							return;
						}
					}
					else {
						krnlFOut(env.stderr,'error: can\'t execute binary!');
						if (curLine) continue
					}
				}
				else if ((typeof cmdf=='object') && (cmdf.kind=='f')) {
					//if ((cmdf.lines[0]) && (cmdf.lines[0].indexOf(shellCookie)==0)) {
						// exec script
						cmdfound=true;
						env.curLine=curLine;
						shellFhSet(env,pipe);
						env.stdin=new VfsFileHandle(cmdf);				
						shellFork(env,'shellExec',args,1);
						if (env.child.status=='') {
							shellFhReset(env);
							shellWait(true,env);
							break
						}
						else {
							env.curLine=curLine;
							shellWait(false,env)
							return;
						}
					//}
				}
			};
			if (!cmdfound) {
				krnlFOut(env.stderr,'command not found: "'+cmd+'"');
			}
		};
		env.curLine=curLine
	};
	shellWait(thread,env);
}

function shellFork(env,cmdbin,args) {
	var child=krnlFork(env);
	krnlCurPcs=child;
	if (cmdbin == 'shellExec') {
		child.loginShell=false;
		var a=0;
		if (args.length>1) {
			if ((args[0]=='sh') && (child.stdin==null)) {
				var srcf=vfsOpen(vfsGetPath(args[1], env.cwd),4);
				if ((typeof srcf=='object') && (srcf.kind=='f')) {
					child.stdin=new VfsFileHandle(srcf);
					a=1
				}
				else if (srcf<0) {
					krnlFOut(env.stderr,vfsGetPath(args[1], env.cwd)+': permission denied.');
					var cl=new Array();
					for (var i=1; i<args.length; i++) cl[cl.length]=args[i];
					child.stdin=new VfsFileHandle(new VfsFile('p',[cl.join(' ')]))
				}
				else {
					var cl=new Array();
					for (var i=1; i<args.length; i++) cl[cl.length]=args[i];
					child.stdin=new VfsFileHandle(new VfsFile('p',[cl.join(' ')]))
				}
			}
		};
		for (var i=0; i<args.length-a; i++) child.args[i]=args[i+a];
	}
	else {
		for (var i=0; i<args.length; i++) child.args[i]=args[i];
	}
	child.id=args[0];
	self[cmdbin](child);
	if (child.status=='') krnlCurPcs=env;
}

function shellWait(thread,env, forceExit) {
	if (env.child) {
		if (env.child.status=='') {
			krnlCurPcs=env;
			krnlKill(env.child.pid);
			env.child=null;
			env.status='';
			env.wantChar=false;
			env.wantMore=false
		}
		else {
			env.status='wait';
			env.wantChar=env.child.wantChar;
			env.wantMore=env.child.wantMore
		}
	};
	if (forceExit) {
		env.status='';
		env.bin='';
		if (env.loginShell) krnlTTY();
	}
	else if ((thread==false) || (env.status)) {
		if (env.loginShell) {
			env.stdin=null;
			krnlTTY(env,'shellExec')
		}
		else {
			env.status='wait';
			env.bin='shellExec'
		}
	}
}

function shellFhSet(env,pipe) {
	env.backin=env.stdin;
	env.backout=env.stdout;
	if (env.PLH) {
		env.stdin=env.PLH;
		env.PLH=null
	};
	if (pipe) {
		env.stdout=env.PRH=pipe
	}
}

function shellFhPermute(env) {
	if (env.PRH) {
		env.PLH=env.PRH;
		env.PLH.close();
		env.PRH=null
	}
	else {
		env.PLH=env.PRH=null
	}
}

function shellFhReset(env) {
	if ((env.stdin!=env.backin) || (env.stdout!=env.backout)) {
		env.stdin=env.backin;
		env.stdout=env.backout;
		env.backin=env.backout=null
	}
}

function shellParseLine(s,ctrl) {
	var args=new Array();
	var n=0;
	var op='';
	var quote='';
	var esc=false;
	var rest='';
	var ctrlchar='';
	for (var i=0; i<s.length; i++) {
		var ch=s.charAt(i);
		if (ch=='\\') {
			if (quote) {
				op+=ch;
				esc=!esc;
				continue
			};
			if (esc) esc=false
			else {
				esc=true;
				continue
			}
		};
		if (esc) {
			if ((quote) && (ch==quote)) op=op.substring(0,op.length-1);
			op+=ch;
			esc=false
		}
		else if (ch=='`') {
			if (quote=='') {
				if (op) {
					var subargs=shellSubstitute(op);
					for (var si=0;si<subargs.length; si++) args[n++]=subargs[si];
					op='';
				};
				quote=ch
			}
			else if (quote=='`') {
				args[n++]=op;
				ctrlchar='`';
				rest=s.substring(i+1);
				break
			}
			else {
				op+=ch
			}
		}
		else if ((ch=='"') || (ch=='\'')) {
			if ((quote) && (ch!=quote)) {
				op+=ch
			}
			else if ((ch==quote) && (ch=='\'')) {
				args[n++]=op;
				op='';
				quote=''
			}
			else {
				if (op) {
					var subargs=shellSubstitute(op);
					for (var si=0;si<subargs.length; si++) args[n++]=subargs[si];
					op='';
				};
				quote=(ch==quote)? '':ch;
			}
		}
		else if (ch==' ') {
			if (quote) {
				op+=ch
			}
			else if (op!='') {
				var subargs=shellSubstitute(op);
				for (var si=0;si<subargs.length; si++) args[n++]=subargs[si];
				op='';
			}
		}
		else if ((ctrl) && (!quote) && ((ch==';') || (ch=='|') || (ch=='>'))) {
			rest=s.substring(i+1);
			ctrlchar=ch;
			if (ch=='>') {
				var prefix='\\>';
				var count=0;
				while ((rest) && (rest.charAt(0)=='>')) {
					prefix+='\\>';
					count++;
					rest=rest.substring(1)
				};
				rest=prefix+'  '+rest;
				if (count>1) ctrlchr=';';
			};
			break
		}
		else if ((ch=='#') && (!quote)) break
		else op+=ch;
	};
	if (op!='') {
		if (quote=='\'') args[n]=op;
		else if (quote=='`') {
			args[n]=op;
			ctrlchar='`'
		}
		else {
			var subargs=shellSubstitute(op);
			for (var si=0;si<subargs.length; si++) args[n++]=subargs[si];
		}
	};
	if (ctrl) {
		args[n++]=ctrlchar;
		args[n++]=rest
	};
	return args
}

function shellSubstitute(arg) {
	var ofs=arg.indexOf('$');
	var chunks=new Array();
	var toeval=new Array();
	if (ofs>=0) {
		var parsed='';
		while (true) {
			var post='';
			var esc=false;
			if (ofs>0) {
				var pre=arg.substring(0,ofs);
				for (var ci=pre.length-1; ci>=0; ci--) {
					if (pre.charAt(ci)=='\\') esc=!esc
					else break;
				};
				if (esc) pre=pre.substring(0,pre.length-1);
				chunks[chunks.length]=pre;
				toeval[toeval.length]=false
			};
			if (esc) {
				v=arg.substring(ofs);
				var ofs2=v.indexOf('$',1);
				if (ofs2>0) {
					post=v.substring(ofs2);
					v=v.substring(0,ofs2)
				};
				chunks[chunks.length]=v;
				toeval[toeval.length]=false;
			}
			else {
				ofs++;
				if (arg.length==ofs) break;
				v=arg.substring(ofs);
				if (v.charAt(0)=='{') {
					var ofs2=v.indexOf('}');
					if ((ofs2>0) && (v.length>ofs2+1)) post=v.substring(ofs2+1);
					v=v.substring(1,ofs2);
				}
				else {
					var v1='';
					for (var i=0; i<v.length; i++) {
						var ch=v.charAt(i);
						if (krnlWordChar(ch)) v1+=ch
						else {
							post=v.substring(i);
							break
						}
					};
					v=v1
				};
				chunks[chunks.length]=v;
				toeval[toeval.length]=true
			};
			if (post) {
				arg=post;
				ofs=arg.indexOf('$');
				if (ofs<0) {
					chunks[chunks.length]=post;
					toeval[toeval.length]=false;
					break
				}
			}
			else break
		};
		for (var i=0; i<chunks.length; i++) {
			if (toeval[i]) {
				var v=chunks[i];
				if (v=='PID') parsed+=krnlCurPcs.pid
				else if ((v>='0') && (v<='9')) {
					v=parseInt(v);
					if (krnlCurPcs.args[v]) parsed+=krnlCurPcs.args[v];
				}
				else if (v.indexOf('ENV_')==0) {
					v=v.substring(4);
					if (krnlCurPcs[v]) parsed+=(typeof krnlCurPcs[v]=='object')? krnlCurPcs[v].length: krnlCurPcs[venv];
				}
				else if (usrVAR[v]!=null) parsed+=usrVAR[v];
			}
			else parsed+=chunks[i];
		};
		if (parsed) return [parsed]
		else return [''];
	}
	else {
		return [arg]
	}
}

function shellTestName(s) {
	isName=false;
	if (s!='') {
		var ch=s.charAt(0);
		if (((ch>='a') && (ch<='z')) || ((ch>='A') && (ch<='Z'))) {
			isName=true;
			for (var i=0; i<s.length;i++) {
				ch=s.charAt(i);
				if (krnlWordChar(ch)==false) {
					isName=false;
					break
				}
			}
		}
	};
	return isName
}

// redirect to file

function shellWriteOut(env,fn,pipe,append) {
	var pipefile= (pipe)? pipe.file : new VfsFile('p',[]);
	var path=vfsGetPath(fn,env.cwd);
	var f1=vfsOpen(path,2);
	if (f1) {
		if (f1.inode==krnlDevNull) return;
		if (f1<0) {
			krnlFOut(env.stderr,'redirect - permission denied: '+path);
		}
		else if (f1.kind=='d') {
			krnlFOut(env.stderr,'redirect - can\'t write, file is directory: '+path);
		}
		else {
			vfsFileCopy(pipefile,f1,append)
		}
	}
	else {
		var f=vfsCreate(path,'f',0640);
		if (f==0) {
			krnlFOut(env.stderr,'redirect - illegal file path: '+path);
		}
		else if (f<0) {
			krnlFOut(env.stderr,'redirect - permission denied: '+path);
		}
		else {
			vfsFileCopy(pipefile,f)
		}
	}
}

// shell commands

function shellCmdSet(env,args) {
	if (args.length==1) {
		var buf=new Array();
		for (var n in usrVAR) buf[buf.length]=n+'  '+usrVAR[n];
		krnlFOut(env.stdout, buf)
		return
	};
	var keys=new Array();
	var val='';
	var verbous=true;
	var assign=false;
	var a=1;
	var opt=krnlGetOpt(args[1])
	if (opt.length) {
		a++;
		if (opt.s) verbous=false;
	};
	for (var i=a; i<args.length; i++) {
		if (args[i]=='=') {
			assign=true;
			if (keys.length==0) {
				if (verbous) krnlFOut(env.stderr,'usage: '+args[0]+' [<varname> [<varname] [= <value> [<value>]]]\n - no varnames');
				return
			}
		}
		else if (assign) {
			val+= (val!='')? ' '+args[i] : args[i];
		}
		else keys[keys.length]=args[i];
	};
	for (var k=0; k<keys.length; k++) {
		var ks=keys[k];
		if (shellTestName(ks)==false) {
			if (verbous) krnlFOut(env.stderr,'usage: '+args[0]+' [<varname> [<varname] [= <value> [<value>]]]\n - name must be of [A-Za-z][A-Za-z0-9_]*');
		}
		else if ((ks=='PID') || (ks=='VERSION') || (ks=='USER') || (ks=='UID') || (ks=='GID')) {
			if (verbous) krnlFOut(env.stderr,'error: "'+ks+'" is a reserved name!');
		}
		else {
			usrVAR[ks]=val;
			if (verbous) krnlFOut(env.stderr,'var "'+ks+'" set to "'+val+'".')
		}
	}
}

function shellCmdUnset(env,args) {
	var verbous=true;
	var a=1;
	if (args.length>1) {
		var opt=krnlGetOpt(args[1])
		if (opt.length) {
			a++;
			if (opt.s) verbous=false;
		}
	};
	if (args.length<a+1) {
		if (verbous) krnlFOut(env.stderr,'usage: '+args[0]+' <varname> - no varname');
		return
	};
	var k=args[a];
	if (shellTestName(k)==false) {
		if (verbous) krnlFOut(env.stderr,'usage: '+args[0]+' <varname> - name must be in [A-Za-z0-9_]');
		return
	};
	if ((k=='PID') || (k=='PATH') || (k=='USER') || (k=='HOME') || (k=='VERSION') || (k=='HOST') || (k=='UID') || (k=='GID')) {
		if (verbous) krnlFOut(env.stderr,'error: "'+k+'" is a reserved name!');
		return
	}
	else {
		delete(usrVAR[k]);
		if (verbous) krnlFOut(env.stderr,'unset var "'+k+'".');
	}
}

function shellCmdAlias(env,args) {
	if (args.length==1) {
		var buf=new Array();
		for (var n in usrALIAS) buf[buf.length]=n+'  '+usrALIAS[n];
		krnlFOut(env.stdout, buf)
		return
	};
	var verbous=true;
	var a=1;
	var opt=krnlGetOpt(args[1])
	if (opt.length) {
		a++;
		if (opt.s) verbous=false;
	};
	if (args.length<a+2) {
		if (verbous) krnlFOut(env.stderr,'usage: '+args[0]+' <name> <value>');
		return
	};
	var k=args[a];
	if (shellTestName(k)==false) {
		if (verbous) krnlFOut(env.stderr,'usage: '+args[0]+' <name> <value> - name must be in [A-Za-z0-9_] - (use quotes?)');
		return
	};
	var va=new Array();
	for (var i=a+1; i<args.length; i++) va[va.length]=args[i];
	var v=va.join(' ');
	usrALIAS[k]=v;
	if (verbous) krnlFOut(env.stderr,'alias "'+k+'" set to "'+v+'".');
}

function shellCmdUnalias(env,args) {
	var verbous=true;
	var a=1;
	if (args.length>1) {
		var opt=krnlGetOpt(args[1])
		if (opt.length) {
			a++;
			if (opt.s) verbous=false;
		}
	};
	if (args.length<a+1) {
		if (verbous) krnlFOut(env.stderr,'usage: '+args[0]+' <name> - (use quotes?)');
		return
	};
	var k=args[a];
	if (shellTestName(k)==false) {
		if (verbous) krnlFOut(env.stderr,'usage: '+args[0]+' <name> - name must be in [A-Za-z0-9_]');
		return
	};
	delete(usrALIAS[k]);
	if (verbous) krnlFOut(env.stderr,'deleted alias "'+k+'".')
}

function shellCmdCd(env,args) {
	var p=(args[1])? vfsGetPath(args[1],env.cwd): usrVAR.HOME;
	var d=vfsGetDir(p);
	if (d<0) {
		krnlFOut(env.stderr,p+': permission denied.')
	}
	else if (d==0) {
		krnlFOut(env.stderr,p+': no such directory.')
	}
	else if (!vfsPermission(d,1)) {
		krnlFOut(env.stderr,p+': permission denied.')
	}
	else {
		env.cwd=p
	}
}

function shellCmdPwd(env) {
	krnlFOut(env.stdout,env.cwd);
}


// PATH entries for shell commands

var shellCMD=new Object();
shellCMD['set']=shellCmdSet;
shellCMD['unset']=shellCmdUnset;
shellCMD['alias']=shellCmdAlias;
shellCMD['unalias']=shellCmdUnalias;
shellCMD['cd']=shellCmdCd;
shellCMD['pwd']=shellCmdPwd;

/// eof