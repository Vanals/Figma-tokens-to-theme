const fs = require('fs')
// TODO add 'package-release-folder in .gitignore

const createPackage = function () {

  console.log('\n 👩‍💻Creating Nk Themes package...👨‍💻 \n')
  // Create package folder
  // TODO replace with package name folder
  fs.mkdir('./nk-themes', { recursive: true }, (err) => {
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
  fs.writeFile('./nk-themes/package.json', packageJson, (err) => {
    if (err) throw err;
    console.log('Created package.json ✅');
  })
  
  // Add NewsKit theme json file
  fs.copyFile('./build/nk-doc-themes/nk-doc-themes.json', './nk-themes/nk-doc-themes.json', (err) => {
    if (err) throw err;
    console.log('Added NewsKit themes json ✅');
  });
  
  // TODO TO ES6?
  // Add index.js to export files
  const importExportList = `const NkDocThemes = require('./nk-doc-themes.json');

  const NkThemes = {
    NkDocThemes
  }

  module.exports = NkThemes
  `

  fs.writeFile('./nk-themes/index.js', importExportList, (err) => {
    if (err) throw err;
    console.log('Added index.js with exports ✅');
  })
}

createPackage()