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

    console.log(employeeInfo, numEmployees)
    // if the length of the array is less than the number of managers, the create manager function is called. The create manager function fills in the data and pushes it to the empty array. It will cycle back here until the length of the array equals the number of managers. Then it will move on to the number of interns. 
    if (employeeInfo.length < numEmployees.numManagers) {
        createManager(employeeInfo, numEmployees);
    } else if (employeeInfo.length < (numEmployees.numManagers + numEmployees.numOfInterns)) {
        createIntern(employeeInfo, numEmployees);
    } else if (employeeInfo.length < (numEmployees.numManagers + numEmployees.numOfInterns + numEmployees.numOfEngineers)) {
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
            message: "What is this Manager's email?",
            name: "myEmail",
            type: "input"
        },
        {
            message: "What is this Manager's office number?",
            name: "myOfficeNumber",
            type: "input"
        },
    ]).then(answers => {
        employeeInfo.push(new Manager(answers.myName, employeeInfo.length, answers.myEmail, answers.myOfficeNumber));
        createEmployee(employeeInfo, numEmployees);
    });
}

numEmployees()
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```