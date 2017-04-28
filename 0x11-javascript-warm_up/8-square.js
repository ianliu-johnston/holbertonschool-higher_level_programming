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
