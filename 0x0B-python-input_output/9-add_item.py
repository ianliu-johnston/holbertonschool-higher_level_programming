#!/usr/bin/python3
"""
Adds all arguments to a JSON file.
"""


from sys import argv
save_to_json = __import__('7-save_to_json_file').save_to_json_file
load_from_json = __import__('8-load_from_json_file').load_from_json_file

if __name__ == "__main__":
    try:
        lst = load_from_json("add_item.json")
    except:
        pass
        lst = []
    for av in argv[1:]:
        lst.append(av)
    save_to_json(lst, "add_item.json")
