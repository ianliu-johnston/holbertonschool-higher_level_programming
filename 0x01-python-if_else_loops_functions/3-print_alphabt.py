#!/usr/bin/python3
for char in range(ord('a'), ord('z')+1):
    if chr(char) == 'q' or chr(char) == 'e':
        continue
    print(chr(char), end="")
