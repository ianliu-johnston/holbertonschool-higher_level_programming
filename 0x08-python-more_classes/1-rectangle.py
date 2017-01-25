#!/usr/bin/python3
"""
The Rectangle Module:
"""


class Rectangle:
    """
    The Rectangle Class:
    Has two internal properties, and two methods to change them.
    Optional arguments specify the width and height of the rectangle.
    """
    def __init__(self, width=0, height=0):
        self.__width = width
        self.__height = height

    @property
    def width(self):
        return(self.__width)

    @width.setter
    def width(self, value):
        if not isinstance(value, int):
            raise TypeError("width must be an integer")
        if value < 0:
            raise TypeError("width must be an integer")
        self.__width = value

    @property
    def height(self):
        return(self.__height)

    @height.setter
    def height(self, value):
        if not isinstance(value, int):
            raise TypeError("height must be an integer")
        if value < 0:
            raise TypeError("height must be an integer")
        self.__height = value
