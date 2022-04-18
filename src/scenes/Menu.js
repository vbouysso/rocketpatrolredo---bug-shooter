
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('rocket', './assets/rocket.wav');
        this.load.audio('explode1', './assets/explode1.wav');
        this.load.audio('explode2', './assets/explode2.wav');
        this.load.audio('explode3', './assets/explode3.wav');
        this.load.audio('explode4', './assets/explode4.wav');
        this.load.audio('explode5', './assets/explode5.wav');
        this.load.audio('explodecraft', './assets/explodecraft.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('menusky', 'assets/menusky.png')
        this.load.image('bug1', 'assets/bug1.png')
        this.load.image('greenbug1', 'assets/greenbug1.png')
        this.load.image('vincent_hot', 'assets/vincent_hot.png')
    }

    create() {
        this.cameras.main.setBounds(0, 0, 1800, 480);

        const width = this.scale.width
        const height = this.scale.height

        //ADD PARALLAX BACKGROUND ELEMENTS
        this.add.image(width * 0.5, height * 0.5, 'menusky')
        .setScrollFactor(0)
        this.add.image(300, 100, 'bug1')
        this.add.image(500, 100, 'bug1')
        this.add.image(400, 100, 'bug1')
        
        this.add.image(500, 400, 'greenbug1')
        this.add.image(400, 400, 'greenbug1')
        this.add.image(300, 400, 'greenbug1')
        .setScrollFactor(0)
        this.add.image(150, 220, 'vincent_hot')
        .setScrollFactor(0)

        let menuTitleConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '50px',

            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let menuConfig = {
          fontFamily: 'Comic Sans MS',
          fontSize: '30px',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          align: 'right',
          padding: {
              top: 2,
              bottom: 2,
          },
          fixedWidth: 0
      }

      let greenBugConfig = {
        fontFamily: 'Comic Sans MS',
        fontSize: '18px',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        align: 'right',
        padding: {
            top: 2,
            bottom: 2,
        },
        fixedWidth: 0
    }

        // show menu text use configs above
        this.add.text(game.config.width/2+90, game.config.height/2 - borderUISize - borderPadding, 'BUG SHOOTER', menuTitleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(420, 450, 'THE GREEN BUGS ADD TIME TO THE CLOCK', greenBugConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            spacecraftSpeed: 5,
            gameTimer: 60000
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            spacecraftSpeed: 6,
            gameTimer: 45000

          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}