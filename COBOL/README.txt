LINK https://en.wikipedia.org/wiki/GnuCOBOL


/*Historical*/

000100* HELLO.COB GnuCOBOL example
000200 IDENTIFICATION DIVISION.
000300 PROGRAM-ID. hello.
000400 PROCEDURE DIVISION.
000500     DISPLAY "Hello, world!".
000600     STOP RUN.

/*Compilation*/
$ cobc -x HELLO.COB      or      $ cobc -x HELLO.cbl

/*Execution*/
$ ./HELLO

**************************************************************

/*Modern, free format*/

*> GnuCOBOL Hello World example
identification division.
program-id. hello.
procedure division.
display "Hello, world!" 
end-display.
goback.

/*Compilation*/
$ cobc -x -free hello.cob

/*Execution*/
$ ./hello