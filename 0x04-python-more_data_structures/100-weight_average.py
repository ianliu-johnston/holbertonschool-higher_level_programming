#!/usr/bin/python3
def weight_average(my_list=[]):
    res = 0
    res2 = 0
    tmp = []
    for x, y in my_list:
        res += x * y
        res2 += y
    return (res / res2)
