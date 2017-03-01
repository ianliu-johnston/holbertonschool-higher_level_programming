-- Adds a .sql file to a database.
SOURCE hbtn_0d_tvshows.sql
SELECT title, genre_id from tv_shows, tv_show_genres ORDER BY genre_id ASC;
