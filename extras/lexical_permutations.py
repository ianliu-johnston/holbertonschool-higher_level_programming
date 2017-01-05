#!/usr/bin/python3
def fact(n):
    result = 1
    for n in range(n, 1, -1):
        result *= n
    return (result)

def lexical_permutations(position, num_pass):
    result = ""
    num_list = [n for n in range(num_pass)]
    position -= 1
    for num_pass in range(num_pass, 0, -1):
        fact_num = fact(num_pass - 1)
        index = int(position / fact_num)
        result += str(num_list.pop(index))
        position %= fact_num
    return (result)

digits = 4
for i in range(1, fact(digits)+1):
    print(lexical_permutations(i, digits))
