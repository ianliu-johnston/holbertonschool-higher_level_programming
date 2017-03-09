#!/usr/bin/python3
# Lists all states from a database

if __name__ == "__main__":
    import MySQLdb
    from sys import argv, exit

    if len(argv) != 4:
        print("Usage: {:s} <username> <password> <database>".format(argv[0]))
        exit(1)

    usr = argv[1]
    pwd = argv[2]
    dbe = argv[3]

    database = MySQLdb.Connect(user=usr, passwd=pwd, db=dbe, port=3306)
    cursor = database.cursor()
    cursor.execute("SELECT * FROM states")
    states = cursor.fetchall()
    for row in states:
        print(row)
