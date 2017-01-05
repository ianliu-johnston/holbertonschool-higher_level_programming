#!/usr/bin/python3
def islower(c):
    return (True if ord(c) in range(ord('a'), ord('z')+1) else False)
    # return 97 <= ord(c) <= 122
