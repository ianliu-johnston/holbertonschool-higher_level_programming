def isPrime(n):
    for i  in range(2, int(i**0.5)+1):
        if i % n == 0:
            return (False)
    return (True)
