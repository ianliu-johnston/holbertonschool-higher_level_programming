#include <stdlib.h>
#include <stdio.h>
unsigned int factorial(unsigned int n)
{
	unsigned int result = 1;

	for( ; n > 1; n--)
		result *= n;
	return(result);
}

char *lex(unsigned int pos, unsigned int digits)
{
	char *num_list;
	char *result;
	unsigned int fact_num, i, j, index;

	result = malloc((digits + 1) * sizeof(char));
	if(!result)
		return(NULL);
	num_list = malloc((digits + 1) * sizeof(char));
	if(!num_list)
		return (NULL);
	for(i = 0; i < digits; i++)
		num_list[i] = i;
	num_list[digits + 1] = '\0';
	pos -= 1;
	index = 0;
	for(i = 0 ; digits > 0; digits--, i++)
	{
		fact_num = factorial(digits - 1);
		index = pos / fact_num;
		result[i] = num_list[index] + '0';
		for(j = index; j < digits + 1; j++)
			num_list[j] = num_list[j + 1];
		pos %= fact_num;
	}
	result[i] = '\0';
	free(num_list);
	return(result);
}

int main(void)
{
	unsigned int i, digits;
	char *res;

	digits = 4;
	for(i = 1; i <= factorial(digits); i++)
	{
		res = lex(i, digits);
		printf("%s\n", res);
		free(res);
	}
	return(0);
}
