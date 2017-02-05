#!/usr/bin/python3
def number_of_lines(filename=""):
    with open(filename, encoding="utf-8") as f:
        lineNum = 1
        while True:
            line = f.readline()
            if not line:
                break
            lineNum+= 1
    return lineNum
