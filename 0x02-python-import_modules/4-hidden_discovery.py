#!/usr/bin/python3
if __name__ == "__main__":
    import hidden_4
    print('\n'.join([i for i in dir(hidden_4)if "__" not in i[:2]]))
