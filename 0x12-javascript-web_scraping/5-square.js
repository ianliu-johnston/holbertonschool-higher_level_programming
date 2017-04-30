#!/usr/bin/node

Rectangle = require('./4-rectangle.js').Rectangle;

module.exports.Square = function (size) {
  Rectangle.call(this, size, size);
  return this;
};
