#!/usr/bin/python3
Rectangle = __import__('1-rectangle').Rectangle

new_rect = Rectangle(3, 4)

print("Dimensions of your new rectangle: {} x {}".format(new_rect.width, new_rect.height))

new_rect.width = 5
print("Width just changed. New Dimensions: {} x {}".format(new_rect.width, new_rect.height))

new_rect.height = 15
print("height just changed. New Dimensions: {} x {}".format(new_rect.width, new_rect.height))

print("Making another one.")

next_rect = Rectangle()
print("Dimensions of your new rectangle: {} x {}".format(next_rect.width, next_rect.height))

print("Looking for Errors")
next_rect = Rectangle("3", "4")
