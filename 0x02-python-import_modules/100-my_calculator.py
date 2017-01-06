#!/usr/bin/python3
if __name__ == "__main__":
    from sys import argv
    from calculator_1 import add, sub, mul, div
    if len(argv) != 4:
        print("Usage:", argv[0], "<a> <operator> <b>")
        exit(1)

    a, operator, b = int(argv[1]), argv[2], int(argv[3])
    operations = {'+': add, '-': sub, '*': mul, '/': div}
    if operator not in operations:
        print("Unknown operator. Only: +, -, * and / available")
        exit(1)
    print('{:d} {} {:d} = {:d}'.format(a, operator, b, operations[operator](a, b)))
