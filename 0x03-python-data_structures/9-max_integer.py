#!/usr/bin/python3
def max_integer(my_list=[]):
    x = 0
    if len(my_list) == 0:
        return ("None")
    for i in my_list:
        if i > x or i == my_list[0]:
            x = i
    return (x)
