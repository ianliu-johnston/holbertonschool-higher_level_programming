-- Select cities by state
SELECT cities.id, cities.name WHERE states.name = 'California'  ORDER BY cities.id ASC;
