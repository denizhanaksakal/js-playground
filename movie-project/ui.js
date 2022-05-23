class UI {
  constructor() {}

  static addMovieToUI(movie) {
    const list = document.querySelector("#movies");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src=${movie.url} class="img-fluid img-thumbnail"></td>
        <td>${movie.title}</td>
        <td>${movie.director}</td>
        <td><a href="#" id="delete-movie" class="btn btn-danger">X</a></td>
    `;
    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = message;
    const form = document.querySelector(".card-body");
    form.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#director").value = "";
    document.querySelector("#url").value = "";
  }

  static removeMovieFromUI(element) {
    element.parentElement.parentElement.remove();
  }
  
  static removeAllMovies() {
    const list = document.querySelector("#movies");
    //list.innerHTML = "";//slow method
    while (list.hasChildNodes !== null) {
      list.firstElementChild.remove();
    }
  }
}
