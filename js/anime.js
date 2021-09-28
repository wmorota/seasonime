var season;
var year;
var anime_list = [];

var desc0 = desc1 = desc2 = desc3 = desc4 = desc5 = desc6 = desc7 = desc8 = desc9 =  false;
var desc10 = desc11 = desc12 = desc13 = desc14 = desc15 = desc16 = desc17 = desc18 = desc19 =  false;

// getHomeFormInput() grabs user input from the home page to list page
function getHomeFormInput() {
  var input_s = document.getElementById("season");
  season = input_s.options[input_s.selectedIndex].value;

  var input_y = document.getElementById("year");
  year = input_y.options[input_y.selectedIndex].value;

  if(year == 2022)  {
    alert("The animes in this season have not started airing yet 🥴 Please try again.");
  }
  else{
    document.getElementById('home-page').style.display = "none";
    document.getElementById("loader").style.display = "inline-block";

    document.getElementById("list-season").value = season;
    document.getElementById("list-year").value = year;

    getAnime();
  }
}

// getListFormInput() grabs user input from the list page to update on the same page
function getListFormInput() {
  var input_s = document.getElementById("list-season");
  season = input_s.options[input_s.selectedIndex].value;

  var input_y = document.getElementById("list-year");
  year = input_y.options[input_y.selectedIndex].value;

  if(year == 2022)  {
    alert("The animes in this season have not started airing yet 🥴 Please try again.");
  }
  else{
    document.getElementById('header').style.display = "none";

    // HIDES all 20 rows
    for(var i = 0; i < 20; i++){
      var row_to_hide = "row" + i;
      document.getElementById(row_to_hide).style.display = "none";
    }

    document.getElementById("loader").style.display = "inline-block";

    getAnime();
    clearAllDescription();
  }
}

// getAnime() grabs all needed data in the form of an online JSON file using Jikan API
function getAnime(){
  var proxy_url = "https://cors-anywhere.herokuapp.com/";
  const jikan_url = "{JIKAN API}";

  // Fetch online JSON files from a given URL
  fetch(proxy_url + jikan_url).then(response => {
      return response.json()
    })
    .then(data => {
      getAnimeData(data);
    })
    .catch(err => {
        return err;
    })
}

// getAnimeData() grabs all elements and data from the JSON file and organizes it in an array
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

// showList() outputs all needed data on the list page
function showList(){
  document.getElementById("loader").style.display = "none";
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#fffafa";

  document.getElementById('list-page').style.display = "block";
  document.getElementById('list-page-nav').style.display = "block";

  document.getElementById('header').innerHTML = season + " " + year ;
  document.getElementById('header').style.display = "block";

  for(var i = 0; i < 20 ; i++){
    document.getElementById('anime-name' + i).innerHTML = anime_list[i].name;
    document.getElementById('anime-genre' + i).innerHTML = (anime_list[i].genres).join(" / ");
    document.getElementById('anime-sd' + i).innerHTML = " " + anime_list[i].air_date;
    document.getElementById('anime-ep' + i).innerHTML = " " + anime_list[i].episodes;
    document.getElementById('mobile-anime-score' + i).innerHTML = " " + anime_list[i].score;
    document.getElementById('anime-score' + i).innerHTML = " " + anime_list[i].score;
    document.getElementById('anime-img' + i).src = anime_list[i].image;

    // SHOWS all 20 rows (-webkit-flex)
    var row_to_show = "row" + i;
    document.getElementById(row_to_show).style.display = "-webkit-flex";
  }

}

// clearAllDescription() clears each anime's description when page is reloaded or when user searches for a new season
function clearAllDescription(){
  for(var i = 0; i < 20; i++){
    var hide_description_row = "anime-desc" + i;
    var set_description_label = "bold-info-desc" + i;

    document.getElementById(hide_description_row).style.display = "none";
    document.getElementById(set_description_label).innerHTML = "Show Description >";
  }

  desc0 = desc1 = desc2 = desc3 = desc4 = desc5 = desc6 = desc7 = desc8 = desc9 =  false;
  desc10 = desc11 = desc12 = desc13 = desc14 = desc15 = desc16 = desc17 = desc18 = desc19 =  false;
}

// showDescription() displays / hides each anime's description when user clicks on "Show Description" or "Hide Description"
function showDescription(show_description_id){
  var desc_list = [desc0, desc1, desc2, desc3, desc4, desc5, desc6, desc7, desc8, desc9, 
    desc10, desc11, desc12, desc13, desc14, desc15, desc16, desc17, desc18, desc19]
  
  var split_string_list = show_description_id.split('c')
  var id = parseInt(split_string_list[1])

  var anime_desc_id = 'anime-desc' + id;
  var bold_info_desc_id = 'bold-info-desc' + id;

  if(desc_list[id] == false){
    document.getElementById(anime_desc_id).innerHTML = anime_list[id].description;
    document.getElementById(anime_desc_id).style.display = "block";
    document.getElementById(bold_info_desc_id).innerHTML = "Hide Description >";
    return eval("desc" + id + " = " + true);
  }
  else{
    document.getElementById(anime_desc_id).style.display = "none";
    document.getElementById(bold_info_desc_id).innerHTML = "Show Description >";
    return eval("desc" + id + " = " + false);
  }

}

// showHome() returns the user to the home page of Seasonime
function showHome() {
  window.location.href = 'https://seasonime.web.app/';
}
