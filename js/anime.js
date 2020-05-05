var season;
var year;
var anime_list = [];

var desc0 = false;
var desc1 = false;
var desc2 = false;
var desc3 = false;
var desc4 = false;
var desc5 = false;
var desc6 = false;
var desc7 = false;
var desc8 = false;
var desc9 = false;
var desc10 = false;
var desc11 = false;
var desc12 = false;
var desc13 = false;
var desc14 = false;
var desc15 = false;
var desc16 = false;
var desc17 = false;
var desc18 = false;
var desc19 = false;

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
    document.getElementById("row11").style.display = "none";
    document.getElementById("row12").style.display = "none";
    document.getElementById("row13").style.display = "none";
    document.getElementById("row14").style.display = "none";
    document.getElementById("row15").style.display = "none";
    document.getElementById("row16").style.display = "none";
    document.getElementById("row17").style.display = "none";
    document.getElementById("row18").style.display = "none";
    document.getElementById("row19").style.display = "none";

    document.getElementById("loader").style.display = "inline-block";

    getAnime();
    clearAllDescription();
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

  for(var i = 0; i < 20 ; i++){
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
  document.getElementById('row11').style.display = "-webkit-flex";
  document.getElementById('row12').style.display = "-webkit-flex";
  document.getElementById('row13').style.display = "-webkit-flex";
  document.getElementById('row14').style.display = "-webkit-flex";
  document.getElementById('row15').style.display = "-webkit-flex";
  document.getElementById('row16').style.display = "-webkit-flex";
  document.getElementById('row17').style.display = "-webkit-flex";
  document.getElementById('row18').style.display = "-webkit-flex";
  document.getElementById('row19').style.display = "-webkit-flex";
}

function clearAllDescription(){
  document.getElementById('anime-desc0').style.display = "none";
  document.getElementById('bold-info-desc0').innerHTML = "Show Description >";
  document.getElementById('anime-desc1').style.display = "none";
  document.getElementById('bold-info-desc1').innerHTML = "Show Description >";
  document.getElementById('anime-desc2').style.display = "none";
  document.getElementById('bold-info-desc2').innerHTML = "Show Description >";
  document.getElementById('anime-desc3').style.display = "none";
  document.getElementById('bold-info-desc3').innerHTML = "Show Description >";
  document.getElementById('anime-desc4').style.display = "none";
  document.getElementById('bold-info-desc4').innerHTML = "Show Description >";
  document.getElementById('anime-desc5').style.display = "none";
  document.getElementById('bold-info-desc5').innerHTML = "Show Description >";
  document.getElementById('anime-desc6').style.display = "none";
  document.getElementById('bold-info-desc6').innerHTML = "Show Description >";
  document.getElementById('anime-desc7').style.display = "none";
  document.getElementById('bold-info-desc7').innerHTML = "Show Description >";
  document.getElementById('anime-desc8').style.display = "none";
  document.getElementById('bold-info-desc8').innerHTML = "Show Description >";
  document.getElementById('anime-desc9').style.display = "none";
  document.getElementById('bold-info-desc9').innerHTML = "Show Description >";
  document.getElementById('anime-desc10').style.display = "none";
  document.getElementById('bold-info-desc10').innerHTML = "Show Description >";
  document.getElementById('anime-desc11').style.display = "none";
  document.getElementById('bold-info-desc11').innerHTML = "Show Description >";
  document.getElementById('anime-desc12').style.display = "none";
  document.getElementById('bold-info-desc12').innerHTML = "Show Description >";
  document.getElementById('anime-desc13').style.display = "none";
  document.getElementById('bold-info-desc13').innerHTML = "Show Description >";
  document.getElementById('anime-desc14').style.display = "none";
  document.getElementById('bold-info-desc14').innerHTML = "Show Description >";
  document.getElementById('anime-desc15').style.display = "none";
  document.getElementById('bold-info-desc15').innerHTML = "Show Description >";
  document.getElementById('anime-desc16').style.display = "none";
  document.getElementById('bold-info-desc16').innerHTML = "Show Description >";
  document.getElementById('anime-desc17').style.display = "none";
  document.getElementById('bold-info-desc17').innerHTML = "Show Description >";
  document.getElementById('anime-desc18').style.display = "none";
  document.getElementById('bold-info-desc18').innerHTML = "Show Description >";
  document.getElementById('anime-desc19').style.display = "none";
  document.getElementById('bold-info-desc19').innerHTML = "Show Description >";

  desc0 = false;
  desc1 = false;
  desc2 = false;
  desc3 = false;
  desc4 = false;
  desc5 = false;
  desc6 = false;
  desc7 = false;
  desc8 = false;
  desc9 = false;
  desc10 = false;
  desc11 = false;
  desc12 = false;
  desc13 = false;
  desc14 = false;
  desc15 = false;
  desc16 = false;
  desc17 = false;
  desc18 = false;
  desc19 = false;
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
  if(desc2 == false){
    document.getElementById('anime-desc2').innerHTML = anime_list[2].description;
    document.getElementById('anime-desc2').style.display = "block";
    document.getElementById('bold-info-desc2').innerHTML = "Hide Description >";

    return desc2 = true;
  }
  else{
    document.getElementById('anime-desc2').style.display = "none";
    document.getElementById('bold-info-desc2').innerHTML = "Show Description >";
    return desc2 = false;
  }
}

