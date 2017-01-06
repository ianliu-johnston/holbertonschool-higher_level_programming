#!/usr/bin/python3
if __name__ == "__main__":
    from sys import argv
    from calculator_1 import add, sub, mul, div
    if len(argv) != 4:
        print("Usage:", argv[0], "<a> <operator> <b>")
        exit(1)

    a, operand, b = int(argv[1]), argv[2], int(argv[3])
    arith = {'+': add, '-': sub, '*': mul, '/': div}
    if operand not in arith:
        print("Unknown operator. Only: +, -, * and / available")
        exit(1)
    print('{:d} {} {:d} = {:d}'.format(a, operand, b, arith[operand](a, b)))
