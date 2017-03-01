-- Select results of the search if not null and the count of each instancel
SELECT tv_genres.name AS `genre`, COUNT(*) AS `number_shows`
FROM tv_shows JOIN tv_show_genres
ON tv_shows.id = tv_show_genres.show_id
WHERE tv_show_genres.show_id IS NOT NULL
ORDER BY `number_shows` DESC;
