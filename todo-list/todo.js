//all elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();
//load all event listeners
function eventListener() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadTodoToUI);
  secondCardBody.addEventListener("click", deleteTodoFromUI);
  filter.addEventListener("keyup", filterTodo);
  clearButton.addEventListener("click", clearAllTodo);
}
function addTodo(e) {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    showAlert("danger", "Please add a todo");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Added successfully");
  }
  e.preventDefault();
}

function filterTodo(e) {
  const filterValue = filter.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function (item) {
    const text = item.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      item.setAttribute("style", "display:none !important");
    } else {
      item.setAttribute("style", "display:block");
    }
  });
}

function clearAllTodo(e) {
  if (confirm("Clear all todos?")) {
    //slow solution
    // todoList.innerHTML = "";
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    window.localStorage.removeItem("todos");
  }
}

//add todo to ui
function addTodoToUI(newTodo) {
  //create li element
  const liElement = document.createElement("li");
  liElement.className = "list-group-item d-flex justify-content-between";
  liElement.appendChild(document.createTextNode(newTodo));
  //create a element
  const aElement = document.createElement("a");
  aElement.href = "#";
  aElement.className = "delete-item";
  aElement.innerHTML = '<i class="fa fa-remove"></i>';
  liElement.appendChild(aElement);

  todoList.appendChild(liElement);
  todoInput.value = "";
}

function loadTodoToUI() {
  let todos = getTodoFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function deleteTodoFromUI(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo deleted");
  }
}

function deleteTodoFromStorage(deleteTodo) {
  let todos = getTodoFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodoFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos;
  todos = getTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const divElement = document.createElement("div");
  divElement.className = `alert alert-${type}`;
  divElement.textContent = message;
  firstCardBody.appendChild(divElement);
  window.setTimeout(function () {
    divElement.remove();
  }, 3000);
}
