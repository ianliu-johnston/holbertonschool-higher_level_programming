#!/usr/bin/node

const fs = require('fs');

fs.readFile(process.argv[2], function (file, err) {
  err ? console.log(err) : console.log(file);
});
