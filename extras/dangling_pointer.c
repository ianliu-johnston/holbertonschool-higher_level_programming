#include <stdlib.h>
#include <stdio.h>
int ici(int a)
{
	printf("GRRRR\n");
	return (100);

}
int (*mal(int a))()
{
	printf("GRR!\n");
	return (*ici);
}

int main(void)
{
	char *pointer;
	char *dangling_pointer = NULL;

	printf("pointer = %p\ndangling_pointer = %p\n", pointer, dangling_pointer);
	pointer = malloc(2 * sizeof(char));
	dangling_pointer = malloc(2 * sizeof(char));
	pointer[0] = 97;
	dangling_pointer[0] = 98;
	printf("pointer = %p\ndangling_pointer = %p\n", pointer, dangling_pointer);
	free(pointer);
	pointer = NULL;
	free(dangling_pointer);
	printf("pointer = %p\ndangling_pointer = %p\n", pointer, dangling_pointer);
	dangling_pointer = (void *)mal(3);
	printf("dangling_pointer = %d%d%d\n", *dangling_pointer, *dangling_pointer++, *dangling_pointer++);
	printf("dangling_pointer = %d\n", *pointer);
	return (0);
}
