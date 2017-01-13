#!/usr/bin/python3
def square_matrix_map(matrix=[]):
    return (list(list(map(lambda x: x**2, list(x for x in r)))for r in matrix))
