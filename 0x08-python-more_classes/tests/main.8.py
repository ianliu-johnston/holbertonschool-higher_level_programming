#!/usr/bin/python3
Rectangle = __import__('8-rectangle').Rectangle

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

new_rect.height = 3
print("height just changed. New Dimensions: {} x {}".format(new_rect.width, new_rect.height))
print("Area: {}".format(new_rect.area()))
print("Perimeter: {}".format(new_rect.perimeter()))
print(str(new_rect))
print(repr(new_rect))
print("Changing symbol from # to %$")
new_rect.print_symbol = "%$"
print(str(new_rect))
print(repr(new_rect))

print("~**~~-:---~~~++++====::!!WOW MAGIC!!::====++++~~~---:-~~**~")
wow_magic = eval(repr(new_rect))
wow_magic.width = 6
wow_magic.height = 4
print(wow_magic)
print("Is new_rect wow_magic?", new_rect is wow_magic)
print("Is new_rect the same type as wow_magic?", type(new_rect) is type(wow_magic))

print("Gee, wonder which one is bigger...")
if wow_magic is Rectangle.bigger_or_equal(wow_magic, new_rect):
    print("wow_magic({}x{}) is bigger than new_rect({}x{})".format(wow_magic.width, wow_magic.height, new_rect.width, new_rect.height))
else:
    print("new_rect({}x{}) is bigger than wow_magic({}x{})".format(new_rect.width, new_rect.height, wow_magic.width, wow_magic.height))

print("Number of rectangles {:d}".format(Rectangle.number_of_instances))

print("Deleting wow_magic...")
del wow_magic
print("Number of rectangles {:d}".format(Rectangle.number_of_instances))
print("Deleting new_rect...")
del new_rect
print("Number of rectangles {:d}".format(Rectangle.number_of_instances))

print("Making one that isn't as good...")
next_rect = Rectangle()
print("Dimensions of your new rectangle: {} x {}".format(next_rect.width, next_rect.height))
print("Area: {}".format(next_rect.area()))
print("Perimeter: {}".format(next_rect.perimeter()))
print(str(next_rect))
print(repr(next_rect))
