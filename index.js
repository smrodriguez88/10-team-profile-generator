const inquirer = require("inquirer");

// array of questions for user
const questions = [
    {
        type: "input",
        message: "Enter project title:",
        name: "pTitle"
    },
    {
        type: "input",
        message: "Enter project description:",
        name: "pDescription"
    },
    {
        type: "input",
        message: "Enter installation instructions:",
        name: "pInstallation"
    },
    {
        type: "input",
        message: "Enter application usage information:",
        name: "pUsage"
    },
    {
        type: "list",
        message: "Select a license for your application:",
        name: "pLicense",
        choices: [
            "MIT",
            "APACHE",
            "GPLv3",
            "ISC",
            "Unlicensed",
            "WTFPL"
        ]
    },
    {
        type: "input",
        message: "Enter contributors:",
        name: "pContributing"
    },
    {
        type: "input",
        message: "Enter test instructions:",
        name: "pTests"
    },
    {
        type: "input",
        message: "Enter contact information for questions:",
        name: "pQuestions"
    }
];

// function to initialize program
function init(questions) {
    inquirer.prompt(questions).then((response) => {
        writeToFile("README.md", response)
    });
    
};

// function call to initialize program
init(questions);