#!/usr/bin/node

const Rectangle = require('./4-rectangle.js').Rectangle;

function Square (size) {
  Rectangle.call(this, size, size);
  this.size = size;
  return this;
}

module.exports.Square = Square;
