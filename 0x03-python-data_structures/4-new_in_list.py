#!/usr/bin/python3
def new_in_list(my_list, idx, element):
    tmp_list = my_list[:]
    tmp_list[idx] = element if idx < len(my_list) else "nope"
    return(tmp_list)
