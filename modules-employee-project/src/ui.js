export class UI {
  constructor() {
    this.employeesList = document.getElementById("employees");
    this.updateButton = document.getElementById("update");
    this.submitButton = document.getElementById("submit-button");
    this.nameInput = document.getElementById("name");
    this.departmentInput = document.getElementById("department");
    this.salaryInput = document.getElementById("salary");
  }

  addEmployeeToUI(employees) {
    let innerElement = "";
    employees.forEach((employee) => {
      innerElement += `
            <tr>                          
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Update</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Delete</a></td>
            </tr>
            `;
    });
    this.employeesList.innerHTML = innerElement;
  }

  clearInputs() {
    this.nameInput.value = "";
    this.departmentInput.value = "";
    this.salaryInput.value = "";
  }

  toggleUpdateButton(element) {
    if (this.updateButton.style.display === "none") {
      this.updateButton.style.display = "block";
      this.submitButton.style.display = "none";
      this.addEmployeeInfoToInputs(element);
    } else {
      this.updateButton.style.display = "none";
      this.submitButton.style.display = "block";
      this.clearInputs();
    }
  }

  addEmployeeInfoToInputs(element) {
    this.nameInput.value = element.children[0].textContent;
    this.departmentInput.value = element.children[1].textContent;
    this.salaryInput.value = element.children[2].textContent;
  }

  deleteEmployeeFromUI(element) {
    element.remove();
  }

  updateEmployeeOnUI(employee, parent) {
    parent.innerHTML = `
    <tr>                          
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Update</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Delete</a></td>
    </tr>
    `;
  }
}
