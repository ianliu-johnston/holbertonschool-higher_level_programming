# Holberton School - 0x0B-python-input_output
Reading and writing to files. Reading and writing JSON objects, hacking virtual memory

## New commands / functions used:
* ``import json``
* ``with open(<filename>, 'w' or 'a' or 'r' or 'b', encoding="utf-8") as file:`` -- 'w' for write, 'a' for append, 'r' for read, and 'b' for bytemode. It is good practice to use with open(): because it will be properly closed after reading, even if will raises an exception.
* ``file.read(size)`` -- Reads the whole file if <size> is ommitted. Otherwise reads <size> bytes from the file.
* ``file.readline()`` -- Reads a single line up to the new line
* ``file.readlines()`` -- Read all the lines including newline characters
* ``file.seek(offset, from_what)`` -- changes the position of the object
* ``file.tell()`` -- Returns an integer witht he offset
* ``file.close()`` -- closes a file descriptor
* ``json.dump()`` -- Puts a python object into a json structure.
* ``json.dumps()`` -- Serializes the object into a text file.
* ``json.load(file_descriptor)`` -- loads a json object if file_descriptor has been opened for reading.

## Helpful Links
* [PyDocs: Reading and Writing Files](https://docs.python.org/3.4/tutorial/inputoutput.html#reading-and-writing-files)
* [PyDocs: Predefined Cleanup Actions](https://docs.python.org/3.4/tutorial/errors.html#predefined-clean-up-actions)
* [Files in python](http://www.diveintopython3.net/files.html)
* [json encoder and decoder](https://docs.python.org/3.4/library/json.html)
* [Learn To Program: Youtube](https://www.youtube.com/watch?v=EukxMIsNeqU)
* [Automate the Boring stuff with Python](https://automatetheboringstuff.com/)
* [The Proc Filesystem](https://www.kernel.org/doc/Documentation/filesystems/proc.txt)

## Description of Files
<h6>0-read_file.py</h6>
Reads a file and prints it to stdout

<h6>1-number_of_lines.py</h6>
Returns the number of lines read

<h6>2-read_lines.py</h6>
Reads the number of lines specified in the arguments and prints them to stdout.

<h6>3-write_file.py</h6>
Writes text to a file

<h6>4-append_write.py</h6>
Appends text to a file

<h6>5-to_json_string.py</h6>
Returns a representation of the python object in JSON format

<h6>6-from_json_string.py</h6>
Returns an object represented by a JSON objects 

<h6>7-save_to_json_file.py</h6>
Save python objects into text files represented by JSON objects

<h6>8-load_from_json_file.py</h6>
Loads a Python object from a JSON file.

<h6>9-add_item.py</h6>
Adds all arguments to a Python list then saves them to a file.

<h6>100-append_after.py</h6>

<h6>101-stats.py</h6>

<h6>read_write_heap.py</h6>
* [Reading from the file /var/<pid>/maps](http://stackoverflow.com/questions/1401359/understanding-linux-proc-id-maps)
* [Attach a process with ptrace](http://unix.stackexchange.com/questions/6267/how-to-re-load-all-running-applications-from-swap-space-into-ram/6271#6271)
