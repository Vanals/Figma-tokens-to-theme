const StyleDictionary = require('style-dictionary').extend(__dirname + '/config.js');


console.log('Build started...');
console.log('\n==============================================');

StyleDictionary.registerFormat({
  name: 'nk-theme',
  formatter: function({dictionary, platform, options, file}) {
    return 'marco'
  }
})


// run Style Dictionary
StyleDictionary.buildAllPlatforms()