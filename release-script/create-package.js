const fs = require('fs')
// TODO add 'package-release-folder in .gitignore

const createPackage = function () {
  // TODO update with packageName
  console.log('running create Package')
  // console.log('\n 👩‍💻Creating packageName...👨‍💻 \n')
  // Create package folder
  // TODO replace with package name folder
  fs.mkdir('./package-release-folder', { recursive: true }, (err) => {
    if (err) throw err;
    // TODO replace with packageName
    console.log('Created packageName folder ✅');
  });
  
  // TODO replace name with package name
  // TODO LICENSE TYPE?
  // TODO handle package versioning, pick up the version in the package.json and after updating it use it for the new package.json 
  // Create a pr for updating repo package.json with new version?
  // TODO specify author and.. anything else?
  const packageJson = `
  {
    "name": "package-name",
    "version": "1.0.0",
    "license": "MIT",
    "author": ""
  }
  `

  // Add package.json
  fs.writeFile('./package-release-folder/package.json', packageJson, (err) => {
    if (err) throw err;
    console.log('Created package.json ✅');
  })
  
  // Add NewsKit theme json file
  fs.copyFile('./build/nk-theme/figma-tokens.json', './package-release-folder/nk-themes.json', (err) => {
    if (err) throw err;
    console.log('Added NewsKit themes json ✅');
  });
  
  // TODO TO ES6?
  // Add index.js to export files
  const importExportList = `const NkThemes = require('./nk-themes.json');

  const themes = {
    NkThemes
  }

  module.exports = themes
  `

  fs.writeFile('./package-release-folder/index.js', importExportList, (err) => {
    if (err) throw err;
    console.log('Added index.js with exports ✅');
  })
}

createPackage()