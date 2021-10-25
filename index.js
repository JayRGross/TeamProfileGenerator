const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const HTMLtemplate = require('./src/HTMLtemplate');

const inquirer = require('inquirer');
const fs = require('fs');

const fullTeam = [];

const managerPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'waht is the name of the manager?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'what is the mangers id?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'what is the managers email?'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'what is the office number of the manager?'   
        }
    ])
    .then(managerPrompt => {
      const { name, id, email, officeNumber } = managerPrompt;
      let manager = new Manager(name, id, email, officeNumber);
      fullTeam.push(manager)
      console.log(manager)  
    })
};
const newEmployee = () => {
    console.log('add employees to the team');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'please choose your employees role',
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "what is the employee's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "what is the employee's id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "what is the employee's email"
        },
        {
            type: 'input',
            name: 'github',
            message: "please enter the employee's github username",
            when: (input) => input.role === "Engineer"
        },
        {
            type: 'input',
            name: 'school',
            message: "please enter the Interns school",
            when: (input) => input.role === "Intern"
        },
        {
            type: 'confirm',
            name: 'confirmnewEmployee',
            message: "would you like to add more employees?",
            default: false
        }
    ])
    .then(employeeData => {
        let { name, id, email, role, github, school, confirmnewEmployee } = employeeData;
        let employee;
        if(role === 'Engineer') {
            employee = new Engineer(name, id, email, github);
        } else if (role === 'Intern') {
            employee = new Intern(name, id, email, school);
        }
        fullTeam.push(employee);

        if(confirmnewEmployee) {
            return newEmployee(fullTeam);
        } else {
            return fullTeam;
        }
    })
}
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("your team profile has been generated in the dist folder")
        }
    })
};
managerPrompt()
    .then(newEmployee)
    .then(fullTeam => {
        return HTMLtemplate(fullTeam);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });