#!/usr/bin/python3
"""
./read_write_heap.py `ps -aux | grep dummy.py | grep -v "grep" | cut -d ' ' -f 3` string replace


"""
import os
import ctypes
from sys import argv, exit

c_ptrace = ctypes.CDLL("libc.so.6").ptrace
c_pid_t = ctypes.c_int32
c_ptrace.argtypes = [ctypes.c_int, c_pid_t, ctypes.c_void_p, ctypes.c_void_p]

def ptrace(attach, pid):
    op = ctypes.c_int(16 if attach else 17) # 16 = Attach, 17 = Detatch
    c_pid = c_pid_t(pid)
    null = ctypes.c_void_p()
    err = c_ptrace(op, c_pid, null, null)
    print("Good")
    if err != 0:
        print("Ptrace Error.")
        exit(1)


def check_args():
    if len(argv) != 3:
        print("{} pid search_string replace_string".format(argv[0]))
        exit(1)
    pid = argv[1]
    try:
        process_status = (os.stat("/proc/" + str(pid)))
    except FileNotFoundError:
        print("No process with the matching PID exists")
        exit(1)
    return(pid)

def get_heap_memory_addr(pid=1):
    with open("/proc/" + str(pid) + "/maps", 'r') as f:
        while True:
            line = f.readline()
            if '[heap]' in line:
                f.close()
                return (line[:8], line[9:16])
            if not line:
                break
        f.close()

def get_strings(pid=1):
    ptrace(True, int(pid))
    with open("/proc/" + str(pid) + "/mem", 'r', 0) as f:
        print("Ok")
        line = f.readline()
        while line:
            line = f.readline()
            if argv[2] in line:
                print("OOh YEAH!!")
            print(line)
    return "Error, no address found"

if __name__ == "__main__":
    pid = check_args()
    memaddr = get_heap_memory_addr(pid)
    get_strings(pid)
    print(memaddr)
