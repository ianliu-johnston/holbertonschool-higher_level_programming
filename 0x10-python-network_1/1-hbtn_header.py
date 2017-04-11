#!/usr/bin/python3
"""
Grabs the header X-Request-Id from a url passed as an argument
"""
import urllib.request
from sys import argv


if __name__ == "__main__":
    req = urllib.request.Request(str(argv[1]), method="HEAD")
    with urllib.request.urlopen(req) as response:
        print(response.getheader('X-Request-Id'))
