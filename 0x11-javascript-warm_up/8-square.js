#!/usr/bin/node

let i = 0, j = 0;
const max = Number(process.argv[2]);

if (max) {
  while (i < max) {
      console.log(Array(max + 1).join("X"));
    i++;
  }
} else {
  console.log('Missing size');
}



/*
Write a script that prints a square

The first argument is the size of the square
If the first argument can't be converted to an integer, print "Missing size"
You must use the character X to print the square
You must use console.log(...) to print all output
You are not allowed to use var
You must use a loop (while, for, etc.)
*/
