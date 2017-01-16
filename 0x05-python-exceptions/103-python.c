#include "Python.h"
/*
 * macro that replicates the functionality of Py_SIZE
 */
#define custom_py_size(op) (((PyVarObject *)(op))->ob_size)
/**
  * print_python_bytes - Prints information about python byte objects
  * @p: PyObject pointer to print info about
 (* size = PyBytes_GET_SIZE(p);
 (* str = PyBytes_AS_STRING(p);
  */
void print_python_bytes(PyObject *p)
{
	int size, i;
	char *str;

	if (!PyBytes_Check(p))
		printf("  [ERROR] Invalid Bytes Object\n");
	size = (assert(PyBytes_Check(p)), custom_py_size(p));
	str = (assert(PyBytes_Check(p)), (((PyBytesObject *)(p))->ob_sval));
	printf("[.] bytes object info\n");
	printf("  size: %d\n", size);
	printf("  trying string: %s\n", str);
	printf("  first %d bytes: ", size);
	for (i = 0; i < 10 && i < size; i++)
		printf("%02x ", (unsigned char)str[i]);
	printf("00\n");
}
/**
  * print_python_float - Prints information about python byte objects
  * @p: PyObject pointer to print info about
  */
void print_python_float(PyObject *p)
{
	printf("%s\n", (char *)p);
}
/**
  * print_python_list_info - Prints information about python objects
  * @p: PyObject pointer to print info about
 (* item = __Python_list_Get_Item(p, i);
 (* Compile with:
 (* gcc -Wall -Werror -Wextra -pedantic -std=c99 -shared
 (* -Wl,-soname,libPython.so -o libPython.so -fPIC
 (* -I/usr/include/python3.4 103-python.c
  */
void print_python_list(PyObject *p)
{
	Py_ssize_t i, py_list_size;
	PyObject *item;
	const char *item_type;
	PyListObject *list_object_cast;

	list_object_cast = (PyListObject *)p;
	py_list_size = PyList_Size(p);

	printf("[*] Python list info\n");
	printf("[*] Size of the Python List = %d\n", (int) py_list_size);
	printf("[*] Allocated = %d\n", (int)list_object_cast->allocated);
	for (i = 0; i < py_list_size; i++)
	{
		item = ((PyListObject *)p)->ob_item[i];
		item_type = (((PyObject *)(item))->ob_type)->tp_name;
		printf("Element %d: %s\n", (int) i, item_type);
		print_python_bytes(item);
	}
}
