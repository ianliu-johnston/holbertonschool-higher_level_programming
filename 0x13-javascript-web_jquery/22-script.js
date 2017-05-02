$(document).ready(function(){
  $.get('http://swapi.co/api/films?format=json', function(data){
    const results = eval(data).results;
    for (var key in results)
      $("#list_movies").append("<LI>" + results[key].title+ "</LI>");
  });
});
