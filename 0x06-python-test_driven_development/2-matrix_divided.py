#!/usr/bin/python3

"""
This is the matrix_divided module

This module returns the result of the division
of all items in a matrix by `div`.
It accepts a multi-dimensional matrix composed of
only ints and floats, otherwise a TypeError is raised.
"""


def matrix_divided(matrix, div):
    """
    Divide each element of `matrix` by `div` with type checking

    Function is structured as follows:
    1. Check to see if div is the correct type, and is not zero
    2. Check to see if matrix is well-formed, copy the matrix, and divide
    4. Return the new matrix.
    """
    if not isinstance(div, (int, float)):
        raise TypeError("div must be a number")
    elif div is 0:
        raise ZeroDivisionError("division by zero")
    wrong_type = "matrix must be a matrix (list of lists) of integers/floats"
    wrong_size = "Each row of the matrix must have the same size"
    new_matrix = []
    if matrix is None or len(matrix) is 0 or len(matrix[0]) is 0:
        raise TypeError(wrong_type)
    previous = len(matrix[0])

    try:
        for count, row in enumerate(matrix):
            if not isinstance(row, list):
                raise TypeError(wrong_type)
            if len(row) != previous:
                raise TypeError(wrong_size)
            previous = len(row)
            new_matrix.append(row[:])
            for val, item in enumerate(row):
                if not isinstance(item, (int, float)):
                    raise TypeError(wrong_type)
                new_matrix[count][val] = round(item / div, 2)
    except:
        raise
    else:
        return (new_matrix)
