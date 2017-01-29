#!/usr/bin/python3
from sys import argv

def main():
    ac = len(argv)
    if ac != 2:
        print("Usage: nqueens N")
        exit(1)
    elif argv[1].isdigit() is False:
        print("N must be a number")
        exit(1)
    elif int(argv[1]) < 4:
        print("N must be at least 4")
        exit(1)

    size = int(argv[1])
    chess_board = [["$" for y in range(size)] for x in range(size)]
    print ( chess_board )
    print("{:d}".format(int(argv[1])))

if __name__ == "__main__":
    main()
