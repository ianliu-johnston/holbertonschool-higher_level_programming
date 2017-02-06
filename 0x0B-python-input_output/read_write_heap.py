#!/usr/bin/python3
"""
./read_write_heap.py `ps -aux | grep dummy.py | grep -v "grep" | cut -d ' ' -f 3` <string> <replace>


"""

import os
from sys import argv, exit
def check_args():
    if len(argv) != 4:
        print("{} pid search_string replace_string".format(argv[0]))
        exit(1)
    pid = argv[1]
    try:
        process_status = (os.stat("/proc/" + str(pid)))
    except FileNotFoundError:
        print("No process with the matching PID exists")
        exit(1)
    return(pid)

def display_info(pid=1):
    with open("/proc/" + str(pid) + "/status", 'r') as f:
        while True:
            line = f.readline()
            if not line:
                break
            print(line, end="")
        f.close()

if __name__ == "__main__":
    pid = check_args()
    display_info(pid)
