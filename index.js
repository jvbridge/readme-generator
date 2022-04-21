// Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// reference to the default json file's JSON
const defaultJson = require("./default/default.json");

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
        message: "For any of these answers you can specify a path to import a" +
        " text file instead of typing the whole answer just start the answer " +
        "with \"./\" \nTell me, what is your name?"
    },
    { // github username
        type: "input",
        name: "github",
        message: "What is your github user name?"
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
        message: "Tell me the best way to contribute."
    },
    {   // Tests
        type: "input",
        name: "tests",
        message: "what tests were performed on this program?"
    },
    {   // optional filename
        type: "input",
        name: "fileName",
        message: "Give me a custom file name if you'd like one, otherwise "+ 
        "leave this section blank"
    }
];


/**
 * Writes to the given file  
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
 * Gets a file name to write to. If no input is given the default is used
 * @param {string} fileName - user input string
 * @returns {string} the file name we should use
 */
function getfileName(fileName){
    // if we don't have an answer return the default
    if (!fileName) return DEFAULT_FILE_NAME;
    // strip any spaces and make it lower case for custom file names for safety
    let fileRet = fileName.split(' ').join("_").toLowerCase();
    // return it with the correct extension
    return (fileRet.endsWith(".md") ?  fileRet: fileRet + ".md");

}

/**
 * checks if the user's input is in fact a path to a local file
 * @param {string} input - the user's input string
 * @returns {string} the original input if the 
 * @returns {Promise<string>} The contents of the file if it is a path
 */
function checkPath(input){

    // if there's no input or it's not formatted correctly
    if (!input.startsWith("./")|| !input) { return input;}
    console.log("found a potential path: ", input);

    // otherwise use fs to try to get the file
    try{
      const ret = fs.readFileSync(input,"utf8");
      console.log(`Imported ${input} successfully`);
      return ret;
    } catch (err){
        console.error(`had an error reading ${input}`);
        console.error(err);
        return input;
    }  
}

/**
 * Imports any files that the user might want to use
 * @param {object} answers - the answers
 * @returns {object} answers with the key being the contents of files with the
 * path provided 
 */
function importFiles(answers){
    let ret = {};
    console.log("checking for imported files... ");
    for (let key in answers){
        ret[key] = checkPath(answers[key]);
    }
    return ret;
}

/**
 * Parses the answers given and writes it to a file as necessary
 * @param {object} answers the user's answers
 */
function parseAnswers(answers){
    const importedAnswers = importFiles(answers);
    let writeStr = generateMarkdown(importedAnswers);
    const fileName = getfileName(answers.fileName);
    writeToFile(fileName, writeStr);
}

/**
 * Initializer function for the whole project, gets called at the very end
 */
function init() {
    // first we ask the user if they want a default template as a demonstration
    inquirer.prompt({
        name:"default",
        type:"confirm",
        message: "Would you like to use the default values?"
    }).then((answer) =>{
        // they said yes! make the default for them
        if (answer.default){
            parseAnswers(defaultJson);
            return;
        }
        // they said no, time to prompt them with the rest of the questions
        inquirer.prompt(questions).then((answers) => {
            parseAnswers(answers);
        });   
    });
}

// Function call to initialize app
init();