const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
//build an output folder
const outputPath = path.join(OUTPUT_DIR, "index.html");
const render = require("./lib/htmlRenderer");

function renderEmployee(employeeInfo) {
    let html = render(employeeInfo);
    fs.mkdir("output", function (err) {
        // if (err) throw err;
    });
    fs.writeFile("output/index.html", html, function (err) {
        if (err) throw err;
    });
}


function numEmployees() {

    console.log("Welcome! Please enter the number of employees for each of the following roles.")
    inquirer.prompt([
        {
            message: "Number of managers:",
            name: "numManagers",
            type: "number"
        },
        {
            message: "Number of interns:",
            name: "numInterns",
            type: "number"
        },
        {
            message: "Number of Engineers:",
            name: "numEngineers",
            type: "number"
        }
    ]).then(answers => {
        createEmployee([], answers);
    })
}
// takes 2 params. The first is an empty array. The second is the number of answers. 
function createEmployee(employeeInfo, numEmployees) {
    const countedManagers = numEmployees.numManagers + numEmployees.numInterns
    const countedInterns = numEmployees.numManagers + numEmployees.numInterns + numEmployees.numEngineers

    console.log(employeeInfo, numEmployees)
    // if the length of the array is less than the number of managers, the create manager function is called. The create manager function fills in the data and pushes it to the empty array. It will cycle back here until the length of the array equals the number of managers. Then it will move on to the number of interns. 
    if (employeeInfo.length < numEmployees.numManagers) {
        createManager(employeeInfo, numEmployees);
    } else if (employeeInfo.length < countedManagers) {
        createIntern(employeeInfo, numEmployees);
    } else if (employeeInfo.length < countedInterns) {
        createEngineer(employeeInfo, numEmployees);
    } else {
        renderEmployee(employeeInfo)
    }
}


function createManager(employeeInfo, numEmployees) {
    inquirer.prompt([
        {
            message: "Please enter the Manager's name.",
            name: "myName",
            type: "input"
        },
        {
            message: "What is their email?",
            name: "myEmail",
            type: "input"
        },
        {
            message: "What is their office number?",
            name: "myOfficeNumber",
            type: "input"
        },
    ]).then(answers => {
        employeeInfo.push(new Manager(answers.myName, employeeInfo.length, answers.myEmail, answers.myOfficeNumber));
        createEmployee(employeeInfo, numEmployees);
    });
}

function createIntern(employeeInfo, numEmployees) {
    inquirer.prompt([
        {
            message: "Please enter the Intern's name.",
            name: "myName",
            type: "input"
        },
        {
            message: "What is their email?",
            name: "myEmail",
            type: "input"
        },
        {
            message: "What school do they attend?",
            name: "mySchool",
            type: "input"
        },
    ]).then(answers => {
        employeeInfo.push(new Intern(answers.myName, employeeInfo.length, answers.myEmail, answers.mySchool));
        createEmployee(employeeInfo, numEmployees);
    });
}

function createEngineer(employeeInfo, numEmployees) {
    inquirer.prompt([
        {
            message: "Please enter the Engineer's name.",
            name: "myName",
            type: "input"
        },
        {
            message: "What is their email?",
            name: "myEmail",
            type: "input"
        },
        {
            message: "What is their GitHub?",
            name: "myGithub",
            type: "input"
        },
    ]).then(answers => {
        employeeInfo.push(new Engineer(answers.myName, employeeInfo.length, answers.myEmail, answers.myGithub));
        createEmployee(employeeInfo, numEmployees);
    });
}
numEmployees()




