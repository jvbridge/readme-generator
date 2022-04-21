/**
 * Returns a badge that will render on the README
 * @param {string} license string passed in from the choices for the license
 * @returns {string} the markdown to add to the document
 */
function renderLicenseBadge(license) {
    // using an object to act like a switch statement
    const badgeStrObj = {
        "MIT" : "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]",
        "GPL" : "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)]",
        "Apache" : "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)]",
        "BSD" : "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)]",
    };
    // pick it from the switch
    const badgeStr = badgeStrObj[license];

    /// get the link
    const badgeLink = renderLicenseLink(license);

    // empty string is default case, return it if anything went wrong
    return (badgeStr && badgeLink)? `${badgeStr}${badgeLink}`: ``;
}

/**
 * Helper function for renderLicenseBadge()
 * @param {string} license string passed in from the choices for the license
 * @returns {string} the link to append to make the badge functional
 */
function renderLicenseLink(license) {
    // use an object as a switch statement
    const linkObj = {
        "MIT": "(https://opensource.org/licenses/MIT)",
        "GPL": "(https://www.gnu.org/licenses/gpl-3.0)",
        "Apache": "(https://opensource.org/licenses/Apache-2.0)",
        "BSD": "(https://opensource.org/licenses/BSD-3-Clause)",
    };
    // return the value found, default case is empty string
    return (linkObj[license]? linkObj[license]: "");
}

/**
 * Returns the license section to append to the readme generator
 * @param {string} license string passed in from the choices for the license
 * @returns {string} markdown to add to the generated file
 */
function renderLicenseSection(license) {
    const licenseBadge = renderLicenseBadge(license);
    ret = `
    ## License

    ${licenseBadge}
    `;
    return ret;
}

/**
 * Generates markdown for the answers the user gave for the readme
 * @param {object} data - the answers object given by the inquirer prompts
 * @returns {string} - the entire string to write out to a file
 */
function generateMarkdown(data) {
    
    const licenseSection = renderLicenseSection(); 
    
    const ret = `# ${data.title}
    ${data.description}
    `;
return ret;
}

module.exports = generateMarkdown;
