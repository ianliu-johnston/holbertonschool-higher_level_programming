#!/usr/bin/python3
"""
Basic Authentication with github api
"""
import requests
from sys import argv

if __name__ == "__main__":
    requests.post("https://intranet.hbtn.co/auth/sign_in", data={argv[1], argv[2]})
    req = requests.get("https://api.github.com/user", auth=(argv[1], argv[2]))
    print(req.json()['id'])