#!/usr/bin/python3
class Rectangle:
    number_of_instances = 0
    print_symbol = "#"

    def __init__(self, width=0, height=0):
        if not isinstance(width, int) or not isinstance(height, int):
            wrong = "width" if not isinstance(width, int) else "height"
            raise TypeError(wrong + " must be an integer")
        if height < 0 or width < 0:
            wrong = "width" if width < 0 else "height"
            raise ValueError(wrong + " must be >= 0")
        self.__width = width
        self.__height = height
        type(self).number_of_instances += 1

    def __str__(self):
        return ("\n".join(["".join([self.print_symbol
                           for y in range(self.__width)])
                           for x in range(self.__height)]))

    def __repr__(self):
        return ("Rectangle(" + "{:d}".format(self.__width) + ", " +
                "{:d}".format(self.__height) + ")")

    def __del__(self):
        type(self).number_of_instances -= 1
        print("Bye rectangle...")

    @property
    def width(self):
        return(self.__width)

    @property
    def height(self):
        return(self.__height)

    @width.setter
    def width(self, value):
        if not isinstance(value, int):
            raise TypeError("width must be an integer")
        if value < 0:
            raise TypeError("width must be an integer")
        self.__width = value

    @height.setter
    def height(self, value):
        if not isinstance(value, int):
            raise TypeError("height must be an integer")
        if value < 0:
            raise TypeError("height must be an integer")
        self.__height = value

    @staticmethod
    def bigger_or_equal(rect_1, rect_2):
        if type(rect_1) is not Rectangle or type(rect_2) is not Rectangle:
            wrong = "rect_1" if type(rect_1) is not Rectangle else "rect_2"
            raise TypeError(wrong + " must be an instance of Rectangle")
        return (rect_1 if rect_1.area() >= rect_2.area() else rect_2)

    def change_symbol(sym):
        type(self).print_symbol = sym

    def area(self):
        return(self.__width * self.__height)

    def perimeter(self):
        return(self.__width * 2 + self.__height * 2)
