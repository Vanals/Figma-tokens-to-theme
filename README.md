![189fdb29-e78f-443d-b366-d2a65289e38d](https://user-images.githubusercontent.com/25549355/154725215-a166b51f-3d30-4741-a3f0-d77a1a3c0cc6.png)

Spiking the implementation of Styled Dictionary within FigmaTokens plugin; to transform it to a NewsKit theme.

## Spike plan:

Explore how to integrate the “Figma Tokens” plugin into a process that would enable Newskit to provide  themes to users through an NPM package; package which would take the Figma tokens as the source of truth. 

From the Figma plugin, designers are able to add or edit existing tokens. Which would translate in editing a JSON file hosted on a GitHub repo. In fact, after editing the tokens they can push and create a pull request.

```

"inkBase": {
          "value": "{NK-NewsKit.palettes.neutral090}",
          "type": "color",
          "description": "Body and paragraph text"
        },

...

"neutral090": {
          "value": "#2e2e2e",
          "type": "color"
        },
        
```

## Outcome:

Diagram. From Figma Tokens to Nk-Themes

![a3df98ab-b739-40c8-bb1b-90ff8daadd9a](https://user-images.githubusercontent.com/25549355/154725195-18af0e9f-00d4-4b68-9da8-88eab722c31b.png)

The idea is that the compatible Figma tokens file, the Style Dictionary builds and the final package to be published to NPM will only be created and exist during the CircleCI workflow. They won’t be part of the Nk-Themes repo. Altho they can be created locally, if needed, for testing purposes.

### A few direct answers to the main questions we had in the ticket:

- How to convert the Figma tokens JSON file to a usable NewsKit theme? through Style Dictionary and token-transformer.

In order to convert the Figma tokens to a NewsKit theme I have explored Style Dictionary but in order to use the JSON, it had to be transformed. The figma-tokens.json file wasn’t compatible with Style Dictionary and I could not use npm: token-transformer because of the figma-token.json structure we use. 

In fact, we have sets of tokens (Light and Dark) with tokens having the same name. The token-transformer npm package was stripping out the “light” and “dark” objects, merging tokens with the same name, and wasn’t able to solve internal references.

So even if supported in Figma Tokens, Style Dictionary does not have such a concept of sets(Light and Dark), and is not available a tool to make our structure work straight away in SD.

In fact, at the time being there is no consensus on how to handle theming in design tokens nor a standardized format.

I had to adopt a different solution, after lots of reading and trying different ways, an approach that worked was:Simplify the Figma Tokens JSON file to something flatter and I created our own transformer to fix the internal references; making it readable by Style Dictionary.

Then through a custom Style Dictionary formatter, built the news kit theme object.

![figma-tokens-to-theme](https://user-images.githubusercontent.com/25549355/154725478-a8580fa1-7112-43f9-b959-9b41dc2b90c0.png)

I foresee new features being added to facilitate the integration of token sets with Style Dictionary. This will probably remove the need for us to use a transformer and allow us to have a more complex JSON structure resulting in a more appealbuiing interface for designers when using Figma Tokens.

So it’s important for us to stay updated with new releases and features.

- How Style Dictionary can fit into the process? 
What benefits does it bring? 
Worth starting to use it now or later?


Style dictionary has a bit of a learning curve, BUT not too high.It allows us to transform a Figma tokens object into different formats which can make our life easier in the future when supporting multiple types of applications.The best thing tho is that we can create our own formatter. I have created a custom one for building the NK-theme object. The SD library is able to give us lots and well-organized information about the object we are using; making It easy to build whatever we want from it.

Given the time we invested to make it work and the benefits it can bring I think is worth implementing it from now.

What the Circle CI pipeline should take care of?

Basically, validate changes, linting and run tests on Pull Requests. But more importantly, will take care of running scripts to make the Figma tokens compatible with SD(if needed), run Style Dictionary to build the themes and finally create the actual NPM package and publish it.

Nk-Themes spike repo: 

## Usage example: 

Below, is a code snipet coming from the implementation of the nk-themes package withing the ThemeChecker component.Basically, from the package, we will have to just import the theme set we want, in this case, we are importing the NKDocThemes, containing Light and Dark,  and passing the one we want to the CreateTheme function. As for now, the theme comes already compiled. So the internal aliases and references have been already solved by our formatted( soon on by the Figma Token plugin itself). But if we want we could modify the formatter in order to keep the aliases, If we do see any benefit.

```
import {NkDocThemes} from 'nk-themes'

export const sdThemeLight = {
  ...NkDocsThemes["NK-Light"],
  themeVersion: 1,
};

export const sdNkThemeLight = createTheme({
  name: 'sd-theme-light',
  baseTheme: newskitLightTheme,
  overrides: sdThemeLight,
});
```

 


