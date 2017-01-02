// man pages for JS/UIX v0.45
// mass:werk 2003 (2005)

new ManPage('man', {
		synopsis: 'man <command>',
		apropos: 'displays manual pages for a command',
		description: 'displays a manual page for system commands.\nif an entry for the command is found, it will be displayed using the standard\npager.',
		arguments: [
			'<command>','command name.\nfor an alias its value is displayed.'
		],
		options: [
			'-p', 'opens a new browser window with the full list.'
		]
	});

new ManPage('apropos', {
		synopsis: 'apropos <command>',
		apropos: 'displays a short description of a command',
		description: 'displays a short description of a command.',
		arguments: [
			'<command>','command name.'
		]
	});

new ManPage('cal', {
		synopsis: 'cal [-w] [[<month_nr>] [<year>]]',
		apropos: 'displays a monthly calendar',
		description: 'displays a monthly calendar.\ndefaults to current month and year if no arguments specified.',
		arguments: [
			'<month_nr>','number of month (1..12), default current month.',
			'<year>','year (1900..9999), default current year.'
		],
		options: [
			'-w','show week numbers.'
		]
	});

new ManPage('clear', {
		synopsis: 'clear',
		apropos: 'clears and resets the terminal display',
		description: 'clears and resets the terminal display.'
	});

new ManPage('date', {
		synopsis: 'date [-%+ul%-u|u] [+format]',
		apropos: 'displays the date and time with format options',
		description: 'diplays the date and time as local (default) or UTC\nas: weekday, day month year hours:minutes:seconds [UTC]\nthe output can be formated by an optional format-string.',
		arguments: [
			'<format>', 'a string consisting of any of the following characters:',
			'%%a',' week-day abrv., Sun-Sat',
			'%%d',' day, 1-31',
			'%%D',' date as mm/dd/yy',
			'%%h',' month abrv., Jan-Dec',
			'%%H',' hours, 00-23',
			'%%j',' year-day, 001-366',
			'%%m',' month, 01-12',
			'%%M',' minutes, 00-59',
			'%%n',' new line',
			'%%r',' time in AM/PM',
			'%%S',' seconds, 00-59',
			'%%t',' tab (insert space)',
			'%%T',' time as hh:mm:ss',
			'%%w',' week-day, 0-6, Sun=0',
			'%%y',' last two digits of the year, 00-99\n',
			'example:','date +%%D%%t%%T\ngives "11/05/03 16:50:01"'
		],
		options: [
			'-l','local time (default)',
			'-u','UTC time'
		]
	});

new ManPage('time', {
		synopsis: 'time [-%+ul%-u|u]',
		apropos: 'displays the current time',
		description: 'diplays the time as local (default) or UTC\nas: hours:minutes:seconds [UTC]',
		options: [
			'-l','local time (default)',
			'-u','UTC time'
		]
	});

new ManPage('echo', {
		synopsis: 'echo [<args>]',
		apropos: 'writes all arguments back to the terminal',
		description: 'writes the given arguments back to the terminal',
		arguments: ['<args>','any text separated by any amount of space.']
	});

new ManPage('type', {
		synopsis: 'type [-ipru|-n <num>] [<args>]',
		apropos: 'writes all arguments back employing type styles',
		description: 'writes the given arguments back to the terminal in specified type style.',
		arguments: ['<args>','any text separated by any amount of space.'],
		options: [
			'-n <num>', 'number representing the type style as a bit vector;\nfor details see the other options identifying styles\nby the following characters:',
			'-p', 'plain     (0)',
			'-r', 'reverse   (1)',
			'-u', 'underline (2)',
			'-i', 'italics   (4)',
			'-s', 'stroke    (8)\n',
			'-> example:','"type -n 5 <args>" is same as "type -ir <args>".'
		]
	});

new ManPage('exit', {
		synopsis: 'exit',
		apropos: 'exits the current shell or leaves the session',
		description: 'exits the current shell.\nif the current shell is the login-shell, the session is closed.'
	});

new ManPage('help', {
		synopsis: 'help',
		apropos: 'displays a help screen with complete command list',
		description: 'displays a help screen with a short list of available commands.'
	});

new ManPage('mail', {
		synopsis: 'mail [<user@host>]',
		apropos: 'launches a mail client',
		description: 'opens a mail window to given address or the webmaster if none specified.',
		arguments: ['<user@host>','mail address.']
	});

