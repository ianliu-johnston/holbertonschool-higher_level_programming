#!/usr/bin/python3
def safe_print_list(my_list=[], x=0):
    i = 0
    for i in range(x+1):
        try:
            print('{:d}'.format(my_list[i]), end="")
            continue
        except:
            print("")
            return (i)
    print("")
    return (i)
