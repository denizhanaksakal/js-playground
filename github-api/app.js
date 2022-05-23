const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new GitHub();
const ui = new UI();

eventListeners();

function eventListeners() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {
  e.preventDefault();
  const username = nameInput.value.trim();
  if (username === "") {
    alert("Please enter a username");
    return;
  } else {
    github
      .getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
          ui.showError("User not found");
        } else {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUserToStorage(username);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repos);
        }
      })
      .catch((err) => {
        ui.showError(err);
      });
    ui.clearInput();
  }
}

function clearAllSearched() {
  if (confirm("Are you sure you want to clear all users?")) {
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUI();
  }
}
function getAllSearched() {
  let users = Storage.getSearchedUsersFromStorage();
  let innerElement = "";
  users.forEach((user) => {
    innerElement += `<li class="list-group-item">${user}</li>`;
  });
  lastUsers.innerHTML = innerElement;
}
