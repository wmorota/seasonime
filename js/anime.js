var season;
var year;

function getFormInput() {
  var input_s = document.getElementById("season");
  season = input_s.options[input_s.selectedIndex].value;

  var input_y = document.getElementById("year");
  year = input_y.options[input_y.selectedIndex].value;

  console.log(season);
  console.log(year);

}

function getAnime(){
  const jikan_url = "https://private-anon-4d8c741b7b-jikan.apiary-proxy.com/v3/season/" + year + "/" + season;

  // Fetch online JSON files from a given URL
  fetch(jikan_url).then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
        // Do something for an error here
    })

}
