#!/usr/bin/python3
"""
Sends a search request to the StarWars API
"""
import requests
import sys


if __name__=="__main__":
    url = "https://swapi.co/api/people/"
    req = requests.get(url, params={'search': sys.argv[1]})
    names = []
    for i in range(len(req.json()['results'])):
        names.append(req.json()['results'][i]['name'])
    print("Number of result: {:d}\n{}".format(i + 1, "\n".join(names)))
