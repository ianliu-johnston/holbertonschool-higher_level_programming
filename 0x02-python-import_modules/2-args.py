#!/usr/bin/python3
if __name__ == "__main__":
    from sys import argv
    res = ""
    argc = len(argv) - 1
    delim = 's:' if argc > 1 else '.' if argc == 0 else ':'
    for count, arg in enumerate(argv[1:]):
        res += '{:d}: {}\n'.format(count+1, arg)
    print('{:d} argument{}\n{}'.format(argc, delim, res), end="")
