#!/usr/bin/python3
def square_matrix(matrix=[]):
    tmp = []
    for x in matrix:
        tmp.append(list(map(lambda x: x**2, x)))
    return (tmp)

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

new_matrix = square_matrix(matrix)
print(new_matrix)
print(matrix)
