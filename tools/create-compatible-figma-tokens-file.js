// import figmaTokensList from 'figma-tokens-nk.json'
const figmaTokens = require('../tokens/nk-doc-figma-tokens.json')
var fs = require('fs')

const createFigmaTokensFileWithFullAliases = (figmaTokensObj) => {
  let fullEnhancedStringObj = {} 

  Object.keys(figmaTokens).forEach(theme => {
    let themeStringified = JSON.stringify(figmaTokensObj[theme])
    
      themeStringified = themeStringified.replaceAll(`"{`, `"{${theme}.`)
      themeStringified = themeStringified.replaceAll(`rgba({`, `rgba({${theme}.`)

      const themeWithFixedAliases =  {[theme]: JSON.parse(themeStringified) }

      fullEnhancedStringObj = { ...fullEnhancedStringObj, ...themeWithFixedAliases}
  })

  fs.mkdir('./compatible-figma-tokens', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Created compatible-figma-tokens folder ✅');
  });
  
  fs.writeFile('./compatible-figma-tokens/figma-tokens-with-full-aliases.json', JSON.stringify(fullEnhancedStringObj, null, 2), (err) => {
    if (err) throw err;
    console.log('Created compatible figma tokens file ✅');
  })
}

createFigmaTokensFileWithFullAliases(figmaTokens)