#!/bin/bash
# Sends a post request with a json file
curl -s -d "@$2" $1
