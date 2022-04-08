const inquirer = require("inquirer");

function menuQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: [ "view_all_departments", "view_all_roles", "add_a_department","add a role","add_an_employee","update_an_employee_role"],
      },
    ])
    .then((results) => {
      switch (results.choices) {
        case "view_all_departments":
          view_all_departments();
          break;
        case "view_all_roles":
          view_all_roles();
          break;
        case "add_a_department":
          add_a_department();
          break;

        case "add_a_role":
          add_a_role();
          break;
        case "add_an_employee":
          add_an_employee();
          break;

        case "update_an_employee_role":
          update_an_employee_role();
          break;

        default:
          break;
      }
    });
}

menuQuestions();

function view_all_departments() {
  console.log("hi from all dept");
}

function view_all_roles() {
  console.log("hi from all roles");
}

function add_a_department() {
    console.log("hi from add dept");
}

function add_a_role() {
    console.log("hi from add a role");
}

function add_an_employee() {
    console.log("hi from add an employee");
}

function update_an_employee_role() {
    console.log("hi from update employee");
}
