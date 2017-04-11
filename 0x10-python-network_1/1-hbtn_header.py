#!/usr/bin/python3
"""
This is module 1-hbtn_header.
This module takes a url as an argument and displays a specific response header
"""
import urllib.request
import sys


if __name__ == "__main__":
    req = urllib.request.Request(sys.argv[1], method="HEAD")
    with urllib.request.urlopen(req) as response:
        print(response.getheader("X-Request-Id"))
