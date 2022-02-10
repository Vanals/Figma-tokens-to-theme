const StyleDictionary = require('style-dictionary').extend(__dirname + '/config.js');


console.log('Build started...');
console.log('\n==============================================');

StyleDictionary.registerFormat({
  name: 'nk-theme',
  formatter: function({dictionary, platform, options, file}) {
    
    // TODO call color -> colors. Can we change the name here and the type: color in FIGMa TOken?
    let nkTheme = {
      borders: {},
      colors: {},
      fonts: {},
      overlays: {},
      shadows: {},
      sizing: {},
    
      // presets

      // spacePresets: {},
      typographyPresets: {},
      // stylePresets: {},
      // transitionPresets: {},
    
      // // defaults

      // componentDefaults: {},
      // icons: {},
    }
    // 
    // console.log(dictionary, 'DICTIONARY' + '🚣🏻')
    // console.log(dictionary.allProperties, 'ALLPROPERTIES' + '🚣🏻')
    // console.log(platform, 'PLATFORM' + '🚣🏻')
    // console.log(options, 'OPTIONS' + '🚣🏻')
    // console.log(file, 'FILE' + '🚣🏻')
    console.log(dictionary.allTokens, 'ALLTOKENS' + '🚣🏻')

    dictionary.allTokens.forEach(token => {
      // e.g color, borderRadius, etc.
      const tokenType = token.type
      
      const tokenValue = token.value

      // e.g purple100, width000
      const nkTokenName = token.attributes.subitem


      // TODO section dynamic
      // nkTheme[nkSection] = { ...nkTheme[nkSection], [nkTokenName]: tokenValue }
      
      switch(tokenType) {
        case "color":
          nkTheme["colors"] = { ...nkTheme["colors"], [nkTokenName]: tokenValue }
          break;
        case "borderRadius":
          nkTheme["borders"] = { ...nkTheme["borders"], [nkTokenName]: tokenValue }
          break;
        default:
          // code block
      }


    })


    

    

    return JSON.stringify(nkTheme, null, 2)
  }
})


// run Style Dictionary
StyleDictionary.buildAllPlatforms()