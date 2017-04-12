#!/usr/bin/python3
"""
Sends a search request to the StarWars API
"""
import requests
import sys


if __name__ == "__main__":
    names = []
    url = "https://swapi.co/api/people/"
    req = requests.get(url, params={'search': sys.argv[1]})
    res = req.json()['results']
    num_results = len(res)
    print("Number of result: {:d}".format(num_results))
    if num_results > 0:
        for i in range(0, num_results):
            names.append(res[i]['name'])
        print("{}".format("\n".join(names)))
