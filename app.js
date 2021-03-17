const { createConnection } = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employees_db')


let start = () => {
  prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Add to', 'View', 'Update Roles', 'Exit']
    })
  .then(({ action }) => {
    switch (action) {
      case 'Add to':
        add()
        break
      case 'View':
        view()
        break
      case 'Update Roles':
        updateRoles()
        break
      case 'Exit':
        process.exit()
    }
  })
  .catch(err => console.log(err))
}


let add = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to add to?',
      choices: ['Add to Departments', 'Add to Roles', 'Add to Employees']
  })
  .then(({ action }) => {
    switch (action) {
      case 'Add to Departments':
        addDepartment()
        break
      case 'Add to Roles':
        addRole()
        break
      case 'Add to Employees':
        addEmployee()
        break
    }
  })
  .catch(err => console.log(err))
}

let view = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to view?',
    choices: ['Departments', 'Roles', 'Employees']
  })
    .then(({ action }) => {
      switch (action) {
        case 'Departments':
          viewDepartment()
          break
        case 'Add to Roles':
          viewRole()
          break
        case 'Add to Employees':
          viewEmployee()
          break
      }
    })
    .catch(err => console.log(err))
}

let updateRoles = () => {

}

let addDepartment = () => {
  
}
let addRole = () => {

}
let addEmployee = () => {

}

let viewDepartment = () => {
  db.query('SELECT * FROM departments', (err, data) => {
    if (err) { console.log(err) }
    console.table(data)
    start()
  })
}
let viewRole = () => {
  db.query('SELECT * FROM roles', (err, data) => {
    if (err) { console.log(err) }
    console.table(data)
    start()
  })
}

let viewEmployee = () => {
  db.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS 'department', CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id`, (err, data) => {
      if (err) { console.log(err) }
      console.table(data)
      start()
  })
}

start()