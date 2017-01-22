# svg-levels-filter
A module for creating an svg levels filter

### Usage  

`var svgLevels = require('svg-levels-filter');
var svgLevelsInstance = svgLevels();
levelsInstance.setLevelValues({
	inputBlack: 0,
    inputWhite: 127,
    gamma: 1,
    outputBlack: 127,
    outputWhite: 255
})
var svgFilter = levelsInstance.compose();

### Properties  
* inputBlack
* outputBlack
* gamma
* outputBlack
* inputBlack
* values: an object with one or more of the previous properties
* filter: you can pass your own filter element


### Methods  

* setLevelValues: accepts an object with one or more of the level properties
* compose: returns an object with the level properties