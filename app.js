const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamList = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeQuestions = [
    {
        type: "input",
        message: "Enter employee name: ",
        name: "name",
    },
    {
        type: "input",
        message: "Enter employee email: ",
        name: "email",
    },
]

const managerQuestions = [
    {
        type: "input",
        message: "Enter employee office number: ",
        name: "officeNumber",
    }
]

const engineerQuestions = [
    {
        type: "input",
        message: "Enter employee github username: ",
        name: "github",
    }
]

const internQuestions = [
    {
        type: "input",
        message: "Enter name of employee school: ",
        name: "school",
    }
]

// Add Employee takes the role as input and generates an array of questions based on that role,
// then sets id as the length of the teamList array so the id field is auto-populated,
// then instantiates a new variable using the specified role class using the responses provided
// by the user, then pushes that variable to the teamList array. Once complete it kicks off the
// init() function again to determine if another team member needs to be added.
function addEmployee(role){
    if (role == "Manager"){
        let questions = []
        for (each of employeeQuestions){
            questions.push(each)
        }
        for (each of managerQuestions){
            questions.push(each)
        }
        inquirer.prompt(questions).then((response) => {
            let id = teamList.length;
            let manager = new Manager(id, response.name, response.email, response.officeNumber);
            teamList.push(manager);
            init();
        });
    } else if (role == "Engineer"){
        let questions = []
        for (each of employeeQuestions){
            questions.push(each)
        }
        for (each of engineerQuestions){
            questions.push(each)
        }
        inquirer.prompt(questions).then((response) => {
            let id = teamList.length;
            let engineer = new Engineer(id, response.name, response.email, response.github);
            teamList.push(engineer);
            init();
        });
    } else if (role == "Intern"){
        let questions = []
        for (each of employeeQuestions){
            questions.push(each)
        }
        for (each of internQuestions){
            questions.push(each)
        }
        inquirer.prompt(questions).then((response) => {
            let id = teamList.length;
            let intern = new Intern(id, response.name, response.email, response.school);
            teamList.push(intern);
            init();
        });
    };
};

// Init determines if the user would like to add a new team member, if yes it proceeds with questions
// about the team member, if no it builds the HTML page based on the information provided thus far.
function init(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add a team member?",
            name: "boolTeamMember",
            choices: ["Yes", "No"]
        }
    ]).then((response) => {
        if (response.boolTeamMember == "Yes"){
            inquirer.prompt([
                {
                    type: "list",
                    message: "What is the role of the team member?",
                    name: "memberRole",
                    choices: ["Manager", "Engineer", "Intern"]
                }
            ]).then((response) => { 
                addEmployee(response.memberRole)
            });
         } else {
            const renderTeam = render(teamList);
            fs.writeFile(outputPath, renderTeam, "utf8", function(err){
                if (err) {
                    return console.log(err);
                } else {
                    console.log(`File rendered to ${outputPath}`)
                    };
                });
            };
    });
};

init()
    
    
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
