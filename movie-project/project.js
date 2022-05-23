const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clear-films");

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addMovie);
  document.addEventListener("DOMContentLoaded", loadAllMovies);
  secondCardBody.addEventListener("click", removeMovie);
  clearButton.addEventListener("click", removeAllMovies);
}

function loadAllMovies() {
  let movies = Storage.getMoviesFromStorage();

  movies.forEach((movie) => {
    UI.addMovieToUI(movie);
  });
}

function addMovie(e) {
  e.preventDefault();

  // Get the values from the form
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  // Validate
  if (title === "" || director === "" || url === "") {
    // Error
    UI.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    // Create movie
    const movie = new Movie(title, director, url);

    // Add movie to UI
    UI.addMovieToUI(movie);

    // Add movie to local Storage
    Storage.addMovieToStorage(movie);

    // Clear fields
    UI.clearFields();

    // Show success message
    UI.showAlert("Movie added!", "alert alert-success");
  }
}

function removeMovie(e) {
  if (e.target.id === "delete-movie") {
    UI.removeMovieFromUI(e.target);
    Storage.removeMovieFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
    UI.showAlert("Movie removed!", "alert alert-success");
  }
}

function removeAllMovies() {
  if (confirm("Are you sure?")) {
    UI.removeAllMovies();
    Storage.removeAllFromStorage();
    UI.showAlert("All movies removed!", "alert alert-success");
  }
}
