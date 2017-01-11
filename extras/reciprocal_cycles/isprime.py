#!/usr/bin/python3
def isprime_custom(n):
    if n == 2 or n == 3 or n == 5:
        return (True)
    if n % 2 == 0 or n % 3 == 0 or n % 5 == 0 or n == 1:
        return (False)
    for i in range(5, int(n**0.5)+1, 2):
        if i % n == 0:
            return (False)
    return (True)
