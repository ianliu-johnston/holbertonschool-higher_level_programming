#include "Python.h"
/**
  * print_python_list_info - Prints information about python objects
  * @p: PyObject pointer to print info about
  */
void print_python_list_info(PyObject *p)
{
	Py_ssize_t i, n;
	PyObject *item;

	n = PyList_Size(p);

	printf("[*] Size of the Python List = %d\n", (int)Py_REFCNT(p));
	printf("[*] Size of the Python List = %d\n", (int)n);
	printf("[*] Allocated = %d\n", 0);
	for (i = 0; i < n; i++)
	{
		item = PyList_GetItem(p, i);
		printf("Element %d: %s\n", (int) i, (char *) Py_TYPE(item)->tp_name);
	}
}
