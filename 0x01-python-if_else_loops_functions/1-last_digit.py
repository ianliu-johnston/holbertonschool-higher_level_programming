#!/usr/bin/python3
import random
number = random.randint(-10000, 10000)
lastdigit = ((number * -1) % 10) * -1 if number < 0 else number % 10
if lastdigit > 5:
	result = 'and is greater than 5'
elif lastdigit == 0:
	result = 'and is zero'
else:
	result = 'and is less than 6 and not 0'
print('Last digit of', '{:d}'.format(number), 'is', '{:d}'.format(lastdigit), result)
