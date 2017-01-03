#!/usr/bin/python3
def uppercase(str):
    length = len(str)
    i = 0
    endpt = ""
    for char in str:
        i += 1
        if i == length:
            endpt = "\n"
        if ord(char) in range(ord('a'), ord('z')):
            print(chr(ord(char) - (ord('a') - ord('A'))), end=endpt)
        else:
            print(char, end=endpt)
uppercase("holberton")
uppercase("Holberton School 98 Battery street")
