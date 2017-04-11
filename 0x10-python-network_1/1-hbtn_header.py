#!/usr/bin/python3
"""
la
"""
import urllib.request
from sys import argv


if __name__ == "__main__":
    req = str(argv[1])
    with urllib.request.urlopen(req) as response:
        html = response.info()
    print('{}'.format(html['X-Request-Id']))
