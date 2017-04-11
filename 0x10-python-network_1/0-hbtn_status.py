#!/usr/bin/python3
"""
Fetches a website URI with urllib
"""
import urllib.request


if __name__ == "__main__":
    req = 'https://intranet.hbtn.io/status'
    with urllib.request.urlopen(req) as response:
        html = response.read()
    print("""Body Response:
\t- type:  {}
\t- content: {}
\t- utf8 content: {}""".format(type(html), html, html.decode('utf-8')))
