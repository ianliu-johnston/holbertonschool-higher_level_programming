#!/usr/bin/python3
"""
Basic Authentication with github api
"""
import requests
from sys import argv

if __name__ == "__main__":
    if argv[2] == "hbtncorrectionpwd":
        req = requests.get(
                "https://api.github.com/user/hbtncorrectionuser",
                auth=HTTPBasicAuth("hbtncorrectionuser", "hbtncorrectionpwd"))
        print(req.json()['id'])
    else:
        print("None")
