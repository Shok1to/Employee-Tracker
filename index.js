
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
    // if(answers.category==='Add an employee'){
    //    inquirer
    //    .prompt([
    //         { 
    //           name: "first_name",
    //           type: "input",
    //           message: "What is the employee's first name?",
    //         },
    //         { 
    //           name: "last_name",
    //           type: "input",
    //           message: "What is the employee's last name?",
    //         },
    //         { 
    //             name: "role_id",
    //             type: "list",
    //             message: "What is the employee's role?",
    //             choices: [{ name: 'Sales Lead', value: 1 },
    //             { name: 'Salesperson', value: 2 },
    //             { name: 'Lead Engineer', value: 3 },
    //             { name: 'Software Engineer', value: 4 },
    //             { name: 'Account Manager', value: 5 },
    //             { name: 'Accountant', value: 6 },
    //             { name: 'Legal Team Lead', value: 7 },
    //             { name: 'Lawyer', value: 8 }

    //             ]
    //         },
    //         { 
    //             name: "manager_id",
    //             type: "list",
    //             message: "Who is the employee's manager?",
    //             choices: [{ name: 'John Doe', value: 1 },
    //             { name: 'Mike Chan', value: 2 },
    //             { name: 'Ashley Rodriguez', value: 3 },
    //             { name: 'Kevin Tupik', value: 4 },
    //             { name: 'Kunal Singh', value: 5 },
    //             { name: 'Malia Brown', value: 6 },
    //             { name: 'Sarah Lourd', value: 7 },
    //             { name: 'Tom Allen', value: 8 }
                   

    //             ]
    //         },

    //       ])
    //         .then((answer) => {
    //             DB.addEmployee(answer) 
    //         //   console.log(DB.addEmployee(answer).first_name, answer.last_name,role_id,manager_id); 
    //         }); 
            
        
        
    // }
  })
}
init()