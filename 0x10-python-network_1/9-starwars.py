#!/usr/bin/python3
"""
Sends a search request to the StarWars API
"""
import requests
import sys


if __name__ == "__main__":
    names = []
    i = 0
    url = "https://swapi.co/api/people/"
    req = requests.get(url, params={'search': sys.argv[1]})
    for i in range(len(req.json()['results'])):
        names.append(req.json()['results'][i]['name'])
    print("Number of result: {:d}\n{}".
          format(i, "\n".join(names)),
          end="" if i == 0 else "\n")
