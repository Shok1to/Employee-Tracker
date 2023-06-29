
const inquirer = require('inquirer');
const DB = require('./db')

function init() {

  inquirer
    .prompt({
      type: 'list',
      name: 'category',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'Add an employee',
        'Update employee role',
        'View all roles',
        'Add a role',
        'View all departments',
        'Add department',
        'Exit'
      ]

    }).then((answers) => {
      console.log(answers.category)
      if (answers.category === 'View all employees') {
        DB.viewAllEmployees()
          .then(([data]) => {
            console.table(data)
            init()
          })
      }
      if (answers.category === 'View all roles') {
        DB.viewAllRoles()
          .then(([data]) => {
            console.table(data)
            init()
          })
      }
      if (answers.category === 'View all departments') {
        DB.viewAllDepartments()
          .then(([data]) => {
            console.table(data)
            init()
          })
      }
      if (answers.category === 'Add department') {
        createDept();

      }
      if (answers.category === 'Add an employee') {
        createEmployee();
      }
      if (answers.category === 'Add a role') {
        createRole();
      }
    })

}


function createDept() {
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      let dept = answer.department_name;
      DB.addDepartment(dept)
      console.log(`added ${dept}`);
      init()
    })
}

function createEmployee() {

  DB.viewAllRoles()
    .then(([roles]) => {
      const roleOptions = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }))

      DB.viewAllEmployees()
        .then(([employees]) => {
          const managerOptions = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }))

          inquirer
            .prompt([
              {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?",
              },
              {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?",
              },
              {
                name: "role_id",
                type: "list",
                message: "What is the employee's role?",
                choices: roleOptions
              },
              {
                name: "manager_id",
                type: "list",
                message: "Who is the employee's manager?",
                choices: managerOptions
              },
            ])
            .then((answer) => {

              let newEmployee = {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id,
              }
              DB.addEmployee(newEmployee);
              console.log(`Added new employee: ${newEmployee}`);
              init();

            })
        })
    })
}

function createRole() {
  DB.viewAllDepartments()
    .then(([departments]) => {
      const deptOptions = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }))

      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What is the name of the role",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?",
          },
          {
            name: "department_id",
            type: "list",
            message: "Which department does the role belong to?",
            choices: deptOptions
          },
        ])
        .then((answer) => {
          let newRole = { 
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id,
          }
          DB.addRole(newRole);
          console.log(`added ${newRole.title}`);
          init();
        })
      })
    }

// function updateEmployeeRole(){
//   DB.viewAllEmployees()
//         .then(([employees]) => {
//           const managerOptions = employees.map(({ id, first_name, last_name }) => ({
//             name: `${first_name} ${last_name}`,
//             value: id
//           }))
// }

init()

