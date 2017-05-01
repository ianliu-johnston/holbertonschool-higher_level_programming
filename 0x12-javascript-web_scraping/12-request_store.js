#!/usr/bin/node

const request = require('request');
const fs = require('fs');

request({ method: 'GET', uri: process.argv[2], json: true }, 'utf-8', (err, response, body) => !err ? fs.appendFile(process.argv[3], body) : console.log(err));
