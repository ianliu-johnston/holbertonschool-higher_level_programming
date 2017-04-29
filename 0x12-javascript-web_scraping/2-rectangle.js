#!/usr/bin/node

module.exports.Rectangle = function Rectangle (w, h) {
  if (Number(w) > 0 && Number(h) > 0) {
    this.width = w;
    this.height = h;
  }
  return this;
};
