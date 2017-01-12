#!/usr/bin/python3
def smallest_number_of_coins(coins_list,value):
    result = [[]]
    result_permutation = []
    value = 0
    possibilities = 0

    for coin in reversed(sorted(coins_list)):
        for iterator in range(value):
            while value >= coin:
                value -= coin
                result_permutation.append(coin)
        result.append(result_permutation)
    return (result)


print (smallest_number_of_coins([1, 7, 10], 21))
"""
print (smallest_number_of_coins([1, 10, 21, 34, 70, 100, 350, 1225, 1500], 140))
print (smallest_number_of_coins([1, 2, 5, 10, 20, 50, 100, 200], 223))
print (smallest_number_of_coins([1, 5, 10, 50, 100], 200))
print (smallest_number_of_coins([1, 3, 5, 7, 9, 11, 15], 200))

print ("Unsorted")
print (smallest_number_of_coins([50, 100, 5, 1, 10, 2, 20, 200], 200))
print (smallest_number_of_coins([21, 10, 1500, 100, 70, 21, 350, 1, 1225, 34], 2398))
print (smallest_number_of_coins([10, 5, 1, 100, 50], 434))
print (smallest_number_of_coins([9, 3, 11, 7, 1, 5, 15], 98))
"""
