#!/usr/bin/node

const fs = require('fs');

const file = process.argv[2];
const string = process.argv[3];

fs.appendFile(file, string, 'utf-8', err => err ? console.log(err) : '');
