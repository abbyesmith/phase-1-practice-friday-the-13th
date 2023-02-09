//Gloabal Variables
let movieData;
let currentMovie;
//Fetch
 
fetch("http://localhost:3000/movies")
  .then(response => response.json()
  .then(json => {
    movieData = json;
    //movieData is a Gloabal Variable, defined at the top.

    movieData.forEach(movie => {
      createMovieImageInBar(movie)
      //this is a function that will be built out later.
      //createMovieImageInBar(movie) builds the poster of each movie
    })
    showMovieDetails(movieData[0])
    //This function brings up the movie details the movieData[0] brings up the first poster on default when the page is loaded.
    //Use the Gloabal variable movieData
    hookUpWatchedButton()
    hookUpBloodForm()
  }))

//Function - Show the movie posters in the Nav bar
function createMovieImageInBar(movie) {
  //remember, this function was already called above (ln 14) FOREACH
  let movieList = document.querySelector("#movie-list")
  //movieList could be a different word, just decided on by the coder.
  //(#movie-list) is the id from line 15 in the HTML file.
  //find the element that will contain the movie posters. (in this case, a <nav>
  
  let movieImage = document.createElement("img")
  //movieImage could be a different word, just decided on by the coder.
  //"img" is used to create an image element.
  movieImage.src = movie.image;
  //here we are useing the "src" attribute to create an image element.
  //movie.image comes from the JSON file, like line 8 in db.json
  movieList.appendChild(movieImage);
  //appending child elements to the <nav> element so all the movieimages show up.

  movieImage.addEventListener("click", () => {
    showMovieDetails(movie);
    //this Event Listener is used to show the movie details upon click
    //showMovieDetails(movie) will need to be another function (built out below)
  })
}
/////////////One of the movie posters is not showing up. Ask about this in the AM

//Function - Show the movie details
function showMovieDetails(movie) {
  //This function was already called with the parameter movie in ln 41
  //Be sure to add this function to the fetch call
  currentMovie = movie;
  //add currentMovie to the global variable. Set it equal to the parameter called in the function.

  //build out the variables needed to show when the poster is clicked:
  let detailTitle = document.querySelector("#title")
  let detailImage = document.querySelector("#detail-image")
  let detailDescription = document.querySelector("#description");
  let detailYearReleased = document.querySelector("#year-released");
  let watchedButton = document.querySelector("#watched");
  let bloodAmount = document.querySelector("#amount");
  //the let "detailTitle" etc is your choice in naming. 
  //The ("#title") is from the HTML file id (like line 22)
  //id = #, class = .

  detailTitle.textContent = movie.title;
  //detailTitle is the variable name just created on ln 56, .textContent b/c it's words
  //movie is from the parameter passed in the function (ln 49)
  //.title is from the JSON file, like line 5 in db.json
  detailImage.src = movie.image
  //.src is used in the HTML file to create an image element (ln 29)
  detailDescription.textContent = movie.description;
  detailYearReleased.textContent = movie.release_year;
  watchedButton.textContent = movie.watched ? "Watched" : "Unwatched"
  //here's an terenary statement. If "TRUE" then the button will say "Watched". If "FALSE", the button will say "UnWatched"
  bloodAmount.textContent = movie.blood_amount;
}

//Function - Watched/Unwatched Button
function hookUpWatchedButton() {
  let watchedButton = document.querySelector("#watched");
  // watchedButton is from the variables defined around ln 60
  //#watched is from the HTML file id (ln 27)
  watchedButton.addEventListener("click", () => {
    currentMovie.watched = !currentMovie.watched;
    watchedButton.textContent = currentMovie.watched ? "Watched" : "Unwatched"
    //In this Event Listener, watchedButton.textContent will be "Watched" or "UnWatched"
    //When clicked, the currentMovie.watched result will turn into the opposite (true becomes false & vice versa)
    //The terenary statment says If True, the button will say "Watched". If False, the button will say "UnWatched
  })
  //REMEMBER to add this function to the fetch call
}

//Function - Add blood drops
function hookUpBloodForm() {
  const bloodForm = document.querySelector("#blood-form");
  //this is a new variable that shows the amount of likes/blood drops the movie has
  //"#blood-form" is from the HTML file id (ln 35)
  bloodForm.addEventListener("submit", (event) => {
    //Event listener to allow for the blood to add the extra clicks
    
    event.preventDefault();
    
    const amountToAdd = event.target["blood-amount"].value;
    //"amountToAdd" is a varialbe, name maded up
    //"blood-amount" is from the HTML file (ln 36)
    //.value is to ensure the value is a number
    currentMovie.blood_amount += parseInt(amountToAdd);
    //currentMovie is the global variable
    //.blood_amount is the amount originally in the json file (ln 10)
    //+= adds the amountToAdd (This is the value that comes from the form)

    document.querySelector("#amount").textContent = currentMovie.blood_amount;
    //replacing the old amount of blood drops with the new amount

    event.target.reset();
    //resets the form so the form input is blank
  })
  //REMEMBER to add this function to the fetch call
}