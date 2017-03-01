-- Adds a .sql file to a database.
CREATE DATABASE IF NOT EXISTS hbtn_0d_tvshows;
USE hbtn_0d_tvshows;
SOURCE hbtn_0d_tvshows.sql
SELECT title, genre_id from tv_shows, tv_show_genres ORDER BY genre_id ASC;
