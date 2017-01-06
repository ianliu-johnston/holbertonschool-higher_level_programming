#!/usr/bin/python3
from ctypes import *
cdll.LoadLibrary("libc.so.6")
CDLL("libc.so.6").printf(b"#pythoniscool\n")