new ManPage('browse', {
		synopsis: 'browse [-n] [<url>]',
		apropos: 'opens a web page in a new browser window',
		description: 'opens a given url in a new browser window.\nif no url was specified, a standard site is called (<'+conf_defaulturl+'>).',
		arguments: ['<url>','url of a website. protocol defaults to http.'],
		options: ['-n','open in a new browser window. (with JS/UIX 0.3x default value!)']
	});

new ManPage('web', {
		synopsis: 'web [-n] [<url>]',
		apropos: 'opens a web page in a new browser window',
		description: 'synonym for "browse".',
		link: 'browse'		
	});

new ManPage('splitmode', {
		synopsis: 'splitmode <mode>',
		apropos: 'switches terminal splitmode (statusline) on/off',
		description: 'displays a statusline to demonstrate screen splitting.\n(splitting will be terminated by the next "clear" command.)',
		arguments: ['<mode>','"on"  switch statusline on\n"off" switch statusline off']	
	});

new ManPage('hello', {
		synopsis: 'hello',
		apropos: 'displays a short system information',
		description: 'displays a short information about this system.'
	});

new ManPage('hallo', {
		synopsis: 'hallo',
		apropos: 'displays a short system information',
		description: 'displays a short information about this system.'
	});

new ManPage('info', {
		synopsis: 'info',
		apropos: 'displays information about the site',
		description: 'displays information about this site.\naliases: "masswerk", "mass:werk".'
	});

new ManPage('features', {
		synopsis: 'features',
		apropos: 'displays the features of this application.',
		description: 'displays the features of this application.'
	});

new ManPage('write', {
	synopsis: 'write <args>',
	apropos: 'writes to the terminal employing type styles as mark up.',
	description: 'writes the arguments back to the terminal using type styles.',
	arguments: [
			'<args>', 'any arguments (treated as strings separated by spaces).\ntype styles can be specified as follows:\n %%+<typestyle>  switch type style on\n %%-<typestyle>  switch type style off\n %%n             new line\n %%%             escaped "%%"\nwhere <typestyle> is marked by one the following characters:\n p  plain (+p discards all active styles, -p is ineffective)\n r  reverse\n u  underline\n i  italics\n s  strike.\ntype styles may overlap.\n',
			'-> example:', 'write "Do not use %%+rREVERSE%%-r for 100%%% of the text."'
		]
	});

new ManPage('set', {
	synopsis: 'set [<varname> {<varname>} [= {<value>}]]',
	apropos: 'sets shell-variables, without arguments a full list is displayed',
	description: 'sets a variable in the command shell.\nvariables can be retrieved by "$<varname>" in any term not in single-quotes.\nsee "man sh" for more. to discard a variable use "unset".\nif called without arguments all set variables and values are listed.\n\nThe system supports currently the following special variables:\n  GID      group-id\n  HOME     home directory\n  HOST     login-host\n  PATH     command path\n  PID      process id of current process environment\n  PS       shell prompt\n  UID      user-id\n  USER     user-name\n  VERSION  os/term-version',
	arguments: [
		'<varname>', 'the name of the variable. names must begin with a letter\nand use only the characters "A"-"Z", "0"-"9" or "_".',
		'<value>', 'the value of the variable. use quotes and escapes ("\\") for\ncomplex expressions.\nif no value is assigned, the variable holds an empty value.'
	]
	});

new ManPage('unset', {
	synopsis: 'unset <varname>',
	apropos: 'discards a shell variable',
	description: 'discards a variable defined by "set".\nreserved variables must not be discarded. (see "man set").',
	arguments: [
		'<varname>', 'the name of the variable. names must begin with a letter\nand use only the characters "A"-"Z", "0"-"9" or "_".'
	]
	});

new ManPage('alias', {
	synopsis: 'alias <name> {<value>}',
	apropos: 'sets an alias for a (complex) command',
	description: 'sets an alias that will be used as a command.\naliases can be discarded using "unset".\nif called without arguments, all set aliases are listed.',
	arguments: [
		'<name>', 'the name of the alias. names must begin with a letter\nand use only the characters "A"-"Z", "0"-"9" or "_".',
		'<value>', 'the value of the alias.'
	]
	});

new ManPage('unalias', {
	synopsis: 'unalias <name>',
	apropos: 'discards an alias defined by "alias"',
	description: 'discards an alias defined by "alias".',
	arguments: [
		'<name>', 'the name of the alias. names must begin with a letter\nand use only the characters "A"-"Z", "0"-"9" or "_".'
	]
	});

