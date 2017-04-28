#!/usr/bin/node

function factorial (count, number) {
  return (count > number || !number ? 1 : count * factorial(count + 1, number));
}

console.log(factorial(1, Number(process.argv[2])));
