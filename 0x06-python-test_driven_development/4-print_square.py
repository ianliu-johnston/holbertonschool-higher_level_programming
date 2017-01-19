#!/usr/bin/python3
"""
Print_square Module:
    Prints out a square to the terminal, made up of #
"""


def print_square(size):
    """
    print_square
    1. Checks to see if `size` is a positive integer. if not, raises an error.
    2. Prints out the appropriately sized square depending on size.
    """
    if not isinstance(size, int):
        raise TypeError("size must be an integer")
    elif size < 0:
        raise ValueError("size must be >= 0")
    elif size == 0:
        return
    else:
        print("\n".join([
            "".join(["#" for x in range(size)])
            for y in range(size)]))
