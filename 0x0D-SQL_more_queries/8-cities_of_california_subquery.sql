-- Select cities by state
SELECT id, name FROM cities WHERE states_id = (SELECT id FROM states WHERE name = 'California' )ORDER BY cities.id ASC;
