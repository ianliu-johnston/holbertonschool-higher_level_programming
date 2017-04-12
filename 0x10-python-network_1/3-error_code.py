#!/usr/bin/python3
"""
Displays the body of a response from a url
"""
import urllib
import sys


if __name__ == "__main__":
    req = urllib.request.Request(sys.argv[1])
    with urllib.request.urllopen(req) as response:
        print(response.read())
