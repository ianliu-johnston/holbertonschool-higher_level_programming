#Holberton School - 0x0E-python-object_relational_mapping
Python, meet SQL. 

## New commands / functions used:
``sqlalchemy``, ``MySQLdb``

## Helpful Links
* [Fullstack Python: ORMS](https://www.fullstackpython.com/object-relational-mappers-orms.html)
* [Read the docs for mysqlclient Python Module](https://mysqlclient.readthedocs.io/en/latest/index.html)
* [Tutorial for sqlalchemy](http://docs.sqlalchemy.org/en/latest/orm/tutorial.html)
* [Docs for sqlalchemy](http://docs.sqlalchemy.org)
* [Github repository for mysqlclient](https://github.com/PyMySQL/mysqlclient-python)
* [Docker container with mysql setup on ubuntu:14.04](https://hub.docker.com/r/sameersbn/mysql/#creating-user-and-database-at-launch)
* [Github for the Docker container mentioned above](https://github.com/sameersbn/docker-mysql)
* [MySQL for Python, Albert Lukaszewski, 2010, Packt Publishing](https://www.packtpub.com/big-data-and-business-intelligence/mysql-python)
* [sqlalchemy docs on Session](http://docs.sqlalchemy.org/en/latest/orm/session.html)

## Description of Files
<h6>Dockerfile</h6>
Dockerfile that sets up python3 modules with sameersbn/mysql:latest as a base image

<h6>0-select_states.py</h6>
Lists all states from the database hbtn_0e_0_usa. Takes in 3 arguments, mysql username, password, and database name.

<h6>1-filter_states.py</h6>
Similar to task 0, but filter all results that start with 'N'

<h6>2-my_filter_states.py</h6>
Accepts one more argument, where the fourth argument is a query to be matched

<h6>3-my_safe_filter_states.py</h6>
Protect queries against SQL injection

<h6>4-cities_by_state.py</h6>
List all cities from the database hbtn_0e_4_usa. Similar to task 0.

<h6>5-filter_cities.py</h6>
Finds a user defined state and lists all cities for that state.

<h6>model_state.py</h6>
Class definition for state objects

<h6>7-model_state_fetch_all.py</h6>

<h6>8-model_state_fetch_first.py</h6>

<h6>9-model_state_filter_a.py</h6>

<h6>10-model_state_my_get.py</h6>

<h6>11-model_state_insert.py</h6>

<h6>12-model_state_update_id_2.py</h6>

<h6>13-model_state_delete_a.py</h6>

<h6>14-model_city_fetch_by_state.py</h6>

<h6>model_city.py</h6>
