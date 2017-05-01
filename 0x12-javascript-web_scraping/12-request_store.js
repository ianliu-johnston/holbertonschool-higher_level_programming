#!/usr/bin/node

const request = require('request');
const fs = require('fs');

request({ method: 'GET', uri: process.argv[2], json: true }, 'utf-8', function (err, response, body) {
  if (err) throw err;
  fs.appendFile(process.argv[3], body, 'utf8', error => error ? console.log(error) : '');
});
