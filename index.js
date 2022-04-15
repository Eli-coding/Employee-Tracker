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
          "I am done for today.",
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

        case "I am done for today.":
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
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM role", function (error, results) {
      if (error) {
      
          return reject(err);
         
      } else {
       console.table(results);
        
       menuQuestions();
        return resolve(results);
      }
    });
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
    .then(function (results) {
      connection.query(
        `INSERT INTO role SET ?`,
        {
          id: results.id,
          title: results.roleName,
          salary: results.salary,
          department_id: results.roleDept,
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
  //enter the employee’s first name, last name, role, and manager
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the first name of the employee: ",
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter the last name of the employee: ",
        name: "lastName",
      },
      {
        type: "input",
        message: "Enter the role of the employee: ",
        name: "roleID",
      },
      {
        type: "input",
        message: "Is this employee a manager?",
        name: "managerID",
      },
    ])
    .then(function (results) {
      connection.query(
        `INSERT INTO employee SET ?`,
        {
          first_name: results.firstName,
          last_name: results.lastName,
          role_id: results.roleID,
          manager_id: results.managerID,
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

function getEmployeeList() {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM employee", function (error, results) {
      if (error) {
        return reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getRoleList() {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM role", function (error, results) {
      if (error) {
        return reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function update_an_employee_role() {
  let employee = await getEmployeeList();

  const employeeList = employee.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        name: "selectedEmp",
        message: "Which employee are you updating their role?",
        choices: employeeList,
      },
    ])
    .then(async (response) => {
      //let employee_id = response.selectedEmp;
     let role = await getRoleList();
        
       const roleList = role.map(({ id, title }) =>({
           name: title,
         value: id,
      }))
      inquirer.prompt([
        {
          type: "list",
          message:
            "What role you do you want to assigned to the selected employee? ",
          name: "roleID",
          choices: roleList
        },
      ]).then((results) => {
        console.log(results)
        connection.query(
            `UPDATE employee
            SET  role = ? , 
            WHERE  id = ?`,
            ['roleList', 'employeeList' ],
          function (error, results) {
            if (error) {
              throw error;
            } else {
              resolve(results);
            }
            
          
      });
      // 
      // connection.query('UPDATE role  SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
      //   if (error) throw error;
    
      // });

      
  
}

function quit(){
  console.log("Good bye!");
  process.exit();
};
