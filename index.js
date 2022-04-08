const inquirer = require("inquirer");

function menuQuestions() {
  inquirer
    .prompt([
      {
        type: "expand",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: [
          {
            key: "a",
            value: "view_all_departments",
          },
          {
            key: "b",
            value: "view_all_roles",
          },
          {
            key: "c",
            value: "add_a_department",
          },
          {
            key: "d",
            value: "add a role",
          },
          {
            key: "e",
            value: "add an employee",
          },
          {
            key: "f",
            value: "update an employee role",
          },
        ],
      },
    ])
    .then((option) => {
      switch (option) {
        case "view all departments":
          view_all_departments();
          break;
        case "view all roles":
          view_all_roles();
          break;
        case "add a department":
          add_a_department();
          break;

        case "add a role":
            add_a_role();
            break;
        case "add an employee":
            add_an_employee();
            break;

        case "update an employee role":
            update_an_employee_role();
            break;
            
        default:
          break;
      }
    });
}


function view_all_departments (){
 console.log("hi from all dept");
};

function view_all_roles(){
  console.log("hi from all roles");  
};

function add_a_department(){

};

function add_a_role(){

};

function add_an_employee(){

};

function update_an_employee_role(){

};