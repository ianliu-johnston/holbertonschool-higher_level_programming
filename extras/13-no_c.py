#!/usr/bin/python3
def no_c(str):
    return(str[0:str.index('c')] + str[str.index('c')+1:] if 'c' in str else "nada")
print(no_c("Holberton School"))
print(no_c("C is fun! ccccc"))
print(no_c("Python"))