new ManPage('more', {
	synopsis: 'more <filename>',
	apropos: 'displays long files in a pager',
	description: 'displays the specified file in a pager. if used in a pipe, any lines in STDIN\nwill preceed the content of any specified file. Any outgoing lines in STDOUT\nwill be stripped off of any type-styles.\n\nfor navigation use\n    <SPACE>  for the next page, or\n    "q"      for quit'
	});

new ManPage('wc', {
	synopsis: 'wc [-clw]',
	apropos: 'word count (words, lines, characters)',
	description: 'word count.\ncounts the characters, words, and lines of a specified file or from STDIN.',
	options: [
		'-c','count characters',
		'-l','count lines',
		'-w','count words'
	]
	});

new ManPage('stty', {
	synopsis: 'stty <option>',
	apropos: 'sets terminal options',
	description: 'set terminal options.',
	options: [
		'-a','list all options',
		'-g','list all options in formated output',
		'[-]blink','[no] cursor blinking',
		'[-]block','[no] block cursor',
		'[-]smart','[no] smart console (minimal scrolling)',
		'[-]rows n','[re]set max. terminal line to n',
		'sane','reset to sane values'
	]
	});

new ManPage('ls', {
	synopsis: 'ls <dirname>',
	apropos: 'lists a directory',
	description: 'lists a directory.\n',
	arguments: [
		'<dirname>', 'ralative or absolute file path.\nif called with option "i" or "l" also the name of a plain file.'
	],
	options: [
		'-C','force output to colums',
		'-F','show file type (appended to filename)\n"/" ... directory\n"*" ... executable\n"@" ... link\n<nothing> ... plain file',
		'-L','force output to one file by line',
		'-a','show hidden \'.\'-files.',
		'-i','show inode-id (file serial number)',
		'-l','long output, format:\n"mode  inodes  user  group  bytes  mdate [YYYY/MM/DD hh.mm:ss]  name"'
	]
	});

new ManPage('cd', {
	synopsis: 'cd [<dirname>]',
	apropos: 'changes the current directory',
	description: 'change directory to given path.\nif called without argument, the current working directory will be set to the\nvalue of $HOME.\n\npath/name-conventions:\n    "/" = file-separator\n    "." = current directory\n    ".." = parent directory.'
	});

new ManPage('pwd', {
	synopsis: 'pwd',
	apropos: 'prints the current working directory',
	description: 'print working directory.\noutputs the path of the current working directory.'
	});

new ManPage('cat', {
	synopsis: 'cat <filelist>',
	apropos: 'concatenates and outputs files',
	description: 'concatenate files\njoins any specified files to a new stream.\nany lines in STDIN will preceed the content of theese files.',
	arguments: [
		'<filelist>','any number of file-paths separated by spaces.'
	]
	});

new ManPage('vi', {
	synopsis: 'vi [<filename>]',
	apropos: 'visual editor (simpler version of standard UN*X vi)',
	description: 'opens a (simple) implementation of the visual editor (vi).\ncurrent beta restrictions: no numeral modifiers, no search expressions.\nas the standard vi this implementation is a modal application.\nuse <esc> to enter movements, ":" to enter the command-line, or one of the\ninsert-, append-, change-, replacement-keys to enter edit mode.\n<esc> brings you always back to movements; leave with ":q!" without changes.\n\n%+uBasic Commands%-u: (+<return>)\n\n   :q[uit]            quit (if no changes made)\n   :q[uit]!           forced quit, ignore changes\n   :w [filename]      write [filename]\n   :w! [filename]     forced write, overwrite existing files\n   :wq[!] [filename]  forced write and quit\n   :x[!] [filename]   like "wq" - write only when changes have been made\n   :ZZ                like "x"\n   :1                 display first line\n   :$                 display last line\n   :N                 display line N\n\n%+uCursor Movements%-u:\n\n   h  left  (or cursor)     k  line up   (or cursor)\n   l  right (or cursor)     j  line down (or cursor)\n\n   0  go to the first character of the current line\n   ^  go to the first non-blank character of the current line\n   $  go to the end of the current line\n   -  go up one line and to the first non-blan character\n   +  go down one line and to the first non-blan character\n   w  one word forward\n   b  one word backward\n   e  forward to end of word\n   z  display current-line on top\n\n%+uEditing Comands%-u:\n\n  a   append after cursor\n  A   append after end of line\n  i   insert before cursor\n  I   insert before first non-blank character of the line\n  o   open a new line below the current line\n  O   open a new line above the current line\n  c[motion]  change text (insert between old and new cursor position)\n             (this command is currently restricted to the same line)\n  cc  change the current line\n  C   change to the end of the current line\n  R   replace text\n\n%+uDeleting, Copy and Paste, Undo%-u:\n\n  x   delete character under (and after) the cursor\n  X   delete character before the cursor\n  dd  delete current line and put it in the copy buffer\n  D   delete to end of line\n  J   join lines (delete new line at end of the current line)\n\n  Copy & Paste (currently restricted to lines only):\n\n  yy  yank current line (put to copy buffer)\n  p   put (insert) copy buffer to end line after current line\n  P   put (insert) copy buffer above current line\n\n  u  undo last change\n  U  redo last undo\n\nThis implementation accepts pipes as valid input. If called as "view"\nvi is opened in read only mode.',
	arguments: [
		'<filename>','a file to be opened.'
	]
	});

