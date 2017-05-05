# Holberton School - 0x05-python-exceptions
All about handling exceptions.

## New commands / functions used:
``try:``, ``except: ValueError, TypeError``, ``except: IndexError``

## Helpful Links
* [Python Docs on Errors](https://docs.python.org/3.4/tutorial/errors.html)
* [Learn To Program on Errors and Error Handling](https://www.youtube.com/watch?v=7vbgD-3s-w4)
* [Python-Cours: Exception Handling](http://www.python-course.eu/python3_exception_handling.php)
* [Programiz: Exception Handling](https://www.programiz.com/python-programming/exception-handling)
* [Very Short TutorialsPoint: Exceptions](https://www.tutorialspoint.com/python/python_exceptions.htm)
* [Python Wiki: Handling Exceptions](https://wiki.python.org/moin/HandlingExceptions)
* [Python Exception Handling Techniques (Python 2.7)](https://doughellmann.com/blog/2009/06/19/python-exception-handling-techniques/)

## Description of Files
<h6>0-safe_print_list.py</h6>
Prints x elements of a list. Use try/except

<h6>1-safe_print_integer.py</h6>
Prints an integer with ``'{:d}'.format`` and ``try: / except:``

<h6>2-safe_print_list_integers.py</h6>
Print the first x elements of a list, and only integers.

<h6>3-safe_print_division.py</h6>
Divides two integers and prints the result. ``'{:d}'.format`` and ``try: / except:``

<h6>4-list_division.py</h6>
Divides a list by another list with exception handling.

<h6>5-raise_exception.py</h6>
A function that raises a TypeError.

<h6>6-raise_exception_msg.py</h6>
A function that raises a name error with a message.

<h6>100-safe_print_integer_err.py</h6>
Prints an integer with Error handling to stderr.

<h6>101-safe_function.py</h6>

<h6>102-magic_calculation.py</h6>
Write a function that disassembles to exactly this:

```
  3           0 LOAD_CONST               1 (0)
              3 STORE_FAST               2 (result)

  4           6 SETUP_LOOP              94 (to 103)
              9 LOAD_GLOBAL              0 (range)
             12 LOAD_CONST               2 (1)
             15 LOAD_CONST               3 (3)
             18 CALL_FUNCTION            2 (2 positional, 0 keyword pair)
             21 GET_ITER
        >>   22 FOR_ITER                77 (to 102)
             25 STORE_FAST               3 (i)

  5          28 SETUP_EXCEPT            49 (to 80)

  6          31 LOAD_FAST                3 (i)
             34 LOAD_FAST                0 (a)
             37 COMPARE_OP               4 (>)
             40 POP_JUMP_IF_FALSE       58

  7          43 LOAD_GLOBAL              1 (Exception)
             46 LOAD_CONST               4 ('Too far')
             49 CALL_FUNCTION            1 (1 positional, 0 keyword pair)
             52 RAISE_VARARGS            1
             55 JUMP_FORWARD            18 (to 76)

  9     >>   58 LOAD_FAST                2 (result)
             61 LOAD_FAST                0 (a)
             64 LOAD_FAST                1 (b)
             67 BINARY_POWER
             68 LOAD_FAST                3 (i)
             71 BINARY_TRUE_DIVIDE
             72 INPLACE_ADD
             73 STORE_FAST               2 (result)
        >>   76 POP_BLOCK
             77 JUMP_ABSOLUTE           22

 10     >>   80 POP_TOP
             81 POP_TOP
             82 POP_TOP

 11          83 LOAD_FAST                1 (b)
             86 LOAD_FAST                0 (a)
             89 BINARY_ADD
             90 STORE_FAST               2 (result)

 12          93 BREAK_LOOP
             94 POP_EXCEPT
             95 JUMP_ABSOLUTE           22
             98 END_FINALLY
             99 JUMP_ABSOLUTE           22
        >>  102 POP_BLOCK

 13     >>  103 LOAD_FAST                2 (result)
            106 RETURN_VALUE
```

<h6>103-python.c</h6>

