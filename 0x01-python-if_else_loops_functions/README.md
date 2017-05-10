# Holberton School - 0x01-python-if_else_loops_functions
Using loops, conditionals, formatting, and functions

## New commands / functions used:
``random.randint(-10, 10)``, ``if num > 0:``, ``val = expr1 if num > 0 else expr2``, ``for num in range (10):``, ``ord('a')``, ``chr(97)``, ``print(1, end="")``, ``print(0x{:02x}.format(num)``

## Helpful Links
* [The Python Tutorial](https://docs.python.org/3.4/tutorial/index.html)
  * [Control Flow](https://docs.python.org/3.4/tutorial/controlflow.html)
* [Python Range Function](http://pythoncentral.io/pythons-range-function-explained/)
* [Block Indendation](http://www.secnetix.de/olli/Python/block_indentation.hawk)
* [Indentation Error](https://www.youtube.com/watch?v=1QXOd2ZQs-Q)
* [Learn To Program playlist](https://www.youtube.com/playlist?list=PLGLfVvz_LVvTn3cK5e6LjhgGiSeVlIRwt)
* [PEP8](https://www.python.org/dev/peps/pep-0008/)
* [Efficient String Concatenation In Python]( https://waymoot.org/home/python_string/ ) 
* [Looping backwards stackoverflow](http://stackoverflow.com/questions/3476732/how-to-loop-backwards-in-python)

## Description of Files
<h6>0-positive_or_negative.py</h6>
Complete the source code to print whether the random number is positive, negative or zero.

<h6>1-last_digit.py</h6>
Complete the source code to print whether the last digit of the random number is positive, negative or zero.

<h6>2-print_alphabet.py</h6>
prints the alphabet without a new line

<h6>3-print_alphabt.py</h6>
Prints a-z without the letters q and e without a new line

<h6>4-print_hexa.py</h6>
Prints all numbers from 0 to 98 in hex.

<h6>5-print_comb2.py</h6>
Prints all numbers from 0 to 99, separated by ", " and ending with a new line character.

<h6>6-print_comb3.py</h6>
Prints all possible combinations of two digit numbers without any repetition.

<h6>7-islower.py</h6>
Checks to see if a character is lower. Returns True if it is, False if it isn't.

<h6>8-uppercase.py</h6>
Changes all lowercase to uppercase.

<h6>9-print_last_digit.py</h6>
Prints the value of the last digit of the number

<h6>10-add.py</h6>
Adds 2 numbers together

<h6>11-pow.py</h6>
Raises a to the power of b

<h6>12-fizzbuzz.py</h6>
Classic FizzBuzz problem. Print 1 - 100. Multiples of 3, print Fizz, multiples of 5, print Buzz. If the number is both a multiple of 3 and 5, print FizzBuzz

<h6>100-print_tebahpla.py</h6>
Print the alphabet in reverse order, alternating between lower and upper case. zYxWvU...GfEdCbA

<h6>101-remove_char_at.py</h6>
Removes a character from the string at position n.

<h6>102-magic_calculation.py</h6>
Write a function that disassembles to this:

```
  3           0 LOAD_FAST                0 (a)
              3 LOAD_FAST                1 (b)
              6 COMPARE_OP               0 (<)
              9 POP_JUMP_IF_FALSE       16

  4          12 LOAD_FAST                2 (c)
             15 RETURN_VALUE

  5     >>   16 LOAD_FAST                2 (c)
             19 LOAD_FAST                1 (b)
             22 COMPARE_OP               4 (>)
             25 POP_JUMP_IF_FALSE       36

  6          28 LOAD_FAST                0 (a)
             31 LOAD_FAST                1 (b)
             34 BINARY_ADD
             35 RETURN_VALUE

  7     >>   36 LOAD_FAST                0 (a)
             39 LOAD_FAST                1 (b)
             42 BINARY_MULTIPLY
             43 LOAD_FAST                2 (c)
             46 BINARY_SUBTRACT
             47 RETURN_VALUE
```