function showDescription3(){
  if(desc3 == false){
    document.getElementById('anime-desc3').innerHTML = anime_list[3].description;
    document.getElementById('anime-desc3').style.display = "block";
    document.getElementById('bold-info-desc3').innerHTML = "Hide Description >";

    return desc3 = true;
  }
  else{
    document.getElementById('anime-desc3').style.display = "none";
    document.getElementById('bold-info-desc3').innerHTML = "Show Description >";
    return desc3 = false;
  }
}

function showDescription4(){
  if(desc4 == false){
    document.getElementById('anime-desc4').innerHTML = anime_list[4].description;
    document.getElementById('anime-desc4').style.display = "block";
    document.getElementById('bold-info-desc4').innerHTML = "Hide Description >";

    return desc4 = true;
  }
  else{
    document.getElementById('anime-desc4').style.display = "none";
    document.getElementById('bold-info-desc4').innerHTML = "Show Description >";
    return desc4 = false;
  }
}

function showDescription5(){
  if(desc5 == false){
    document.getElementById('anime-desc5').innerHTML = anime_list[5].description;
    document.getElementById('anime-desc5').style.display = "block";
    document.getElementById('bold-info-desc5').innerHTML = "Hide Description >";

    return desc5 = true;
  }
  else{
    document.getElementById('anime-desc5').style.display = "none";
    document.getElementById('bold-info-desc5').innerHTML = "Show Description >";
    return desc5 = false;
  }
}

function showDescription6(){
  if(desc6 == false){
    document.getElementById('anime-desc6').innerHTML = anime_list[6].description;
    document.getElementById('anime-desc6').style.display = "block";
    document.getElementById('bold-info-desc6').innerHTML = "Hide Description >";

    return desc6 = true;
  }
  else{
    document.getElementById('anime-desc6').style.display = "none";
    document.getElementById('bold-info-desc6').innerHTML = "Show Description >";
    return desc6 = false;
  }
}

function showDescription7(){
  if(desc7 == false){
    document.getElementById('anime-desc7').innerHTML = anime_list[7].description;
    document.getElementById('anime-desc7').style.display = "block";
    document.getElementById('bold-info-desc7').innerHTML = "Hide Description >";

    return desc7 = true;
  }
  else{
    document.getElementById('anime-desc7').style.display = "none";
    document.getElementById('bold-info-desc7').innerHTML = "Show Description >";
    return desc7 = false;
  }
}

function showDescription8(){
  if(desc8 == false){
    document.getElementById('anime-desc8').innerHTML = anime_list[8].description;
    document.getElementById('anime-desc8').style.display = "block";
    document.getElementById('bold-info-desc8').innerHTML = "Hide Description >";

    return desc8 = true;
  }
  else{
    document.getElementById('anime-desc8').style.display = "none";
    document.getElementById('bold-info-desc8').innerHTML = "Show Description >";
    return desc8 = false;
  }
}

function showDescription9(){
  if(desc9 == false){
    document.getElementById('anime-desc9').innerHTML = anime_list[9].description;
    document.getElementById('anime-desc9').style.display = "block";
    document.getElementById('bold-info-desc9').innerHTML = "Hide Description >";

    return desc9 = true;
  }
  else{
    document.getElementById('anime-desc9').style.display = "none";
    document.getElementById('bold-info-desc9').innerHTML = "Show Description >";
    return desc9 = false;
  }
}

function showDescription10(){
  if(desc10 == false){
    document.getElementById('anime-desc10').innerHTML = anime_list[10].description;
    document.getElementById('anime-desc10').style.display = "block";
    document.getElementById('bold-info-desc10').innerHTML = "Hide Description >";

    return desc10 = true;
  }
  else{
    document.getElementById('anime-desc10').style.display = "none";
    document.getElementById('bold-info-desc10').innerHTML = "Show Description >";
    return desc10 = false;
  }
}

