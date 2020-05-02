var season;
var year;
var anime_list = [];

function getFormInput() {
  var input_s = document.getElementById("season");
  season = input_s.options[input_s.selectedIndex].value;

  var input_y = document.getElementById("year");
  year = input_y.options[input_y.selectedIndex].value;

  console.log(season);
  console.log(year);

  getAnime();

}

function getAnime(){
  const jikan_url = "https://private-anon-4d8c741b7b-jikan.apiary-proxy.com/v3/season/" + year + "/" + season;

  // Fetch online JSON files from a given URL
  fetch(jikan_url).then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      getAnimeData(data);
    })
    .catch(err => {
        // Do something for an error here
    })
}

function getAnimeData(data){
  anime_list = [];
  for(var i = 0; i < 20; i++){
    var name = data.anime[i].title;
    var score = data.anime[i].score;

    var genres = data.anime[i].genres;
    var genre_list = [];
    for(var j = 0; j < genres.length; j++){
    var genre = data.anime[i].genres[j].name;
    genre_list.push(genre);
  }

    var description = data.anime[i].synopsis;
    var episodes = data.anime[i].episodes;
    var anime_image = data.anime[i].image_url;

    var air_date = data.anime[i].airing_start;
    air_date = air_date.split('T')[0]; // takes off rest of date string taking 'Y'
    var month = (air_date.split('-')[1]);
    if(month.charAt(0) == 0){
      month = month.charAt(1);
    }
    else{
      month = month;
    }
    var day = air_date.split('-')[2];
    var year = air_date.split('-')[0];
    var month_list = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    month = month_list[month - 1];
    air_date = month + " " + day + ", " + year;

    anime_list.push({
      name: name,
      score: score,
      genres: genre_list,
      description: description,
      episodes: episodes,
      air_date: air_date,
      image: anime_image
    });
  }
  anime_list.sort(compare);

  console.log(anime_list);
}

// compare() sorts the anime_list array by highest to lowest score
function compare(a, b) {
  const scoreA = a.score;
  const scoreB = b.score;

  let comparison = 0;
  if (scoreA > scoreB) {
    comparison = 1;
  } else if (scoreA < scoreB) {
    comparison = -1;
  }
  return comparison * -1;
}
