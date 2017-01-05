#!/usr/bin/python3
from sys import argv
if __name__ == "__main__":
    res = ""
    argc = len(argv) - 1
    delim = 's:\n' if argc > 1 else '.' if argc == 0 else ':\n'
    for count, arg in enumerate(argv[1:]):
        res += '{:d}: {}\n'.format(count+1, arg)
    print('{:d} argument{}{}'.format(argc, delim, res), end="")
