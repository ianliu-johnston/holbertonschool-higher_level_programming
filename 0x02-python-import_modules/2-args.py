#!/usr/bin/python3
import sys
argc = len(sys.argv) - 1
delim = 's:' if argc > 1 else '.' if argc == 0 else ':'
print('{:d} argument{}'.format(argc, delim))
for count, arg in enumerate(sys.argv[1:]):
    print('{:d}: {}'.format(count+1, arg))

