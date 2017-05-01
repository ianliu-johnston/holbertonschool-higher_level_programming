#!/usr/bin/node

const request = require('request');

request({ method: 'GET', uri: process.argv[2], json: true }, (err, response, body) => console.log(!err ? 'code: ' + response.statusCode : console.log(err)));
