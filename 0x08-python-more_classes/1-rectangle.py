#!/usr/bin/python3
class Rectangle:
    def __init__(self, width=0, height=0):
        if not isinstance((height, width), int):
            wrong = "height" if not isinstance(height, int) else "width"
            raise TypeError(wrong + " must be an integer")
        if height < 0 or width < 0:
            wrong = "height" if height < 0 else "width"
            raise ValueError(wrong + " must be >= 0")
        self.__width = width
        self.__height = height

    @property
    def width(self):
        return(self.__width)

    @property
    def height(self):
        return(self.__height)
