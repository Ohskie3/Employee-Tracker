const { createConnection } = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employees_db')


let start = () => {
  prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
    choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees','Update Employee Role', 'Exit']
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
      case 'View Departments':
        viewDepartments()
        break
      case 'View Roles':
        viewRoles()
        break
      case 'View Employees':
        viewEmployees()
        break
      case 'Update Employee Role':
        updateEmployee()
        break
      case 'Exit':
        process.exit()
    }
  })
  .catch(err => console.log(err))
}


let updateEmployee = () => {
  db.query('SELECT * FROM employees', (err, data) => {
    if (err) { console.log(err) }
    prompt([
      {
        type: 'list',
        name: 'roleChosen',
        message: 'Which employee would you like to update?',
        choices: data.map(employee => ({
          title: `${employee.title}`,
          value: employee.id
        }))
      },
      {
        type: 'input',
        name:'employee',
        message: 'What is the new role ID for the employee?'
      }
    ])
    .then(({roleChosen}) => {
      db.query(`UPDATE employees WHERE role_id = ${roleChosen.id}`)
    })
  })

}

let addDepartment = () => {
  prompt([
    {
      type: 'input',
      name: 'add',
      message: 'What is the name of the department you want to add?'
    }
  ])
  .then(department => {
    let newDepartment = {
      name: department.add
    }
    db.query('INSERT INTO departments SET ?', newDepartment, (err) => {
      if (err) { console.log(err) }
      console.log('New department has been added')
      start()
    })
  }) 
  
}
let addRole = () => {
  prompt([
    {
      type: 'input',
      name: 'newRole',
      message: 'What is the title of the role you want to add?'
    },
    {
      type: 'number',
      name: 'salary',
      message: 'What is the salary for this role?'
    },
    {
      type: 'number',
      name: 'id',
      message: 'What is the department id for this role?'
    }
  ])
    .then(role => {
      let newRole = {
        title: role.newRole,
        salary: role.salary,
        department_id: role.id
      }
      db.query('INSERT INTO roles SET ?', newRole, (err) => {
        if (err) { console.log(err) }
        console.log('New role has been added')
        start()
      })
    })

}
let addEmployee = () => {
  prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the employee?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of the employee?'
    },
    {
      type: 'number',
      name: 'roleId',
      message: 'What is the role ID for this employee?'
    },
    {
      type: 'number',
      name: 'managerId',
      message: "What is this employee's manager ID?"
    }
  ])
    .then(employee => {
      let newEmployee = {
        first_name: employee.firstName,
        last_name: employee.lastName,
        role_id: employee.roleId, 
        manager_id: employee.managerId
      }
      db.query('INSERT INTO employees SET ?', newEmployee, (err) => {
        if (err) { console.log(err) }
        console.log('New employee has been added')
        start()
      })
    })
}

let viewDepartments = () => {
  db.query('SELECT * FROM departments', (err, data) => {
    if (err) { console.log(err) }
    console.table(data)
    start()
  })
}
let viewRoles = () => {
  db.query('SELECT * FROM roles', (err, data) => {
    if (err) { console.log(err) }
    console.table(data)
    start()
  })
}

let viewEmployees = () => {
  db.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS 'department', CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id`, (err, employees) => {
      if (err) { console.log(err) }
      console.table(employees)
      start()
  })
}

start()