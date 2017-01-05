#!/usr/bin/python3
for char in range(ord('a'), ord('z')+1):
    if chr(char) != 'q' and chr(char) != 'e':
        print('{:c}'.format(char), end="")
