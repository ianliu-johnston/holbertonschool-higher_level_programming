#!/usr/bin/python3
if __name__ == "__main__":
    from sys import argv
    print('{:d}'.format(sum(int(a) for a in argv[1:])))
#    result = 0
#    for arg in argv[1:]:
#        result += int(arg)
#    print('{:d}'.format(result))
