#!/usr/bin/node

if (process.argv.length < 4) {
  console.log(0);
} else {
  const list = process.argv.map(Number).sort(function (a, b) { return a - b; });
  console.log(list[list.length - 2]);
}
