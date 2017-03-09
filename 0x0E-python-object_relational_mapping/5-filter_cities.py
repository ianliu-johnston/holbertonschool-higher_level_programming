#!/usr/bin/python3
# Lists all states from a database

if __name__ == "__main__":
    import MySQLdb
    from sys import argv, exit

    if len(argv) != 5:
        print("Usage: ./5.py <username> <password> <database> <search>")
        exit(1)

    usr, pwd, dbe = argv[1], argv[2], argv[3]
    sch = argv[4].split("'")[0]

    try:
        database = MySQLdb.Connect(user=usr, passwd=pwd, db=dbe, port=3306)
    except Exception as err:
        print(err)
        exit(1)
    cursor = database.cursor()
    cursor.execute("""
        SELECT cities.name FROM cities
        JOIN states ON cities.state_id = states.id
        WHERE states.name = %s
        ORDER BY cities.id ASC
    """, (sch,))
    print(", ".join([row[0] for row in cursor.fetchall()]))
    cursor.close()
    database.close()
