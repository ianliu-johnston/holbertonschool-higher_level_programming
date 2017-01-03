#!/usr/bin/python3
import random
number = random.randint(-10, 10)
if number > 0:
    str = 'is positive'
elif number == 0:
    str = 'is zero'
else:
    str = 'is negative'
print('{:d}'.format(number), str)
