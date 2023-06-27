const connection = require('./connection')
class DB{
    constructor(connection){
        this.connection = connection
  
    }
    viewAllEmployees(){
        return this.connection.promise().query(`SELECT employee.id, employee.first_name,employee.last_name,role.title,department.name,role.salary FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id;`)
    }
    viewAllRoles(){
        return this.connection.promise().query(`SELECT * FROM role`)
    }
    viewAllDepartments(){
        return this.connection.promise().query(`SELECT * FROM department`)
    }
    // addEmployee(employee){
    //     return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('?', ?, ?, ?), [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]`);
    // }

}
module.exports = new DB(connection)

