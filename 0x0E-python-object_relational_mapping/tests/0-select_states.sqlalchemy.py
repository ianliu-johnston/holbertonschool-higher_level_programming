#!/usr/bin/python3
# Lists all states from a database

if __name__ == "__main__":
    import sqlalchemy, MySQLdb
    from sys import argv, exit

    if len(argv) != 4:
        print("Usage: {:s} <username> <password> <database name>".format(argv[0]))
        exit(1)
    engine = sqlalchemy.create_engine('mysql://' + argv[1] + ':' \
            + argv[2] + "@localhost/" + argv[3])
    connection = engine.connect()
    states = connection.execute("SELECT * FROM states")
    for row in states:
        print(row)
    connection.close()

