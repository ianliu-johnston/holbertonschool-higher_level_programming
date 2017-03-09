#!/usr/bin/python3
# Lists all states from a database

if __name__ == "__main__":
    import MySQLdb
    from sys import argv, exit

    if len(argv) != 4:
        print("Usage: {:s} <username> <password> <database name>".format(argv[0]))
        exit(1)
    database = MySQLdb.Connect(user=argv[1], passwd=argv[2], \
            db=argv[3], port=3306)
    cursor = database.cursor()
    cursor.execute("SELECT * FROM states")
    states = cursor.fetchall()
    for row in states:
        print(row)

