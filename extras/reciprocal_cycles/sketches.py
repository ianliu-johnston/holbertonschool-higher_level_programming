#!/usr/bin/python3
import decimal
from isprime import isprime_custom

power2 = 4
power2_count = 3
power5 = 5
power5_count = 2
for i in range(1, 1000):
    if i == power2:
        power2 = 2**power2_count
        power2_count += 1;
        print("Power2 ya!")
    elif i == power5:
        power5 = 5**power5_count
        power5_count += 1;
        print("Power5! Awesome!")
    elif (i % 100) == 0:
        print("Woh, divisible by 100!")
    elif isprime_custom(i) is True:
        print("Ooh, a prime! ", end="")
        print('1/{:d} = {:2f}'.format(i, decimal.Decimal(1/i)))
    else:
        print('1/{:d} = {:2f}'.format(i, decimal.Decimal(1/i)))
