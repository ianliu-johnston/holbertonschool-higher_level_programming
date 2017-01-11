#!/usr/bin/python3
def multiple_returns(sentence):
    length = len(sentence)
    first_char = sentence[0] if length > 0 else "None"
    tup = length, sentence[0]
    return(tup)

sentence = "At Holberton school, I learnt C!"
length, first = multiple_returns(sentence)
print("Length: {:d} - First character: {}".format(length, first))
