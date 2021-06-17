$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
       let searchText = $('#searchText').val();
       getMovies(searchText); //passing searchText into function getMovies
        e.preventDefault(); //prevent the form from submitting
    });
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com?s='+ searchText+'&apikey=thewdb')   //this returns a promise so we use .then
    .then((response) => {
        //if everthing goes well this function runs to get data
        console.log(response);
        let movies = response.data.Search; //puts the array of movies into this variable
        let output = ' '; //empty because we're going to loop through the array and append each movie onto this variable
        $.each(movies, (index, movie) => {// we're going to acces each movie with this loop and display the output
            output += `
            <div class ="col-md-3">
                <div class="well text-center">
                <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class ="btn btn-primary" href="#">Movie Details</a> 
               </div>
            </div>            
            `;
            //the movie.imdbID has to be in quotes or the ID will be seen as a variable
        }); 
        $('#movies').html(output);
    })
    .catch((err) => {
        //if not then we use catch to catch any errors
console.log(err);
    });
}
function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com?i='+ movieId+'&apikey=thewdb')   //this returns a promise so we use .then
    .then((response) => {
        //if everthing goes well this function runs to get data
        console.log(response);
        let movie =  response.data;
        let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

        $('#movie').html(output);
    })
    .catch((err) =>{
        console.log(err);
    });
}