#!/usr/bin/python3
# Lists all states from a database

if __name__ == "__main__":
    import sqlalchemy
    from sqlalchemy.orm import sessionmaker
    from model_state import Base, State
    from sys import argv, exit

    if len(argv) != 5:
        print("Usage: ./10.py <usrname> <passwd> <database> <search>")
        exit(1)

    usr, pwd, dbe = argv[1], argv[2], argv[3]
    sch = argv[4].split("'")[0]

    eng = "mysql://" + usr + ":" + pwd + "@localhost:3306/" + dbe
    try:
        engine = sqlalchemy.create_engine(eng)
    except Exception as err:
        print(err)
        exit(1)
    Session = sessionmaker(bind=engine)
    session = Session()

    query = session.query(State).filter_by(name=sch)
    if query.first() is None:
        print("Not Found")
    else:
        print("{:d}".format(query[0].id))
    session.close()
