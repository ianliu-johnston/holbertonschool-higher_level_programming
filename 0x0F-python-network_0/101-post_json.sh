#!/bin/bash
# Sends a post request with a json file
curl -d "@$2" $1
