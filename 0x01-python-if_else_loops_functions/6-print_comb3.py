#!/usr/bin/python3
for num in range(89):
    if num / 10 < num % 10:
        print('{:02d}'.format(num), end=", ")
print('{:02d}'.format(num+1))
