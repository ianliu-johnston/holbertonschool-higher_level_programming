#!/usr/bin/node

const fs = require('fs');

if (process.argv[2]) {
  fs.readFile(process.argv[2], 'utf-8', function (file, err) {
    err ? console.log(err) : console.log(file);
  });
}
