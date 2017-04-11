#!/usr/bin/python3
"""
Basic Authentication with github api
"""
import requests
from sys import argv

requests.get("https://intranet.hbtn.co/auth/sign_in", auth=(argv[1], argv[2]))
if __name__ == "__main__":
    req = requests.get("https://api.github.com/user", auth=(argv[1], argv[2]))
    print(req.json()['id'])
