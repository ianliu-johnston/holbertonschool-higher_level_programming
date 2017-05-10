# Holberton School - 0x08-python-more_classes
Continuing introduction to Object Oriented Programming in Python. This project is cumulative, so tasks must be done in order.

## New commands / functions used:
* ``class <name>:`` - declare a class.
* ``def __init__(self, value):`` - setup with generic value
* ``self.value = value`` - initialize class attribute with value.
* ``self._value = value`` - initialize restricted class attribute with value.
* ``self.__value = value`` - initialize private class attribute with value.
* ``def __str__(self):`` - Define what the class instance will do if requested to be a string.
* ``def __repr__(self):`` - Define what the class instance will do if requested to be a reproducible object.
* ``def __del__(self):`` - Define what the class instance will do if deleted.
* ``@value.setter`` - A setter for internal attributes
* ``@staticmethod`` - A method that does not depend on an instance of the class.
* ``@classmethod`` - Methods for the whole class
* ``@property`` - A Property of the class instance

## Helpful Links
* [What is OOP?](https://python.swaroopch.com/oop.html)
* [Python OOP](http://www.python-course.eu/python3_object_oriented_programming.php)
* [Class and Instance Attributes](http://www.python-course.eu/python3_class_and_instance_attributes.php)
* [Properties vs. Getters and Setters](http://www.python-course.eu/python3_properties.php)
* [str() vs repr()](http://brennerm.github.io/posts/python-str-vs-repr.html)
* [Backtracking: Programming paradigm](https://en.wikipedia.org/wiki/Backtracking)

## Description of Files
<h6>0-rectangle.py</h6>
Create a blank class.

<h6>1-rectangle.py</h6>
Set width and height properties, and the ability to change them.

<h6>2-rectangle.py</h6>
Add calculations for area and perimeter.

<h6>3-rectangle.py</h6>
Add the ability to print as a rectangle if called with `str(my_rectangle)` or `print(my_rectangle)`

<h6>4-rectangle.py</h6>
Add the ability for the rectangles to return the blue prints for a new rectangle when called with `repr(my_rectangle)`

<h6>5-rectangle.py</h6>
Add a short sad message when the rectangle is deleted

<h6>6-rectangle.py</h6>
Add a public class attribute that tells the user how many rectangles there are. When one comes into existance, increment the count by 1. When one gets deleted, decrement the count by 1.

<h6>7-rectangle.py</h6>
Adds the ability to change the printing symbol from # to anything else.

<h6>8-rectangle.py</h6>
Adds a satic method to determine which rectangle is bigger of a choice of two, with Error checking.

<h6>9-rectangle.py</h6>
Adds a class method to create a square.

<h6>101-nqueens.py</h6>
An algorithm to solve the N queens chess puzzle. Usage: `nqueens N`, where N is an integer that represents the square size of the chess board. The program prints every possible solution to the problem, with one solution per line. Only `sys` module allowed to import.
