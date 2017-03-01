-- lists all cities contained in the DB
SELECT cities.id, cities.name, states.name
FROM cities JOIN states 
ON cities.id = states.id
ORDER BY cities.id ASC;
