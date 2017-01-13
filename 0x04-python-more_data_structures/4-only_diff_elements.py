#!/usr/bin/python3
def only_diff_elements(set_1, set_2):
    a = set_1.difference(set_2)
    b = set_2.difference(set_1)
    return(a.union(b))