new ManPage('view', {
		synopsis: 'view [<filename>]',
		apropos: 'vi (visual editor) in view mode (read only)',
		description: 'synonym for "vi" in view-mode (read only mode).\nfiles must be saved with new name or changes will be lost.',
		link: 'vi'		
	});

new ManPage('ps', {
	synopsis: 'ps',
	apropos: 'displays current processes',
	description: 'displays a list of active processes with PID (Process-ID) and name.'
	});

new ManPage('pager', {
		synopsis: 'pager <filename>',
		apropos: 'pager (synonym for "more")',
		description: 'synonym for "more".',
		link: 'more'		
	});

new ManPage('pg', {
		synopsis: 'pager <filename>',
		apropos: 'pager (synonym for "more")',
		description: 'synonym for "more".',
		link: 'more'		
	});

new ManPage('uname', {
		synopsis: 'uname',
		apropos: 'displays the system identification',
		description: 'displays the system identification'
	});

new ManPage('logname', {
		synopsis: 'logname',
		apropos: 'displays the current user name',
		description: 'displays the current user name'
	});

new ManPage('halt', {
		synopsis: 'halt',
		apropos: 'halts / shuts down the system',
		description: 'halt / shut down the system'
	});

new ManPage('reboot', {
		synopsis: 'reboot',
		apropos: 'halts and reboots the system',
		description: 'halt and reboot the system'
	});

new ManPage('cp', {
		synopsis: 'cp [-ipr] <sourcefile> {<sourcefile>} <target>',
		apropos: 'copies files from source to target',
		description: 'copy files from source- to target-file.',
		arguments:[
			'<sourcefile>', 'file(s) or directories to be copied\nif called with multiple source-files the target must be\na directory',
			'<target>', 'the file name of the new file or the name of a directory.'
		],
		options: [
			'-i', 'ignore error warnings',
			'-p', 'copy file permissions',
			'-r', 'recursive - include nested files'
		]
	});

new ManPage('mv', {
		synopsis: 'mv [-i] <filename> {<filename>} <target>',
		apropos: 'moves (renames) files from source to target',
		description: 'move (rename) files from source to target.',
		arguments:[
			'<filename>', 'file(s) or directories to be moved\nif called with multiple files the target must be a directory',
			'<target>', 'the file name of the new file or the name of a directory.'
		],
		options: [
			'-i', 'ignore error warnings'
		]
	});

new ManPage('rm', {
		synopsis: 'rm [-ir] <filename> {<filename>}',
		apropos: 'removes files',
		description: 'remove (discard) files.\nuse "rmdir" or "rm -r" for directories.',
		arguments:[
			'<filename>', 'file(s) to be removed',
		],
		options: [
			'-i', 'ignore error warnings',
			'-r', 'recursive - discard directories and included files'
		]
	});

new ManPage('rmdir', {
		synopsis: 'rmdir [-i] <dirname> {<dirname>}',
		apropos: 'removes /empty) directories',
		description: 'remove (discard) directories.\ndirectories must be empty! use "rm -r" for populated directories.',
		arguments:[
			'<dirname>', 'directory/ies to be removed',
		],
		options: [
			'-i', 'ignore error warnings'
		]
	});

new ManPage('mkdir', {
		synopsis: 'mkdir <dirname> {<dirname>}',
		apropos: 'creates a directory',
		description: 'make one or more new directory/ies',
		arguments:[
			'<dirname>', 'directory/ies to be inited',
		]
	});

