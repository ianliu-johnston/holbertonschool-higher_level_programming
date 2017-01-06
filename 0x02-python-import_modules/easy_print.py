#!/usr/bin/python3
import subprocess, sys
from ctypes import *
subprocess.call(["head -c -1 -q easy_print2 easy_print3"], shell=True)
cdll.LoadLibrary("libc.so.6")
CDLL("libc.so.6").printf(b"iscool\n")
