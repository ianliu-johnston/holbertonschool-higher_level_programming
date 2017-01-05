#!/usr/bin/python3
from sys import argv
if __name__ == "__main__":
    result = 0
    for arg in argv[1:]:
        result += int(arg)
    print('{:d}'.format(result))
