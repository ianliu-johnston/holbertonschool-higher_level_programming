#!/usr/bin/python3
import random
number = random.randint(-10000, 10000)
lastdigit = number % -10 if number < 0 else number % 10
if lastdigit > 5:
    result = 'and is greater than 5'
elif lastdigit == 0:
    result = 'and is 0'
else:
    result = 'and is less than 6 and not 0'
print('Last digit of', '{:d}'.format(number), 'is ', end="")
print('{:d}'.format(lastdigit), result)
