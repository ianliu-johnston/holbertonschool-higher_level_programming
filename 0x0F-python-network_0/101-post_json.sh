#!/bin/bash
# Sends a post request with a json file
curl "$1" -X POST -H "Content-Type: application/json" -d "@$2"
