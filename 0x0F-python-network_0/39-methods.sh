#!/bin/bash
# Displays all methods the server will accept
curl -X GET -sI $1 | grep "Allow:" | cut -d ' ' -f2-
