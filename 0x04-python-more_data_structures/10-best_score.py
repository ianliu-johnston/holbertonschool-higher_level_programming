#!/usr/bin/python3
def best_score(my_dict):
    biggest = max(my_dict.values())
    for key, value in my_dict.items():
        if value is biggest:
            return key
