// Include packages needed for this application
const inquirer = require("inquirer");

/**
 * This is the set of questions 
 */
const questions = [
    {
        type: "input",
        name: "userName",
        message: "Tell me, what is your name?"
    },
    {
        type: "input",
        name: "github",
        message: "what is your github user name?" // TODO: strip it from an email
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of this project?"
    },
    {
        type: "input",
        name: "description",
        message: "Tell me a little about this project."
    },
    {
        type: "input",
        name: "installation",
        message: "How do you install this project?"
    },
    {
        type: "input",
        name: "usage",
        message: "Once it is installed how is it used?"
    },
    {
        type: "list",
        name: "license",
        message: "Which license would you like to use?",
        choices: [
            "MIT",
            "GNU GPL",
            "Apache License 2.0",
            "BSD"
        ],
        default: 0
    },
    {
        type: "input",
        name: "contributing",
        message: "Tell me the best way to contribute"
    },
    {
        type: "input",
        name: "tests",
        message: "what tests were performed on this program?"
    }
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {

}

/**
 * @function
 * initializer function for the 
 */
function init() {
    inquirer.prompt(questions).then(

    );
}

// Function call to initialize app
init();
