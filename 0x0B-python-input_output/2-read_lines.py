#!/usr/bin/python3
def read_lines(filename="", nb_lines=0):
    with open(filename, encoding="utf-8") as f:
        lineNum = 1
        while True:
            line = f.readline()
            if not line or if lineNum == nb_lines:
                break
            print(line, end="")
            lineNum+= 1
