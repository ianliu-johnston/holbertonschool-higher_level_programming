#!/usr/bin/node

function factorial (number) {
  return (number === 0 ? 1 : number * factorial(number - 1));
}

console.log(factorial(process.argv[2]));