function showDescription11(){
  if(desc11 == false){
    document.getElementById('anime-desc11').innerHTML = anime_list[11].description;
    document.getElementById('anime-desc11').style.display = "block";
    document.getElementById('bold-info-desc11').innerHTML = "Hide Description >";

    return desc11 = true;
  }
  else{
    document.getElementById('anime-desc11').style.display = "none";
    document.getElementById('bold-info-desc11').innerHTML = "Show Description >";
    return desc11 = false;
  }
}

function showDescription12(){
  if(desc12 == false){
    document.getElementById('anime-desc12').innerHTML = anime_list[12].description;
    document.getElementById('anime-desc12').style.display = "block";
    document.getElementById('bold-info-desc12').innerHTML = "Hide Description >";

    return desc12 = true;
  }
  else{
    document.getElementById('anime-desc12').style.display = "none";
    document.getElementById('bold-info-desc12').innerHTML = "Show Description >";
    return desc12 = false;
  }
}

function showDescription13(){
  if(desc13 == false){
    document.getElementById('anime-desc13').innerHTML = anime_list[13].description;
    document.getElementById('anime-desc13').style.display = "block";
    document.getElementById('bold-info-desc13').innerHTML = "Hide Description >";

    return desc13 = true;
  }
  else{
    document.getElementById('anime-desc13').style.display = "none";
    document.getElementById('bold-info-desc13').innerHTML = "Show Description >";
    return desc13 = false;
  }
}

function showDescription14(){
  if(desc14 == false){
    document.getElementById('anime-desc14').innerHTML = anime_list[14].description;
    document.getElementById('anime-desc14').style.display = "block";
    document.getElementById('bold-info-desc14').innerHTML = "Hide Description >";

    return desc14 = true;
  }
  else{
    document.getElementById('anime-desc14').style.display = "none";
    document.getElementById('bold-info-desc14').innerHTML = "Show Description >";
    return desc14 = false;
  }
}

function showDescription15(){
  if(desc15 == false){
    document.getElementById('anime-desc15').innerHTML = anime_list[15].description;
    document.getElementById('anime-desc15').style.display = "block";
    document.getElementById('bold-info-desc15').innerHTML = "Hide Description >";

    return desc15 = true;
  }
  else{
    document.getElementById('anime-desc15').style.display = "none";
    document.getElementById('bold-info-desc15').innerHTML = "Show Description >";
    return desc15 = false;
  }
}

function showDescription16(){
  if(desc16 == false){
    document.getElementById('anime-desc16').innerHTML = anime_list[16].description;
    document.getElementById('anime-desc16').style.display = "block";
    document.getElementById('bold-info-desc16').innerHTML = "Hide Description >";

    return desc16 = true;
  }
  else{
    document.getElementById('anime-desc16').style.display = "none";
    document.getElementById('bold-info-desc16').innerHTML = "Show Description >";
    return desc16 = false;
  }
}

function showDescription17(){
  if(desc17 == false){
    document.getElementById('anime-desc17').innerHTML = anime_list[17].description;
    document.getElementById('anime-desc17').style.display = "block";
    document.getElementById('bold-info-desc17').innerHTML = "Hide Description >";

    return desc17 = true;
  }
  else{
    document.getElementById('anime-desc17').style.display = "none";
    document.getElementById('bold-info-desc17').innerHTML = "Show Description >";
    return desc17 = false;
  }
}

function showDescription18(){
  if(desc18 == false){
    document.getElementById('anime-desc18').innerHTML = anime_list[18].description;
    document.getElementById('anime-desc18').style.display = "block";
    document.getElementById('bold-info-desc18').innerHTML = "Hide Description >";

    return desc18 = true;
  }
  else{
    document.getElementById('anime-desc18').style.display = "none";
    document.getElementById('bold-info-desc18').innerHTML = "Show Description >";
    return desc17 = false;
  }
}

function showDescription19(){
  if(desc19 == false){
    document.getElementById('anime-desc19').innerHTML = anime_list[19].description;
    document.getElementById('anime-desc19').style.display = "block";
    document.getElementById('bold-info-desc19').innerHTML = "Hide Description >";

    return desc19 = true;
  }
  else{
    document.getElementById('anime-desc19').style.display = "none";
    document.getElementById('bold-info-desc19').innerHTML = "Show Description >";
    return desc17 = false;
  }
}

function showHome() {
  window.location.href = 'https://stackoverflow.com/questions/1226714/how-to-get-the-browser-to-navigate-to-url-in-javascript';
}

/**
  Need to:
    - Output all rows (DONE)
    - change URL (LATER)
    - filters?
    - show description (DONE)
    - when user clicks Seasonime it goes to home page (DONE)
    - sign in / log in account
    - Add to list?
*/
