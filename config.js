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
        "filter": (props) => props.type !== undefined 
      }]
    },
    "android": {
      "transformGroup": "android",
      "buildPath": "build/android/",
      "files": [{
        "destination": "figma-tokens-colors.xml",
        "format": "android/resources",
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
    }
  }
}

module.exports = config