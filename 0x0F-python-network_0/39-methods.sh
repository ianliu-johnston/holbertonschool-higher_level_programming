#!/bin/bash
# Displays all methods the server will accept
curl -X GET -sI $1 | grep "Accept:" | cut -d ' ' -f2-
