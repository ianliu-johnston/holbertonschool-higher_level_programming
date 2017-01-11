#!/usr/bin/python3
def print_matrix_integer(matrix=[[]]):
    for i in matrix:
        for j in i:
            print('{:d}'.format(j), end=" ")
        print("")
