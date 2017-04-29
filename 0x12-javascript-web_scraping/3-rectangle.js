#!/usr/bin/node

module.exports.Rectangle = function Rectangle (w, h) {
  if (Number(w) > 0 && Number(h) > 0) {
    this.width = w;
    this.height = h;
  }
  this.print = function () {
    for (var i = 0; i < h; i++) {
      console.log(Array(w + 1).join('X'));
    }
  };
  return this;
};