new ManPage('which', {
		synopsis: 'which <command>',
		apropos: 'evaluates which command will be executed',
		description: 'evaluates the command path for the given command.\nif the command is found it is displayed with full path-name.',
		arguments:[
			'<command>', 'name of the command to be found.',
		]
	});

new ManPage('su', {
		synopsis: 'su <username>',
		apropos: 'switches user',
		description: 'switch the user.',
		arguments:[
			'<username>', 'user, name must consist of the characters [A-Za-z0-9_]\nonly the first 8 characters are recognized (rest ignored).',
		]
	});

new ManPage('touch', {
		synopsis: 'touch <filenamename> {<filenamename>}',
		apropos: 'sets the timestamp of a file or creates empty file',
		description: 'set the file last modified date (mdate) to current time.\nif the file does\'nt exist an empty file be created.',
		arguments:[
			'<filenamename>', 'name of the file to be modified or created.',
		]
	});

new ManPage('pr', {
		synopsis: 'pr <filelist>',
		apropos: 'prints a file to a browser window',
		description: 'print files (to a new browser window) - ready for copy&paste.',
		arguments:[
			'<filelist>', 'list of files to be printed.\nany content of a lefthand pipe will preceed the content of\nthese files.',
		]
	});

new ManPage('fexport', {
		synopsis: 'fexport',
		apropos: 'exports home-directory for copy and later re-use',
		description: 'file-export and backup.\nexports the files and directories residing in the home-directory (as set in\n$HOME) to a browser form for later re-use. copy this data and keep it on your\nlocal machine for later import. (hidden files won\'t be exported.)\nyou can mount exported files and directories with "fimport".'
	});

new ManPage('fimport', {
		synopsis: 'fimport',
		apropos: 'imports preveously exported file-data to the file-system',
		description: 'imports/mounts exported files and directories to the current home-directory.\nif files or directories with the same name exist, these will have precedence\nover any files on the import-list. timestamps will be set according to import-\ndata. this may back-date directories with newer content.\nsee "fexport" for exporting data.'
	});

new ManPage('shell', {
		synopsis: 'JS/UIX-shell',
		apropos: 'the system shell (command interpreter)',
		description: 'see "sh" for more.',
		link: 'sh'		
	});

new ManPage('sh', {
	synopsis: 'shell, commands, aliases, and variables.',
		apropos: 'starts a new system shell (command interpreter)',
	description: 'A simple implementation of sh. As command opens a subshell.\nCurrently the following features are supported:\nquotings, escapes, variables, aliases, pipes, subshells, simple scripts.\n\nQuoting levels:\n   double-quotes  string with variable interpolation\n   single-quotes  literal string without interpolation\n   backticks (`)  will be expanded to the output processed by a subshell called\n                  with this string as its arguments.\n\nCommands may be separated by ";".\nThe pipe-character "|" will stream the output of the left side to the STDIN-\nstream of the command on its right side.\nThe output redirector ">" writes the output of the command to a file specified\non its right side. ">>" appends the output to an existing file if any.\n\nOrder of Interpolation:\nFirst all control-characters ("`", "|", ";", ">", ">>") will be traced, then\nany terms in backticks will be evaluated in a new subshell and the return\nvalues will be inserted and parsed as arguments.\nAfterwards all variables of the current arguments will be expanded. If the\nfirst argument is an alias, the alias will be expanded, its value parsed and\ncopied in front the first remaining argument.\nIn case a backslash ("\\") is found at the end of a line, the line is\nconcatenated with the following one to a single line.\n\nOrder of Execution:\nIf the now first argument is a shell-command (set, unset, alias, unalias, cd)\nit will be executed in the same shell.\nElse, if an executable file with the name of the command is found in any\ndirectory specified in the PATH-variable, this command will be executed in a\nnew sub-process spawned as child of the current shell. If the first argument\ncontains a slash it will be interpretated as relative path-name of a binary\nor an executable shell-script to be processed in a new sub-shell.\nFinally, if the first-argument is not a valid file-name, an error message will\nbe put to STDERR.\n\nPermissions, Modes:\nIn order to be executable a script or command must either be set to execute\nprivileges for the effective user or group or - in the case of a script called\nin the form "sh <filename>" - with sufficient read permissions.\nPermissions can be set using "chmod".\n(Since the shell is the only script-language present, the *magic cookie*\n"#!/bin/sh" may be absent. Permissions take precedence.)\n\nVariable Interpolation:\nVariables will be expanded in any double-quoted or unquoted term.\nUse $<varname> or ${<varname>} to retrieve the value of any defined variable.\nvariables can be hidden from the shell using single-quotes or escapes with\nbackslash ("\\").\n\nPositional Parameters:\nIn shell-scripts the term $<number> - where <number> is in the range 0-9 -\nexpands to positional paramters. $0 will expand to the command or script name\nwhile the variable $1-$9 will give the value of the first argument and so on.\n\nCurrently the system employs a number of special variables:\n  GID      group-id\n  HOME     home directory\n  HOST     login-host\n  PATH     command path\n  PID      process id of current process environment\n  PS       shell prompt\n  UID      user-id\n  USER     user-name (log-name)\n  VERSION  os/term-version\n\nSpecial Files, Command History:\nThere are two special files to the shell:\nThe first is "etc/profile" which is executed by the login-shell on start up\nfor initialization.\nThe second one is "~/.history" where the command history is stored. (You can\naccess the command history using cursor up/down in the command line.)',
	arguments: [
		'<filename>', 'a script to be opened in a subshell',
		'<args>', 'currently, if the first argument is not a valid filename,\nthe arguments will be interpreted as arguments to be executed\nby a new subshell.'
		]
	});

