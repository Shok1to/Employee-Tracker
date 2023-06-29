const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllEmployees() {
        return this.connection.promise().query(`SELECT employee.id, employee.first_name,employee.last_name,role.title,department.name,role.salary FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id;`)
    }
    viewAllRoles() {
        return this.connection.promise().query(`SELECT * FROM role`)
    }
    viewAllDepartments() {
        return this.connection.promise().query(`SELECT * FROM department`)
    }
    addDepartment(department) {
        return this.connection.promise().query(`INSERT INTO department SET name = ?`, department)
    }
    addEmployee(employee){
        return this.connection.promise().query(`INSERT INTO employee SET ?`, employee);
    }
    addRole(role){
        return this.connection.promise().query(`INSERT INTO role SET name = ?`, role);
    }

}
module.exports = new DB(connection);

