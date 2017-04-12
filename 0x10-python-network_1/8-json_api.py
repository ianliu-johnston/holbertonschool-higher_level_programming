#!/usr/bin/python3
"""
Gets the body of response with requests library
"""
import requests
import sys


if __name__ == "__main__":
    req = requests.get(sys.argv[1])
    print(req.text)