new ManPage('js', {
		synopsis: 'js -l[t]|t <varname>\njs -s[n] <varname> <value>\njs -e <expression>',
		apropos: 'jav'+'as'+'cript evaluation (no user command, experts only; read man!)',
		description: 'jav'+'as'+'cript evaluation (no user command, experts only!).\nlists or sets javascript objects and object properties, evaluates expressions.\nCAUTION: an error in an eval-string will cause an jav'+'as'+'cript-error bringing\ndown the JS/UIX-system! setting a variable may override and harm the system.',
		options: [
			'-l[t]', 'list an object or property',
			'-s[n]', 'set an object\'s value or object\'s property\'s value\n"-sn" for numeric (plain) value (default: string)',
			'-t', 'report object\'s type or object\'s property\'s type',
			'-e', 'eval expression (use single quotes to hide specials from shell)'
		],
		arguments: [
			'<varname>','name of a variable, object or property\nmay be in form of "varname", "varname[index]",\n"varname.prop[index]", "varname[index][index]" and so on.',
			'<value>', 'a numeric or string value for set (option -s)',
			'<expression>','expression to be evaled (option -e)'
		]
	});

new ManPage('chmod', {
		synopsis: 'chmod [-R] <mode> <filelist>\nwhere <mode> is octal number or {u|g|o|a}(+|-){w|r|x|s} or {u|g|o|a}=(o|u|g)',
		apropos: 'changes a files\'s permissions.',
		description: 'change a files\'s permissions for read, write or execute.',
		options: [
			'-R', 'recursive (include nested files and directories).'
		],
		arguments: [
			'<filelist>','file(s) to be set (you must be the file\'s owner).',
			'<mode>', 'either an octal number representing a bit-vector,\nwhere position "x" stands for:\n  00x00 ... user (owner of the file)\n  000x0 ... group\n  0000x ... others\n  0x000 ... sticky-bit\n\nand "x" is a 3-bit value (0-7),\nwhere a set or unset bit represents permissions for:\n  4 ... read\n  2 ... write\n  1 ... execute\n\nor in the form of {u|g|o|a}(+|-){w|r|x|s},\nwhere the first part represents the "who"-part as:\n  u ... user\n  g ... group\n  o ... other\n  a ... all\n\nto be either set (+) or unset (-) to the third part as:\n  w ... write\n  r ... read\n  x ... execute/search\n  s ... sticky-bit\n\nor in the form of {u|g|o|a}=(o|u|g),\nwhere the first part represents the "who"-part as above\nto be set to the value of the third part.\n\n(the current version does not support setUID or setGID.\nthese bits will be ignored.)'
		]
	});

new ManPage('news', {
		synopsis: 'news',
		apropos: 'displays system-news and information on recent changes.',
		description: 'displays system-news and information on recent changes. (displays /etc/news)'
	});

new ManPage('invaders', {
		synopsis: 'invaders',
		apropos: 'starts the well known arcade game.',
		description: 'starts the well kown arcade game: %+ispace invaders%-i for JS/UIX.\nplease note that there is only one life and only one shot at a time.\n\nusage: use cursor <LEFT> and cursor <RIGHT> to move, press <SPACE> to fire.\n(alternatively you may use the vi-movements "h"=left and "l"=right.)\npress "p" for pause, "q" or <ESC> to quit.'
	});

// oef