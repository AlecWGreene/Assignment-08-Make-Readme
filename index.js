const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

/** Flag which should be false if the prompt is waiting on the user to confirm their input */
let confirmed = false;
/** Object with properties containg the text to pass to @see generateMarkdown */
let data = {};

/** License shield urls */
const license_shields = {
    "GNU GPLv3": "https://img.shields.io/badge/license-GPLv3-blue",
    "MIT": "https://img.shields.io/badge/license-MIT-green",
    "ISC": "https://img.shields.io/badge/license-ISC-green",
    "Apache 2.0": "https://img.shields.io/badge/license-Apache%202-blue"
};

/**
 * @function transformInput
 * 
 * @param {String} arg_input Text being typed by the user
 * 
 * @param {String} arg_field Name of the field being edited
 * 
 * @description Takes in user generated text and passes it dynamically to @see generateMarkdown
 * 
 * @returns {String}
 */
function transformInput(arg_input, arg_field){
    let t_data = data;
    t_data[arg_field] = arg_input;

    return generateMarkdown(t_data);
}

/** array of questions for user */
const questions = [{
    type: "input",
    name: "title",
    message: "What is the project titled? ",
    transformer: function(arg_input){
        return transformInput(arg_input,"title");
    }
},{
    type: "input",
    name: "description",
    message: "Write out a brief description of the application: \n",
    transformer: function(arg_input){
        return transformInput(arg_input,"description");
    }
},{
    type: "input",
    name: "installation",
    message: "Detail the steps to installing your application: \n",
    transformer: function(arg_input){
        return transformInput(arg_input,"installation");
    }
},{
    type: "input",
    name: "usage",
    message: "Walk a user through using your application: \n",
    transformer: function(arg_input){
        return transformInput(arg_input,"usage");
    }
},{
    type: "input",
    name: "contributing",
    message: "Give guidlines to potential contributors to the application: \n",
    transformer: function(arg_input){
        return transformInput(arg_input,"contributing");
    }
},{
    type: "input",
    name: "tests",
    message: "Walk a contributor through how to test the application: \n",
    transformer: function(arg_input){
        return transformInput(arg_input,"tests");
    }
},{
    type: "list",
    name: "license",
    message: "choose a license your project will be protected under: ",
    choices: [ "GNU GPLv3", "MIT", "ISC", "Apache 2.0"]
},{
    type: "input",
    name: "github",
    message: "Enter your github username:",
    transformer: function(arg_input){
        return transformInput(arg_input,"github");
    }
},{
    type: "input",
    name: "email",
    message: "Enter your email: ",
    transformer: function(arg_input){
        return transformInput(arg_input,"email");
    }
},{
    type: "input",
    name: "fileName",
    message: "What would you like the file to be named? ",
    prefix: generateMarkdown(data)
}];

/**
 * @function writeToFile
 * 
 * @param {String} arg_fileName FileName to print the readme to
 * 
 * @param {Object} arg_data Data to print to the file
 * 
 * @description Writes the data to the file
 */
function writeToFile(arg_data, arg_fileName) {
    fs.writeFile(arg_fileName,generateMarkdown(arg_data),(arg_error,arg_data) => {});
}

/**
 * @async @function askQuestion
 * 
 * @param {Object} arg_question Question to display to the user
 * 
 * @param {String} arg_input Previous input of the question, can be left blank
 * 
 * @description Prompts the user for an answer to a question and when the user submits, asks for confirmation until the user eventually accepts their input
 * 
 * @augments data
 */
async function askQuestion(arg_question, arg_input){
    // Declare helper vars
    arg_input ? (arg_question.prefix = `Previous input: \n 
${arg_input}

---------------------------------------------------------
\n
`) : arg_input;
    let t_answer = await inquirer.prompt(arg_question);
    data[arg_question.name] = t_answer[arg_question.name];

    // Get confirmation
    let { confirmation: confirmed } = await inquirer.prompt({
        type: "confirm",
        name: "confirmation",
        message: "Confirm entry? "
    });

    // Re-Prompt the question
    if(!confirmed){
        console.clear();
        await askQuestion(arg_question, t_answer[arg_question.name]);
    }
}


/**
 * @function init
 * 
 * @description Runs the program
 */
async function init() {
    // Prompt user for information
    for(let i = 0; i < questions.length; i++){
        // Clear console and ask the ith question
        console.clear();
        await askQuestion(questions[i]);

        // If the next question is the last question, then update the prefix to the last question
        if(i === questions.length - 2){
            questions[questions.length - 1].prefix = generateMarkdown(data);
        }
    }

    // Add shield to data
    data.shield = license_shields[data.license];

    // Write to file
    writeToFile(data, data.fileName);
    console.clear();
}

// function call to initialize program
init();
