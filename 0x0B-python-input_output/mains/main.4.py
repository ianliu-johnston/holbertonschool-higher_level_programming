#!/usr/bin/python3
append_write = __import__('4-append_write').append_write

nb_characters = append_write("my_first_file.txt", "Dadada!!\n")
print(nb_characters)
