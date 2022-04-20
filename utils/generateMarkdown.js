// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

/**
 * 
 * @param {object} data - the answers object given by the inquirer prompts 
 * @returns {string} - the entire string to write out to a file
 */
function generateMarkdown(data) {
  let ret = `# ${data.title}\n${data.description}`;
  return ret;
}



module.exports = generateMarkdown;
