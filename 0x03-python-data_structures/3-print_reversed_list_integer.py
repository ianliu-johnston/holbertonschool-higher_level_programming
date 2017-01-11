#!/usr/bin/python3
def print_reversed_list_integer(my_list=[]):
    if len(my_list) == 0:
        print("")
    for i in my_list[::-1]:
        print('{:d}'.format(i))
