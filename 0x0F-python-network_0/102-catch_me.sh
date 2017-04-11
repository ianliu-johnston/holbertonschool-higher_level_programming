#!/bin/bash
# get server to respond with You Got Me
curl -L -X PUT -d "user_id=98" -H "Origin: HolbertonSchool" 0.0.0.0:5000/catch_me

