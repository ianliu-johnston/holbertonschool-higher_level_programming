#!/usr/bin/python3
def safe_print_list(my_list=[], x=0):
    if my_list == {} or my_list is None:
        return (0)
    n = 0
    for i in range(x):
        try:
            print('{}'.format(my_list[i]), end="")
            n += 1
        except IndexError, ValueError:
            break
    print("")
    return (n)
