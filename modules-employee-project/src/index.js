import { Request } from "./request";
import { UI } from "./ui";

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeBtn = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;
eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", getAllEmployees);
  form.addEventListener("submit", addEmployee);
  employeesList.addEventListener("click", UpdateOrDelete);
  updateEmployeeBtn.addEventListener("click", updateEmployee);
}

function addEmployee(e) {
  e.preventDefault();
  const employeeName = nameInput.value.trim();
  const employeeDepartment = departmentInput.value.trim();
  const employeeSalary = salaryInput.value.trim();
  if (
    employeeName === "" ||
    employeeDepartment === "" ||
    employeeSalary === ""
  ) {
    alert("Please fill in all fields");
  } else {
    request
      .postRequest({
        name: employeeName,
        department: employeeDepartment,
        salary: Number(employeeSalary),
      })
      .then((employee) => {
        //ui.addEmployeeToUI(employee);
      })
      .catch((err) => console.log(err));
  }
  ui.clearInputs();
}

function getAllEmployees() {
  request
    .getRequest()
    .then((employees) => {
      ui.addEmployeeToUI(employees);
    })
    .catch((err) => console.log(err));
}

function UpdateOrDelete(e) {
  if (e.target.id === "update-employee") {
    updateEmployeeController(e.target.parentElement.parentElement);
  } else if (e.target.id === "delete-employee") {
    deleteEmployee(e.target);
  }
}

function updateEmployeeController(targetElement) {
  ui.toggleUpdateButton(targetElement);
  if (updateState === null) {
    updateState = {
      updateId: targetElement.children[3].textContent,
      updateParent: targetElement,
    };
  } else {
    updateState = null;
  }
}

function deleteEmployee(targetElement) {
  const id =
    targetElement.parentElement.previousElementSibling.previousElementSibling
      .textContent;
  request
    .deleteRequest(id)
    .then((message) => {
      console.log(message);
      ui.deleteEmployeeFromUI(targetElement.parentElement.parentElement);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateEmployee() {
  if (updateState) {
    const data = {
      name: nameInput.value.trim(),
      department: departmentInput.value.trim(),
      salary: salaryInput.value.trim(),
    };
    request
      .putRequest(updateState.updateId, data)
      .then((updatedEmployee) => {
        ui.updateEmployeeOnUI(updatedEmployee, updateState.updateParent);
        ui.clearInputs();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// request
//   .getRequest()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// request
//   .postRequest({
//     name: "Kubilay",
//     department: "IK",
//     salary: 1000,
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// request
//   .putRequest(1, {
//     name: "Terry",
//     department: "IK",
//     salary: 1000,
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// request
//   .deleteRequest(1)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
