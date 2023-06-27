
const inquirer = require('inquirer');
const DB = require('./db')

function init(){


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

})
  .then((answers) => {
    console.log(answers.category)
    if(answers.category==='View all employees'){
        DB.viewAllEmployees()
        .then(([data])=>{
            console.table(data)
            init()
        })
    }
    if(answers.category==='View all roles'){
         DB.viewAllRoles()
        .then(([data])=>{
            console.table(data)
            init()
        })
    }
    if(answers.category==='View all departments'){
        DB.viewAllDepartments()
        .then(([data])=>{
            console.table(data)
            init()
        })
    }
    if(answers.category==='Add an employee'){
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
                choices: [1,2
                    // 'Sales Lead',
                    // 'Salesperson',
                    // 'Lead Engineer',
                    // 'Software Engineer',
                    // 'Account Manager', 
                    // 'Accountant',
                    // 'Legal Team Lead',
                    // 'Lawyer',

                ]
            },
            { 
                name: "manager_id",
                type: "list",
                message: "Who is the employee's manager?",
                choices: [
                    "None",
                    "John Doe",
                    "Mike Chan",
                    "Ashley Rodriguez",
                    "Kevin Tupik",
                    "Kunal Singh",
                    "Malia Brown",
                    "Sarah Lourd",
                    "Tom Allen",

                ]
            },

          ])
            .then((answer) => {
                DB.addEmployee(answer) 
            //   console.log(DB.addEmployee(answer).first_name, answer.last_name,role_id,manager_id); 
            }); 
            
        
        
    }
  })
}
init()