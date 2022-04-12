const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
//const db = require("./db");

const connection = mysql.createConnection({
  host: "localHost",
  user: "root",
  database: "employee_tracker_db",
  password: "100%Capable();",
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    menuQuestions();
  }
});

function menuQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: [
          "view_all_departments",
          "view_all_roles",
          "view_all_employees",
          "add_a_department",
          "add_a_role",
          "add_an_employee",
          "update_an_employee_role",
        ],
      },
    ])
    .then((results) => {
      switch (results.startQuestion) {
        case "view_all_departments":
          view_all_departments();
          break;
        case "view_all_roles":
          view_all_roles();
          break;
        case "view_all_employees":
          view_all_employees();
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
          quit();
          break;
      }
    });
}

function view_all_departments() {
  connection.query("SELECT * FROM department", function (error, results) {
    if (error) {
      throw error;
    } else {
      console.table(results);
      menuQuestions();
    }
  });
}

function view_all_roles() {
  connection.query("SELECT * FROM role", function (error, results) {
    if (error) {
      throw error;
    } else {
      console.table(results);
      menuQuestions();
    }
  });
}

function view_all_employees() {
  connection.query("SELECT * FROM employee", function (error, results) {
    if (error) {
      throw error;
    } else {
      console.table(results);
      menuQuestions();
    }
  });
}

function add_a_department() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the department: ",
      name: "department",
    })
    .then(function (newDept) {
      connection.query(
        `INSERT INTO department (name) VALUES ('${newDept.department}')`,
        function (error) {
          if (error) {
            throw error;
          } else {
            console.log("Succesfully added");
            menuQuestions();
          }
        }
      );
    });
}

function add_a_role() {


  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the  name of the role: ",
        name: "roleName",
      },
      {
        type: "input",
        message: "Enter the salary: ",
        name: "salary",
      },
      {
        type: "input",
        message: "Enter the department for the role: ",
        name: "roleDept",
      },
    ])
    .then(function (roleName) {
      connection.query(
        `INSERT INTO role SET ?`,
        {
          id: roleName.id,
          title: roleName.roleName,
          salary: roleName.salary,
          department_id: roleName.roleDept,
        },
        function (error) {
          if (error) {
            throw error;
          } else {
            console.log("Succesfully added");
            menuQuestions();
          }
        }
      );
    });
}

function add_an_employee() {
  console.log("hi from add an employee");
  //enter the employee’s first name, last name, role, and manager
}

function update_an_employee_role() {
  console.log("hi from update employee");
}

function quit() {
  console.log("Good bye!");
  process.exit();
}
