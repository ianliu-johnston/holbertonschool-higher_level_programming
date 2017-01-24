#!/usr/bin/python3
Rectangle = __import__('3-rectangle').Rectangle

new_rect = Rectangle(3, 4)

print("Dimensions of your new rectangle: {} x {}".format(new_rect.width, new_rect.height))
print("Area: {}".format(new_rect.area()))
print("Perimeter: {}".format(new_rect.perimeter()))
print(new_rect)
print(repr(new_rect))

new_rect.width = 5
print("Width just changed. New Dimensions: {} x {}".format(new_rect.width, new_rect.height))
print("Area: {}".format(new_rect.area()))
print("Perimeter: {}".format(new_rect.perimeter()))
print(str(new_rect))
print(repr(new_rect))

new_rect.height = 15
print("height just changed. New Dimensions: {} x {}".format(new_rect.width, new_rect.height))
print("Area: {}".format(new_rect.area()))
print("Perimeter: {}".format(new_rect.perimeter()))
print(str(new_rect))
print(repr(new_rect))



print("Making another one.")
next_rect = Rectangle()
print("Dimensions of your new rectangle: {} x {}".format(next_rect.width, next_rect.height))
print("Area: {}".format(next_rect.area()))
print("Perimeter: {}".format(next_rect.perimeter()))
print(str(next_rect))
print(repr(next_rect))
