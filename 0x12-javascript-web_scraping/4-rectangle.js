#!/usr/bin/node

module.exports.Rectangle = function Rectangle (w, h) {
  if (Number(w) > 0 && Number(h) > 0) {
    this.width = w;
    this.height = h;
  }
  this.print = function () {
    console.log(Array(this.size + 1).join(Array(this.size + 1).join('X') + '\n').slice(0, -1));
  };
  this.double = function () {
    this.width = this.width * 2;
    this.height = this.height * 2;
  };
  this.rotate = function () {
    const tmp = this.width;
    this.width = this.height;
    this.height = tmp;
//    return(Rectangle(this.height, this.width));
//    ^---This returns a copy of the rectangle without mutating the original
  };
  return this;
};
