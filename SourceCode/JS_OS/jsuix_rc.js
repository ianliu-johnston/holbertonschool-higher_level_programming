// JS/UIX .rc file

function jsuixRC() {

vfsForceFile('/etc/profile', 'f', [
'#!/bin/sh',
'alias -s split splitmode on',
'alias -s unsplit splitmode off',
'set -s PATH = \'/bin /sbin /usr/bin ~\'',
'set -s PS = \'[${USER}@${HOST}:${PID}]\'',
'alias -s ll "ls -l"',
'stty -blink',
'write "                           %+r     Terminal ready.     %-r"',
'echo " $VERSION - The JavaScript virtual OS and terminal application for the web."',
'echo " Type \\"info\\" for site information. Type \\"help\\" for available commands."',
'echo " ------------------------------------------------------------------------------"',
'cat /etc/motd',
], 0755);

vfsForceFile('/etc/motd', 'f', [
'',
'-------------------------------------------------------------------------------',
'                               Message of the Day',
'',
'Welcome to JS/UIX OS, a  Unix-like  system  written completely using JavaScript',
'Feel free to experiment  with  the  filesystem,  create  shells and edit files.',
'',
'There are several  hacking  challenges  available  here  where you will need to',
'reverse,  crack,  and  otherwise  hack  various  components of  the OS in order',
'to  solve  puzzles.  Challenges  are posted in the \'/var/\'  directory.  Enjoy!',
'-------------------------------------------------------------------------------',
'',
], 0664);



vfsForceFile('/var/challenge000.txt', 'f', [
'-------------------------------------------------------------------------------',
'                                  Challenge #1',
'-------------------------------------------------------------------------------',
'',
'You first challenge will be to obtain the root password for this terminal. ',
'Hint #1: Where is the root password usually stored on *nix systems?',
'Hint #2: What is the algorithm used to store encrypted root password?',
'',
'Submission: Type \'mail\' to submit results.',
'',
'Good luck!',
'-------------------------------------------------------------------------------'
], 0664);

}


// must be included as last function for integrety test at start up
function jsuixRX() {
	return true
}

// eof
