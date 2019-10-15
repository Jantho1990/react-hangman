# React Hangman

Your traditional game of Hangman, built in React as a Koji template.

## Features
The template makes extensive use of Koji configs to offer a wide variety of customization options out of the box. You can specify your own list of words, 
change game sounds and fonts, how many guesses a player gets, and more.

The game uses themes to customize game colors. Two themes are provided, `light` and `dark`, and more themes can be added by adding a new theme file and registering it in `themes.js`.

Also included is a fully-functioning audio system, complete with volumn controls and individual sound channels.

Finally, the game includes save functionality. Game state is automatically saved as you play, and if you quit the game you can resume at a later time, right where you left off.

## Code Customization
React Hangman provides simple ways to change the code to add additional functionality.

### Additional Gallows Components
Gallows presentations are hosted in `src/gallows`. While `SvgGallows` is used by default, it is easy to create your own and substitute it. Some other examples are provided for you to 
study as examples of how you can build your own gallows component.

It is suggested that your gallows component accepts these four props, being passed in from GameScreen, as they are relevant to most logic used in in a gallows component:
- maxGuesses: The limit on how many guesses a player gets.
- wrongGuesses: How many guesses a player got wrong.
- gameOver: A boolean indicating if the game is over.
- victory: A boolean indicating whether the player has won.

> All of the above variables are available in GameScreen and are passed into `SvgGallows`, so you may reuse them easily.

To use a different gallows component, import it into `screens/GameScreen.js` and replace the existing gallows component with your custom gallows component.

### Add New Sounds
Adding and using new sounds is simple. To make a new sound available, just add an entry to the sounds list in the `sounds` Koji config.

To play your new sound in the code, import the `useSound` hook, extract the `play` method in your functional component, and call `play('yourSoundName')` whenever 
you want the sound to play.

All sounds must be assigned a sound channel in the Koji config. Two channels are supported:
- sfx
- music

The `master` channel controls overall volume level, and cannot be set as a sound channel for individual sounds.

There are additional configuration options in the Koji config that you can use to further customize how your sound is used, such as a 
loop toggle and base volume control. For examples of these configuration options, check out the default sounds.

### Add New Themes
All themes are stored as JSON files in the `themes` directory. They are then imported into the `themes.js` file in the root directory; this file is imported by the game code and used 
to import the themes into the game styles.

To add a new theme, copy an existing theme file, renaming it to whatever you want to call it. After making color changes as you see fit, open `themes.js` and import your new theme file 
(you should see examples of this at the top of the file). Finally, in the `themes.js` export, add an entry for your new theme, `themeName: themeImportVariable`. Your theme can now be 
selected by the player from the Options menu.

> You can set a default theme in the General config file, but this only applies when a player first loads the game; after that, the theme is whatever the player selects it to be.

## FAQ

#### If I change the number of guesses, how will SvgGallows render the number of pieces?
The `SvgGallows` component utilizes 26 individual SVG parts, and its logic allows for those 26 parts to be rendered in many different configurations. When the number of guesses is 
updated in the config from 9 to 10, then the component will use the configuration for 10 guesses. Some of the SVG parts will be rendered at the same time; for smaller guess numbers,
the gallows scaffold uses three visible "pieces", but each of those three pieces is comprised of multiple SVG parts.

> If this is confusing, perhaps taking a look at the SvgGallows component itself will help make things clearer.

#### Can I add another sound channel?
You certainly can! However, it is not automatically displayed in the Options menu, nor stored in the SoundManager, so you will need to modify those parts of the code base to 
accomodate that. You can look at how the other sound channels are implemented for an example on how to do this.

#### Can I add more theme variables?
It is possible, but you will need to add those theme variables as passed-in props to the styled components where you want to use it, and you will need to provide values for this new 
variable to the other game themes. See existing components for examples.

#### Can I use the default sounds from this game in my own game?
Yes, you may use the existing sounds (including the background music track) free of charge. While attribution is nice, it is not required.