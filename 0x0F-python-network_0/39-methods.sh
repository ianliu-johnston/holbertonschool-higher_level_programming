#!/bin/bash
# Displays all methods the server will accept
curl -sI $1 | grep "Accept:" | cut -d ':' -f2
