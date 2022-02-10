const StyleDictionary = require('style-dictionary').extend(__dirname + '/config.js');


console.log('Build started...');
console.log('\n==============================================');

StyleDictionary.registerFormat({
  name: 'nk-theme',
  formatter: function({dictionary, platform, options, file}) {

    let nkTheme = {
      motion: {},
      border: {},
      breakpoint: {},
      color: {},
      font: {},
      overlay: {},
      shadow: {},
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
      const nkSection = token.type
      
      const tokenValue = token.value

      // e.g purple100, width000
      const nkTokenName = token.attributes.subitem


      // TODO section dynamic
      nkTheme[nkSection] = { ...nkTheme[nkSection], [nkTokenName]: tokenValue }

    })


    

    

    return JSON.stringify(nkTheme, null, 2)
  }
})


// run Style Dictionary
StyleDictionary.buildAllPlatforms()