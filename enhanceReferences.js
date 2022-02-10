// import figmaTokensList from 'figma-tokens-nk.json'
const figmaTokens = require('./tokens/figma-tokens-nk.json')
var fs = require('fs')


// const removeExtraProperties = () => {
  
//   const figmaTokensListCleaned = {
//     "NK-Light": {
//       ...figmaTokensList["NK-Light"]["NK-NewsKit"]
//     },
//     "NK-Dark": {
//       ...figmaTokensList["NK-Light"]["NK-Dark"]
//     }
//   }

//   console.log(figmaTokensListCleaned)
//   return figmaTokensListCleaned
// }

// removeExtraProperties()

const referenceFixer = (figmaTokensObj) => {
  // Copying so we do not modify the original obj
  // const figmaTokensObjCopy = {...figmaTokensObj}
  
  // for (var k in obj)
  //   {
  //       if (typeof obj[k] == "object" && obj[k] !== null)
  //           eachRecursive(obj[k]);
  //       else
  //           // do something... 
  //   }

  // Object.keys(figmaTokensObjCopy).forEach(property => {
  //   if (property.value == undefined) return referenceFixer(property)
    
  //   if(typeof property.value === 'string' && property.value.startsWith('{')) {
  //     property.value.replace('{', '{NK-Light.')
  //   }

  // })

  // console.log(figmaTokensObjCopy)


  const stringifiedFigmaTokens = JSON.stringify(figmaTokens)
  console.log(__dirname)
  fs.readFile('./tokens/figma-tokens-nk.json', 'utf8', (err, data) => {
    if (err) return console.log(err)
    
    // This fixed the first part of the references.. but
    const newData = data.replaceAll('{NK-NewsKit.palettes', '{NK-Light.NK-NewsKit.overlay.palettes')
    // const newData = data.replaceAll('{fontFamily', '{NK-Light.NK-NewsKit.overlay.palettes')
    // Reference doesn't exist: NK-Light.NK-NewsKit.overlay.tints.overlayTintBase010.value tries to reference NK-Light.NK-NewsKit.overlay.palettes.tints.blackTint020, which is not defined
    
    console.log(newData)
    fs.writeFile('figma-tokens-marco.json', newData, (err) => {console.log(err)})

  })

}

referenceFixer(figmaTokens)