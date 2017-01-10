#!/usr/bin/python3
import decimal

def isPrime(n):
    for i in range(2, int(n**0.5)+1):
        if i % n == 0:
            return (False)

#power2 = 4
#power2_count = 3
#power5 = 5
#power5_count = 2
for j in range(1, 1000, 1):
    if isPrime(j) is False:
        print('1/{:d} = {:2f}'.format(j, decimal.Decimal(1/j)))
#    if i == power2:
#        power2 = 2**power2_count
#        power2_count += 1;
#        print("Power2 ya!")
#    elif i == power5:
#        power5 = 5**power5_count
#        power5_count += 1;
#        print("Power5! Awesome!")
#    elif (i % 100) == 0:
#        print("Woh, divisible by 100!")
