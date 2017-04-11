#!/bin/bash
# Gets just the http code without using pipes
curl -s -o /dev/null -w "%{http_code}" $1
