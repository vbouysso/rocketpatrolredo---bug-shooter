// Name: Vincent Bouyssounouse
// Project Title: Bug Shooter
// Date: April 18th   It took me around 8-9 hours to complete this project

//POINT BREAKDOWN:
//Display the time remaining (in seconds) on the screen                  10 points
//Create new spaceship type (spacecraft class):                          20 points
//Implement parallax scrolling                                           10 points
//Implement mechanism that adds time to the clock                        20 points
//Create 4 new explosion SFX and randomize which one plays on impact     10 points
//Replace the UI borders with new artwork                                10 points
//Create a new animated sprite for the Spaceship enemies                 10 points
//Create a new title screen (e.g., new artwork, typography, layout)      10 points

let config = {
    type: Phaser.CANVAS,
    width: 640,
    // width: 1280,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
