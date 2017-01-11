#!/usr/bin/python3
def divisible_by_2(my_list=[]):
    boolist = my_list[:]
    for i in my_list:
        if i % 2 == 0:
            boolist[i] = True
        else:
            boolist[i] = False
    return(boolist)
