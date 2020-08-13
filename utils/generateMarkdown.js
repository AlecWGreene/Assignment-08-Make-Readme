/**
 * @function generateMarkdown
 * 
 * @param {Object} arg_data
 * 
 * @description Generates fields to a readme one at a time by checking if the relevant properties are undefined
 */
function generateMarkdown(arg_data) {
  // String to return
  let return_string = "";

  // Title section
  return_string += (arg_data.shield === undefined) ? "" : `
![License](${arg_data.shield})
`;

  // Title section
  return_string += (arg_data.title === undefined) ? "" : `
# ${arg_data.title} \n

  `;

  // Description section
  return_string += (arg_data.description === undefined) ? "" : `
  ## Description \n
${arg_data.description} \n

  `;

  // Installation section
  return_string += (arg_data.installation === undefined) ? "" : `
  ## Table of Contents 

  1. [Installation](#installation) 

  2. [Usage](#usage) 

  3. [Contributing](#contributing) 

  4. [Tests](#tests) 

  5. [Questions](#questions) 

  
  ## Installation \n
${arg_data.installation} \n

  `;

  // Usage section
  return_string += (arg_data.usage === undefined) ? "" : `
  ## Usage \n
${arg_data.usage} \n

  `;

  // Contribution section
  return_string += (arg_data.contributing === undefined) ? "" : `
  ## Contribution \n
${arg_data.contributing} \n

  `;

  // Testing section
  return_string += (arg_data.tests === undefined) ? "" : `
  ## Testing \n
${arg_data.tests} \n

  `;

  // License section
  return_string += (arg_data.license === undefined) ? "" : `
  ## License \n
${arg_data.title} \n

  `;

  // Contact section
  return_string += (arg_data.github === undefined && arg_data.email === undefined) ? "" : (`
  ## Questions \n
Github:  ${(arg_data.github != undefined) ? arg_data.github : ""} \n
Email: ${(arg_data.email != undefined) ? arg_data.email : ""} \n
  `);

  return return_string;
}


module.exports = generateMarkdown;
