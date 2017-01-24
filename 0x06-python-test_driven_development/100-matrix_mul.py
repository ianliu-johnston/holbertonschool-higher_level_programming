#!/usr/bin/python3
"""
Documentation here.
"""


def matrix_mul(m_a, m_b):
    """
    1: Check to see if format of matricies are ok.
    2. Check to see if matricies can be multiplied.
    3. Check to see if matricies only contain integers or floats.
    """
    if not isinstance(m_a, list) or not isinstance(m_b, list):
        wrong = "m_a" if not isinstance(m_a, list) else "m_b"
        raise TypeError(wrong + " must be a list")
    if len(m_a) is 0 or len(m_b) is 0:
        wrong = "m_a" if not isinstance(m_a, list) else "m_b"
        raise ValueError(wrong + " can't be empty")
    if not isinstance(m_a[0], list) or not isinstance(m_b[0], list):
        wrong = "m_a" if not isinstance(m_a[0], list) else "m_b"
        raise TypeError(wrong + " should contain only integers or floats")
    if len(m_a) != len(m_b[0]):
        raise TypeError("matricies cannot be multipiled")

    only_len_m_a = len(m_a[0])
    only_len_m_b = len(m_b[0])

    for row in m_a:
        if not isinstance(row, list):
            raise TypeError("m_a should contain only integers or floats")
        if only_len_m_a != len(row):
            raise TypeError("each row of m_a must should be of the same size")
        for col in row:
            if not isinstance(col, (int, float)):
                raise TypeError("m_a should contain only integers or floats")

    for row in m_b:
        if not isinstance(row, list):
            raise TypeError("m_b should contain only integers or floats")
        if only_len_m_b != len(row):
            raise TypeError("each row of m_b must should be of the same size")
        for col in row:
            if not isinstance(col, (int, float)):
                raise TypeError("m_b should contain only integers or floats")
    new_matrix = []
    for row_a in m_a:
        new_matrix.append(row_a)

    return ("END")

m_a = [[1, 2], [3, 4]] # 2 x 2
m_b = [[5, 6], [7, 8]] # 2 x 2
print(matrix_mul(m_a, m_b)) # should return 2 x 2
"""
print(matrix_mul(m_b, m_a))

m_a = [[1, 2], [4, 5], [6, 7]] # 3 x 2
m_b = [[1, 2, 3], [4, 5, 6]]   # 2 x 3
print(matrix_mul(m_a, m_b)) # should return 3 x 3
print(matrix_mul(m_b, m_a))

print("Should raise an error")
print(matrix_mul(m_a, m_a)) # should return 3 x 3
print(matrix_mul(m_b, m_b)) # should return 3 x 3

m_b = [[1, 2], [3, 4, 5]]
print(matrix_mul(m_a, m_b))

m_a = []
m_b = [[1, 2], [3, 4]]
matrix_mul(m_a, m_b)

m_a = [[1, 2], [3, 4]]
m_b = [[1, 2], [3, 4]]
print(matrix_mul(m_a, m_b))
m_a = [[1, 2]]
m_b = [[3, 4], [5, 6]]
print(matrix_mul(m_a, m_b))
"""
"""
m_a = None
m_b = [[1, 2], [3, 4]]
matrix_mul(m_a, m_b)

m_a = [[1, 2, 3]]
m_b = [[1, 2], [3, 4]]
matrix_mul(m_a, m_b)

print("Should fail")
m_a = [[1, 2], [3, 4]]
m_b = [[1, 2, 3], [4, 5]]
matrix_mul(m_a, m_b)
m_a = []
m_b = [[1, 2], [3, 4]]
matrix_mul(m_a, m_b)

m_a = [[]]
m_b = [[1, 2], [3, 4]]
matrix_mul(m_a, m_b)
"""
