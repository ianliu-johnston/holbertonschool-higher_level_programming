#!/usr/bin/python3
"""
Basic Authentication with github api
"""
import requests
from sys import argv

if __name__ == "__main__":
    try:
        req = requests.get("https://api.github.com/user" + argv[1], auth=(argv[1], argv[2]))
        print(req.json()['id'])
    except:
        print("None")
