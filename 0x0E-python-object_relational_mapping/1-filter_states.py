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

    try:
        database = MySQLdb.Connect(user=usr, passwd=pwd, db=dbe, port=3306)
    except Exception as err:
        print(err)
        exit(1)
    cursor = database.cursor()
    cursor.execute("""
        SELECT * FROM states WHERE states.name LIKE 'N%'
        ORDER BY states.id ASC
    """)
    for row in cursor.fetchall():
        if row[1][0] == 'N':
            print(row)
    cursor.close()
    database.close()
