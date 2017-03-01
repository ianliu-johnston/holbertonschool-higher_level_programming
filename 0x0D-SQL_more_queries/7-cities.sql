-- Creates the database and a table that references another table as a parent 
CREATE DATABASE IF NOT EXISTS hbtn_0d_usa;
CREATE TABLE IF NOT EXISTS cities(
	id INT UNIQUE AUTO_INCREMENT PRIMARY KEY, 
	state_id INT NOT NULL, 
	FOREIGN ID(states_id) REFERENCES hbtn_0d_usa.states(id),
	name VARCHAR(256) NOT NULL
);
