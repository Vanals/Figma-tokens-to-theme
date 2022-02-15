const StyleDictionary = require('style-dictionary').extend(__dirname + '/config.js');
const {isNumeric} = require('./tools/isNumeric')

console.log('Build started...');
console.log('\n==============================================');

StyleDictionary.registerFormat({
  name: 'nk-theme',
  formatter: function({dictionary, platform, options, file}) {
    
    // console.log(dictionary.allTokens, 'ALLTOKENS' + '🚣🏻')

    // TODO the default needs to be dynamic as we want to support multiple themes.
    // or anyway manage it dynamically
    let nkTheme = {
      "NK-Light": {},
      "NK-Dark": {}
    }
    
    dictionary.allTokens.forEach(token => {
      // e.g NK-Light,  NK-Dark
      const theme = token.path[0]

      // e.g color, borderRadius, etc.
      const tokenType = token.type
      
      // We resolve the reference and add directly the value. Won't ne needed to be done at compiler lvl.
      const tokenValue = token.value
      
      // In fontWeight its equal to their numeric value "500", "400" etc.
      const tokenDescription = token.description

      // e.g purple100, width000.
      const nkTokenName = token.path[token.path.length - 1]

      switch(tokenType) {
        case "color":
          if (nkTokenName.includes('overlay')) {
            nkTheme[theme]["overlays"] = { ...nkTheme[theme]["overlays"], [nkTokenName]: tokenValue }
            break;
          }
          nkTheme[theme]["colors"] = { ...nkTheme[theme]["colors"], [nkTokenName]: tokenValue }
          break;
        case"borderWidth":
        case "borderRadius":
          // TODO fix "borderRadiusPill": "16*20",?
          if (isNumeric(tokenValue)) {
            tokenValueWithPx = tokenValue + 'px'
            nkTheme[theme]["borders"] = { ...nkTheme[theme]["borders"], [nkTokenName]: tokenValueWithPx }
            break
          }
          nkTheme[theme]["borders"] = { ...nkTheme[theme]["borders"], [nkTokenName]: tokenValue }
          break;
        case "fontSizes":
          const fontSizeValueWithPx = tokenValue + 'px'
          nkTheme[theme]["fonts"] = { ...nkTheme[theme]["fonts"], [nkTokenName]: fontSizeValueWithPx }
          break
        case "fontFamilies":
          // TODO cropConfig ot FontMetrics should be added at this point
          toNkValueStructure = {fontFamily: tokenValue}
          nkTheme[theme]["fonts"] = { ...nkTheme[theme]["fonts"], [nkTokenName]: toNkValueStructure }
          break
        case "lineHeights":
          nkTheme[theme]["fonts"] = { ...nkTheme[theme]["fonts"], [nkTokenName]: tokenValue }
          break;
        case "boxShadow": 
          let newTokenValue = ''

          Object.keys(tokenValue).forEach(valueProperty => {
            if (isNumeric(tokenValue[valueProperty])) {
              tokenValue[valueProperty] = tokenValue[valueProperty] + 'px'
            }
            if (valueProperty !== "type") {
              newTokenValue = newTokenValue + tokenValue[valueProperty] + ' '
            }
          })
          newTokenValue = newTokenValue.trim()

          nkTheme[theme]["shadows"] = { ...nkTheme[theme]["shadows"], [nkTokenName]: newTokenValue }
          break;
        case "sizing": 
          const sizingValueWithPx = tokenValue + 'px'
          
          nkTheme[theme]["sizing"] = { ...nkTheme[theme]["sizing"], [nkTokenName]: sizingValueWithPx }
          break;
        case "spacing": 
          const spacingValueWithPx = tokenValue + 'px'

          nkTheme[theme]["spacePresets"] = { ...nkTheme[theme]["spacePresets"], [nkTokenName]: spacingValueWithPx }
          break;
        case "typography": 
          const fontSizeWithPx = tokenValue.fontSize + 'px'
          typographyWithPx = {...tokenValue, fontSize: fontSizeWithPx }
          nkTheme[theme]["typographyPresets"] = { ...nkTheme[theme]["typographyPresets"], [nkTokenName]: typographyWithPx }
          break;
          case "fontWeights":
            const fontWeightNumber = Number(tokenDescription)
            nkTheme[theme]["fonts"] = { ...nkTheme[theme]["fonts"], [nkTokenName]: fontWeightNumber }
          break
      }
    })

    return JSON.stringify(nkTheme, null, 2)
  }
})

// run Style Dictionary
StyleDictionary.buildAllPlatforms()