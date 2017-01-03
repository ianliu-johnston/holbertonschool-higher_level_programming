#!/usr/bin/python3
def uppercase(str):
    length = len(str)
    endpt = ""
    for count, char in enumerate(str):
        if count + 1 == length:
            endpt = "\n"
        if ord(char) in range(ord('a'), ord('z')+1):
            char = chr(ord(char) - (ord('a') - ord('A')))
        print('{:s}'.format(char), end=endpt)
uppercase("Holbertonzzzz Zz NN")
