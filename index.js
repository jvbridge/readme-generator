// Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

/**
 * The default name of a file if the user didn't give us one
 * @type {string} 
 */

const DEFAULT_FILE_NAME = "GENERATED.md";
/**
 * This is the set of questions to ask the user about their README they want to
 * create. 
 */
const questions = [
    { // get the user's name
        type: "input",
        name: "userName",
        message: "Tell me, what is your name?"
    },
    { // github username
        type: "input",
        name: "github",
        message: "what is your github user name?"
    },
    { //  Project title
        type: "input",
        name: "title",
        message: "What is the title of this project?"
    },
    { // Description
        type: "input",
        name: "description",
        message: "Tell me a little about this project."
    },
    { // Installation
        type: "input",
        name: "installation",
        message: "How do you install this project?"
    },
    { // Usage
        type: "input",
        name: "usage",
        message: "Once it is installed how is it used?"
    },
    { // License
        type: "list",
        name: "license",
        message: "Which license would you like to use?",
        choices: [
            "MIT",
            "GPL",
            "Apache",
            "BSD"
        ],
        default: 0
    },
    {   // Contribute
        type: "input",
        name: "contributing",
        message: "Tell me the best way to contribute"
    },
    {   // Tests
        type: "input",
        name: "tests",
        message: "what tests were performed on this program?"
    },
    {   // optional filename
        type: "input",
        name: "fileName",
        message: "Give me a custom file name if you'd like one, otherwise leave this section blank"
    }
];


/**
 * Writes to the given file what we want to 
 * @param {string} fileName - file name to write to
 * @param {string} data - the information to write to the file
 */
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, "utf8", (err) =>{
        if (err) return console.error(err);
        console.log(`> ${fileName}`);
    });
}

/**
 * The 
 * @param {string} fileName - the answer the user gave to if they wanted a custom
 * file name
 * @returns {string} the file name we should use
 */
function getfileName(fileName){
    if (!fileName) return DEFAULT_FILE_NAME;
    return DEFAULT_FILE_NAME;
}

/**
 * @function
 * Initializer function for the whole project, gets called at the very end
 */
function init() {
    // get the answers
    inquirer.prompt(questions).then((answers) =>{
        // use the helper module to generate the mark down 
        const fileData = generateMarkdown(answers);
        // check for custom file name information
        const fileName = getfileName(answers.fileName);
        // write to the file
        writeToFile(fileName, fileData);
    });   
}



// Function call to initialize app
init();