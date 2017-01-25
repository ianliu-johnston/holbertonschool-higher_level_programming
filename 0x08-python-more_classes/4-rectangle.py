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
        if self.__width > 0 and self.__height > 0:
            return ("\n".join(["".join(["#"
                               for y in range(self.__width)])
                               for x in range(self.__height)]))

    def __repr__(self):
        return ("Rectangle({:d}, {:d})".format(self.__width, self.__height))

    @property
    def width(self):
        return(self.__width)

    @width.setter
    def width(self, value):
        if not isinstance(value, int):
            raise TypeError("width must be an integer")
        if value < 0:
            raise ValueError("width must be >= 0")
        self.__width = value

    @property
    def height(self):
        return(self.__height)

    @height.setter
    def height(self, value):
        if not isinstance(value, int):
            raise TypeError("height must be an integer")
        if value < 0:
            raise ValueError("height must be >= 0")
        self.__height = value

    def area(self):
        return(self.__width * self.__height)

    def perimeter(self):
        if self.__width > 0 and self.__height > 0:
            return(self.__width * 2 + self.__height * 2)
        else:
            return (0)
