#!/usr/bin/python3
def safe_print_list(my_list=[], x=0):
    i = 0
    for i in range(x):
        try:
            print('{:d}'.format(my_list[i]), end="")
            continue
        except(IndexError):
            print("")
            return (i)
    print("")
    return (i + 1)
