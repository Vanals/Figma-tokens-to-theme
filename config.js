var config = {
  "source": ["tokens/figma-tokens-new-nk.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "figma-tokens-variables.scss",
        "format": "scss/variables"
      }]
    },
    "compose": {
      "transformGroup": "compose",
      "buildPath": "build/compose/",
      "files": [{
        "destination": "StyleDictionaryColor.kt",
        "format": "compose/object",
        "className": "StyleDictionaryColor",
        "packageName": "StyleDictionaryColor",
        // Needed to tell this format which values to pic up. In this case, all of them.
        "filter": (props) => props.type !== undefined 
      }]
    },
    "android": {
      "transformGroup": "android",
      "buildPath": "build/android/",
      "files": [{
        "destination": "figma-tokens-colors.xml",
        "format": "android/resources",
        // Needed to tell this format which values to pic up. In this case, all of them.
        "filter": (props) => props.type !== undefined 
      }]
    },
    "ios-swift": {
      "transformGroup": "ios-swift",
      "buildPath": "build/ios-swift/",
      "files": [{
        "destination": "figma-tokens.swift",
        "format": "ios-swift/class.swift"
      }]
    },
    "js": {
      "transformGroup": "js",
      "buildPath": "build/js/",
      "files": [
        {
          "destination": "figma-tokens.js",
          "format": "javascript/es6"
        }
      ]
    },
    "js-module-flat": {
      "transformGroup": "js",
      "buildPath": "build/js-module-flat/",
      "files": [
        {
          "destination": "figma-tokens.js",
          "format": "javascript/module-flat"
        }
      ]
    },
    "json-flat": {
      "transformGroup": "js",
      "buildPath": "build/json-flat/",
      "options": {
        // Look here 👇
        "outputReferences": true
      },
      "files": [
        {
          "destination": "figma-tokens.json",
          "format": "json/flat"
        }
      ]
    },
    "nk-theme": {
      "transformGroup": "js",
      "buildPath": "build/nk-theme/",
      "options": {
        // Look here 👇 TODO not working as expected, not getting alias but values
        "outputReferences": true
      },
      "files": [
        {
          "destination": "figma-tokens.json",
          "format": "nk-theme"
        }
      ]
    }
  }
}

module.exports = config