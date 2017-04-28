#!/usr/bin/node

console.log(process.argv.length < 4 ? 0 : process.argv.map(Number).sort(function (a, b) { return a - b; })[process.argv.length - 2]);
