class Storage {
  constructor() {}

  static addMovieToStorage(movie) {
    const movies = this.getMoviesFromStorage();
    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  static getMoviesFromStorage() {
    let movies;
    if (localStorage.getItem("movies") === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem("movies"));
    }
    return movies;
  }

  static removeMovieFromStorage(movieTitle) {
    const movies = this.getMoviesFromStorage();
    movies.forEach((movie, index) => {
      if (movie.title === movieTitle) {
        movies.splice(index, 1);
      }
    });

    localStorage.setItem("movies", JSON.stringify(movies));
  }

  static removeAllFromStorage() {
    localStorage.removeItem("movies");
  }
}
