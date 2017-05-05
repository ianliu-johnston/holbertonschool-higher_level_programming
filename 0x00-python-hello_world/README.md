# Holberton School - 0x00-python-hello_world
Introduction to python. Scripting between bash and python3. Setting up python and the very basics.

## New commands / functions used:
``python3``, ``pip install pep8``, ``pep8 script.py``, ``import sys``, ``sys.stderr.write()``, ``sys.exit``, ``string[3:-1]``

## Helpful Links
* [The Python Tutorial](https://docs.python.org/3.4/tutorial/index.html)
  * [Whetting your appetite](https://docs.python.org/3.4/tutorial/appetite.html)
  * [Using the Python Interpreter](https://docs.python.org/3.4/tutorial/interpreter.html)
  * [An Informal Introduction to Python](https://docs.python.org/3.4/tutorial/introduction.html)
* [Learn To Program Youtube Playlist](https://www.youtube.com/playlist?list=PLGLfVvz_LVvTn3cK5e6LjhgGiSeVlIRwt)
* [PEP8 - Python stylechecker](https://www.python.org/dev/peps/pep-0008/)
* [Installing PEP8 with PIP](https://pep8.readthedocs.io/en/release-1.7.x/intro.html#installation)
* [Number padding tips](https://pyformat.info/#number_padding)
* [Python Bytecode](https://docs.python.org/3.4/library/dis.html)
* I also created a new alias so I can just type in ``python`` instead of ``python3.4``. This way, I don't have to worry about using the wrong version of it to run scripts. Run this command: ``alias python="/usr/local/bin/python3.4"`` or add that line into your ~/.bash_alias file.

## Description of Files
<h6>0-run</h6>
A shell script that runs a Python script. The name of the script is stored in the environmental variable $PYFILE

<h6>1-run_inline</h6>
A shell script that runs python code. The python code will be saved in the environment variable $PYCODE

<h6>2-print.py</h6>
A python script that prints exactly ``"Programming is like building a multilingual puzzle``

<h6>3-print_number.py</h6>
Complete a source code to print the integer stored in the variable ``number``, followed by ``Battery Street`` followed by a new line

<h6>4-print_float.py</h6>
Complete the source code in order to print the float stored in the variable ``number`` with a precision of 2 digits.

<h6>5-print_string.py</h6>
Complete the source code in order to print 3 times a string stored in the variable ``str`` followed by its first 9 characters.

<h6>6-concat.py</h6>
Complete the source code to print ``Welcome to Holberton School!``. No Loops or conditional statements. Use the variables ``str1`` and ``str2``. Code should be exactly 5 lines long.

<h6>7-edges.py</h6>
Complete the source code.

<h6>8-concat_edges.py</h6>
Complete the source code to print ``object-oriented programming with Python`` followed by a new line.

<h6>9-easter_egg.py</h6>
Write a Python script that prints "The Zen of Python" by Tim Peters, followed by a new line.

<h6>100-write.py</h6>
Write a Python script that prints out exactly: ``and that piece of art is useful - Dora Korpar, 2015-10-19``. Use the function ``write`` from the ``sys`` module. Do not use ``print``, and print it to stderr. Script should exit with status code 1.

<h6>101-compile</h6>
Write a script that compiles a Python script file. The Python file name will be stored in the environment variable ``$PYFILE``
The output file name is ``$PYFILEc`` (ex: ``PYFILE=my_main.py`` => ``my_main.pyc``)

<h6>102-magic_calculation.py</h6>
Write the python function ``def magic_calculation(a, b):`` that does exactly as the following Python bytecode:
```
  3           0 LOAD_CONST               1 (98)
              3 LOAD_FAST                0 (a)
              6 LOAD_FAST                1 (b)
              9 BINARY_POWER
             10 BINARY_ADD
             11 RETURN_VALUE

```
