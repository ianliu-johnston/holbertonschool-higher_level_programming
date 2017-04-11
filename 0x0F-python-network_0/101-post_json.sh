#!/bin/bash
# Sends a post request with a json file
curl -X POST -H "Content-Type: application/json" -d "@$2" $1
