
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
        console.log('everything is ok')
        DB.viewAllEmployees()
        .then(([data])=>{
            console.table(data)
            init()
        })
    }
    if(answers.category==='View all roles'){
        console.log('everything is ok')
        DB.viewAllRoles()
        .then(([data])=>{
            console.table(data)
            init()
        })
    }
    if(answers.category==='View all departments'){
        console.log('everything is ok')
        DB.viewAllDepartments()
        .then(([data])=>{
            console.table(data)
            init()
        })
    }
    if(answers.category==='Add an Employee'){
        DB.addEmployee()
        .then(([data])=>{
            console.table(data)
            init()
        })
    }
  })
}
init()