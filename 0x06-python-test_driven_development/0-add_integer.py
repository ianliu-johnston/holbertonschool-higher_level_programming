#!/usr/bin/python3
"""
This is the add_integer module

This module returns the sum of two numbers a and b.
It accepts only integers and floats, otherwise a TypeError is raised.
If an input is a float, it is cast automatically to an integer.
"""


def add_integer(a, b):
    """
    add_integer:
    First check if the input is correct,
    then cast both into ints and return the sum of the result.
    """
    try:
        if isinstance(a, (int, float)) is False:
            raise TypeError('a must be an integer')
        elif isinstance(b, (int, float)) is False:
            raise TypeError('b must be an integer')
        return(int(a) + int(b))
    except:
        raise
