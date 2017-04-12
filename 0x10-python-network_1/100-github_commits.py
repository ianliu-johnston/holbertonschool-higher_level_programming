#!/usr/bin/python3
"""
Documentation
"""
import requests
from sys import argv


if __name__ == "__main__":
    req = requests.get("https://api.github.com/repos/"
                       "{}/{}/commits".
                       format(argv[2], argv[1]))
    for i in range(0, min(len(req.json()), 10)):
        print("{}: {}".format(
                req.json()[i]['sha'],
                req.json()[i]['commit']['author']['name']
            ))
