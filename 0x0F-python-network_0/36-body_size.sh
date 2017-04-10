#!/bin/bash
# gets the length of the body of an html get request
curl -sI  $1 | grep "Content-Length" | rev | cut -d ' ' -f 1 | rev
