#!/bin/bash
# Sends a post request with a json file
curl -sH "Content-Type: application/json" -d "@$2" "$1"
