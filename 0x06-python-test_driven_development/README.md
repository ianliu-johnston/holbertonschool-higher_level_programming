# Holberton School - 0x06-python-test_driven_development
Introduction to writing tests for python programs 

## New commands / functions used:
* ``import doctest``
* ``python3 -c 'print(__import__("my_module").__doc__)'`` -- Checks to see if the module has documentation.
* ``python3 -c 'print(__import__("my_module").my_function.__doc__)'`` -- Checks to see if the function in the module has documentation.
* ``python3 -m doctest -v ./tests/<module_name>.txt``

## Helpful Links
* [Python Docs: doctest](https://docs.python.org/3.4/library/doctest.html)
* [Doctest: Testing Through Documentation](https://pymotw.com/2/doctest/)
* [Python-Course: doctest](http://www.python-course.eu/python3_tests.php)

## Description of Files
<h6>0-add_integer.py</h6>
Safely adds integers. Function will raise an error if input is not an integer or a float. If it is a float, the function will cast it to an integer before returning a result. The corresponding test is in ``tests/0-add_integer.txt``

<h6>tests/1-mul.txt</h6>
Writing test cases for the module 1-mul.py

<h6>2-matrix_divided.py</h6>
Divides all elements of a matrix by div.

<h6>3-say_my_name.py</h6>
Prints first_name and last_name

<h6>4-print_square.py</h6>
Prints a square

<h6>5-text_indentation.py</h6>
Prints 2 new lines with each of these characters: ``.``, ``?``, and ``:``. Raises an exception if input is not a string.

<h6>100-matrix_mul.py</h6>

<h6>101-lazy_matrix_mul.py</h6>

<h6>102-python.c</h6>

<h6>tests/</h6>
Documentation and tests for use with the module: ``doctest``
