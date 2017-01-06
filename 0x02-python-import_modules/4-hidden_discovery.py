#!/usr/bin/python3
if __name__ == "__main__":
    import hidden_4
    print(''.join([i + '\n' for i in dir(hidden_4)
                  if "__" not in i[:2]]), end="")
#        for item in dir(hidden_4):
#            if "__" not in item[0:2]:
#                print(item)
