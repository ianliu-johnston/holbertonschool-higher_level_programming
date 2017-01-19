#!/usr/bin/python3
"""
Text_indentation Module
adds two new lines after "?.:"
doesn't print any spaces at the beginning or end of the sentences.
"""


def text_indentation(text):
    """
    text_indentation function:
    checks to see if input is valid
    adds two new lines after any instances of `?` or `.` or `:`
    then prints the result without any new lines at the beginning
    """
    if text is None or not isinstance(text, str) or len(text) < 0:
        raise TypeError("text must be a string")
    new_txt = "".join([c if c not in "?.:" else c + "\n\n" for c in text])
    for line in new_txt.split("\n"):
        print(line.strip())
