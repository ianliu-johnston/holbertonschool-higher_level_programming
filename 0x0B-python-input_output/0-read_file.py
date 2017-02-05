#!/usr/bin/python3
def read_file(filename=""):
    with open(filename, encoding="utf-8") as f:
        lineNum = 1
        while(True):
            line = f.readline()
            if not line:
                break
            print(line, end="")
            lineNum += 1
