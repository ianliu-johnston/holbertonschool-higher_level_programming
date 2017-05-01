#!/usr/bin/node

const Rectangle = require('./4-rectangle.js').Rectangle;

module.exports.Square = function (size) {
  this.size = size;
  Rectangle.call(this, size, size);
  return this;
};
