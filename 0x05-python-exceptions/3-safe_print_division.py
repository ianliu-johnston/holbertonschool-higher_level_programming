#!/usr/bin/python3
def safe_print_division(a, b):
    result = 0
    try:
        result = a / b
    except TypeError:
        result = None
    finally:
        print('Inside result: {:0.1f}'.format(result))
        return (result)
