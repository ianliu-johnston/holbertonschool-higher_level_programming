#!/usr/bin/python3
# Lists all states from a database

if __name__ == "__main__":
    import sqlalchemy
    from sqlalchemy import create_engine
    from model_state import Base, State
    from sys import argv, exit

    if len(argv) != 4:
        print("Usage: ./7.py <username> <password> <database>")
        exit(1)

    usr, pwd, dbe = argv[1], argv[2], argv[3]

    eng = "mysql+mysql://" + usr + ":" + pwd + "@localhost:3306/" + dbe
    print(eng)
    try:
        engine = create_engine("mysql+mysql://{}:{}@localhost:3306/{}"
                .format(usr, pwd, dbe))
    except Exception as err:
        print(err)
        exit(1)
    connection = engine.connect()
    states = engine.execute("""
        SELECT * FROM states
        ORDER BY states.id ASC
    """)
    print ("\n".join(["{:d}: {:s}".format(row[0], row[1]) for row in st
ates]))
    connection.close()

