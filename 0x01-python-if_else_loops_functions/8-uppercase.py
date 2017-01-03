#!/usr/bin/python3
def uppercase(str):
    length = len(str)
    endpt = ""
    for count, char in enumerate(str):
        if count + 1 == length:
            endpt = "\n"
        if ord(char) in range(ord('a'), ord('z')):
            print(chr(ord(char) - (ord('a') - ord('A'))), end=endpt)
        else:
            print(char, end=endpt)
