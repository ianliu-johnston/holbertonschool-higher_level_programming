// JS/UIX trycatch

// try to check, if exceptions (try-catch clauses) are available
// embed this as last script; execution will stop, if eval fails.
// (we don't trust the language="JavaScript1.5" declaration)

var jsuix_hasExceptions=false;

// install error-handler for netscape 4
function jsuix_errhandler(errstr, filename, lineno) { return false; }
onError = jsuix_errhandler;

function jsuix_evalExceptions() {
	jsuix_hasExceptions = eval('try {true} catch(e) {}');
}
setTimeout('jsuix_evalExceptions()',1);

// eof