#!/usr/bin/node

const request = require('request');
const url = 'http://swapi.co/api/films/' + process.argv[2];

request.get(url, function (data, error) {
  console.log(JSON.parse(data));
});
