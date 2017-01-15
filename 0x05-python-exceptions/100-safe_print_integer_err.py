#!/usr/bin/python3
from sys import stderr


def safe_print_integer_err(value):
    try:
        print('{:d}'.format(value))
    except (ValueError, TypeError) as te:
        stderr.write('Exception: {}\n'.format(te))
        return (False)
    return (True)
