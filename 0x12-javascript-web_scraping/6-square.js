#!/usr/bin/node

const Square = require('./5-square.js').Square;

Square.prototype.charPrint = function (c) {
  if (c) { console.log(Array(this.size + 1).join(Array(this.size + 1).join(c) + '\n').slice(0, -1)); } else { this.print(); }
};
exports.Square = Square;
