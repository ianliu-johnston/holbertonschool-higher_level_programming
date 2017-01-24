#!/usr/bin/python3
from sys import argv

ac = len(argv)
if ac != 2:
    print("What the fuck do you think you're doing?? Usage: nqueens N")
    exit(1)
elif argv[1].isdigit() is False:
    print("You fucked up. N must be a number")
    exit(1)
elif int(argv[1]) < 4:
    print("Seriously? No. I don't fucking think so. N must be at least 4")
    exit(1)

size = int(argv[1])
chess_board = [["$" for y in range(size)] for x in range(size)]
print ( chess_board )
print("{:d}".format(int(argv[1])))
