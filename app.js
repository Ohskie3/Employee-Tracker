const { createConnection } = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employees_db')


let start = () => {
  prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?'
      choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Roles', 'Exit']
    })
  .then(({ action }) => {
    switch (action) {
      case 'Add Department':
        addDepartment()
        break
      case 'Add Role':
        addRole()
        break
      case 'Add Employee':
        addEmployee()
        break
      case 'View Department':
        viewDepartment()
        break
      case 'View Roles':
        viewRoles()
        break
      case 'view Employees':
        addDepartment()
        break
      case 'Update Employee Roles':
        addDepartment()
        break
      case 'Exit':
        process.exit()
    }
  })
  .catch(err => console.log(err))
}

let addDepartment = () => {

}
let addRole = () => {

}
let addEmployee = () => {

}

let viewDepartments = () => {
  
}
let viewRoles = () => {

}
let viewEmployees = () => {

}

let updateEmployeeRoles = () => {

}


start()