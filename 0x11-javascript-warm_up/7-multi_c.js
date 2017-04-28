#!/usr/bin/node

let i = 0;
const max = Number(process.argv[2]);

if (max) {
  while (i < max) {
    console.log('C is fun');
    i++;
  }
} else {
  console.log('Missing number of occurrences');
}
