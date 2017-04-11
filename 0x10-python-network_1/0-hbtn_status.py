#!/usr/bin/python3
"""
Fetches a status with urllib
"""
import urllib.request


req = 'https://intranet.hbtn.io/status'
with urllib.request.urlopen(req) as response:
    html = response.read()
print(
        "Body Response:\n\t- type:  {}\n\t- content: {}\n\t- utf8 content: {}".format(
            type(html), html, html.decode('utf-8'))
     )
