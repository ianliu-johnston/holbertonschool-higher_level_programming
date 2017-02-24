-- Lists all records from second_table that meet requirements
SELECT score, name FROM second_table WHERE name IS NOT NULL ORDER BY score DESC;
