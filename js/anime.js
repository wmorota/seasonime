var season;
var year;
var anime_list = [];

var desc0 = false;
var desc1 = false;

function getHomeFormInput() {
  var input_s = document.getElementById("season");
  season = input_s.options[input_s.selectedIndex].value;

  var input_y = document.getElementById("year");
  year = input_y.options[input_y.selectedIndex].value;

  if((season == "summer" && year == 2020) || (season == "fall" && year == 2020))
  {
    alert("The animes in this season have not started airing yet 🥴 Please try again.");
  }
  else{
    console.log(season);
    console.log(year);

    document.getElementById('home-page').style.display = "none";
    document.getElementById("loader").style.display = "inline-block";

    document.getElementById("list-season").value = season;
    document.getElementById("list-year").value = year;


    getAnime();
  }
}

function getListFormInput() {
  var input_s = document.getElementById("list-season");
  season = input_s.options[input_s.selectedIndex].value;

  var input_y = document.getElementById("list-year");
  year = input_y.options[input_y.selectedIndex].value;

  if((season == "summer" && year == 2020) || (season == "fall" && year == 2020))
  {
    alert("The animes in this season have not started airing yet 🥴 Please try again.");
  }
  else{
    console.log(season);
    console.log(year);

    document.getElementById('header').style.display = "none";
    document.getElementById("row0").style.display = "none";
    document.getElementById("row1").style.display = "none";
    document.getElementById("row2").style.display = "none";
    document.getElementById("row3").style.display = "none";
    document.getElementById("row4").style.display = "none";
    document.getElementById("row5").style.display = "none";
    document.getElementById("row6").style.display = "none";
    document.getElementById("row7").style.display = "none";
    document.getElementById("row8").style.display = "none";
    document.getElementById("row9").style.display = "none";
    document.getElementById("row10").style.display = "none";

    document.getElementById("loader").style.display = "inline-block";

    getAnime();
  }
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
  season = data.season_name;

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
    if(episodes == null){
      episodes = "Still in production"
    }

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

  setTimeout(showList,500);
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

function showList(){
  document.getElementById("loader").style.display = "none";
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#fffafa";

  document.getElementById('list-page').style.display = "block";
  document.getElementById('list-page-nav').style.display = "block";

  document.getElementById('header').innerHTML = season + " " + year ;
  document.getElementById('header').style.display = "block";

  for(var i = 0; i < 11 ; i++){
    document.getElementById('anime-name' + i).innerHTML = anime_list[i].name;
    document.getElementById('anime-genre' + i).innerHTML = (anime_list[i].genres).join(" / ");
    document.getElementById('anime-sd' + i).innerHTML = " " + anime_list[i].air_date;
    document.getElementById('anime-ep' + i).innerHTML = " " + anime_list[i].episodes;
    document.getElementById('mobile-anime-score' + i).innerHTML = " " + anime_list[i].score;
    document.getElementById('anime-score' + i).innerHTML = " " + anime_list[i].score;
    document.getElementById('anime-img' + i).src = anime_list[i].image;

  }

  document.getElementById('row0').style.display = "-webkit-flex";
  document.getElementById('row1').style.display = "-webkit-flex";
  document.getElementById('row2').style.display = "-webkit-flex";
  document.getElementById('row3').style.display = "-webkit-flex";
  document.getElementById('row4').style.display = "-webkit-flex";
  document.getElementById('row5').style.display = "-webkit-flex";
  document.getElementById('row6').style.display = "-webkit-flex";
  document.getElementById('row7').style.display = "-webkit-flex";
  document.getElementById('row8').style.display = "-webkit-flex";
  document.getElementById('row9').style.display = "-webkit-flex";
  document.getElementById('row10').style.display = "-webkit-flex";
}

function showDescription0(){
  if(desc0 == false){
    document.getElementById('anime-desc0').innerHTML = anime_list[0].description;
    document.getElementById('anime-desc0').style.display = "block";
    document.getElementById('bold-info-desc0').innerHTML = "Hide Description >";

    return desc0 = true;
  }
  else{
    document.getElementById('anime-desc0').style.display = "none";
    document.getElementById('bold-info-desc0').innerHTML = "Show Description >";
    return desc0 = false;
  }
}

function showDescription1(){
  if(desc1 == false){
    document.getElementById('anime-desc1').innerHTML = anime_list[1].description;
    document.getElementById('anime-desc1').style.display = "block";
    document.getElementById('bold-info-desc1').innerHTML = "Hide Description >";

    return desc1 = true;
  }
  else{
    document.getElementById('anime-desc1').style.display = "none";
    document.getElementById('bold-info-desc1').innerHTML = "Show Description >";
    return desc1 = false;
  }
}

function showDescription2(){
  if(desc1 == false){
    document.getElementById('anime-desc1').innerHTML = anime_list[1].description;
    document.getElementById('anime-desc1').style.display = "block";
    document.getElementById('bold-info-desc1').innerHTML = "Hide Description >";

    return desc1 = true;
  }
  else{
    document.getElementById('anime-desc1').style.display = "none";
    document.getElementById('bold-info-desc1').innerHTML = "Show Description >";
    return desc1 = false;
  }
}

function showHome() {
  window.location.href = 'https://stackoverflow.com/questions/1226714/how-to-get-the-browser-to-navigate-to-url-in-javascript';
}

/**
  Need to:
    - Output all rows
    - change URL
    - show description
    - when user clicks Seasonime it goes to home page (DONE)
    - Add to list?
*/
