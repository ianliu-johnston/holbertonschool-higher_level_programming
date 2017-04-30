#!/usr/bin/node
const Rectangle = require('./4-rectangle').Rectangle;

const r1 = new Rectangle(2, 3);
console.log('Normal:');
r1.print();

console.log('Double:');
r1.double();
r1.print();

console.log('Rotate:');
r1.rotate();
r1.print();


//function.bind()
//bind(), filter(), map(), reduce(), 
