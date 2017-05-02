$(document).ready(function () {
  $.get('http://swapi.co/api/films?format=json', function (data) {
    for (let key in data.results) { $('#list_movies').append('<LI>' + data.results[key].title + '</LI>'); }
  });
});
