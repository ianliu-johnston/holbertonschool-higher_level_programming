#!/usr/bin/python3
def safe_print_list(my_list=[], x=0):
    i = 0
    try:
        for i in range(x):
            print(my_list[i], end="")
    except:
        print("")
        return (i)
    print("")
    return (i+1)
