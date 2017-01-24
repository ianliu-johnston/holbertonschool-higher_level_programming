#!/usr/bin/python3
class Rectangle:
    def __init__(self, width=0, height=0):
        if not isinstance(width, int) or not isinstance(height, int):
            wrong = "width" if not isinstance(width, int) else "height"
            raise TypeError(wrong + " must be an integer")
        if height < 0 or width < 0:
            wrong = "width" if width < 0 else "height"
            raise ValueError(wrong + " must be >= 0")
        self.__width = width
        self.__height = height

    def __str__(self):
        return ("\n".join(["".join(["#" for y in range(self.__width)])
                           for x in range(self.__height)]))

    def __repr__(self):
        return ("Rectangle(" + "{:d}".format(self.__width) + ", " +
                "{:d}".format(self.__height) + ")")

    def __del__(self):
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

    def area(self):
        return(self.__width * self.__height)

    def perimeter(self):
        return(self.__width * 2 + self.__height * 2)
