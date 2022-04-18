class Play extends Phaser.Scene {

    //look up documentation for detune phaser 
    init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	}

    constructor() {
        super("playScene");
    }

    getRandomInt(max) { 
        //from mozilla developer docs (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
        return Math.floor(Math.random() * max);
      }

    preload() {
        //load background images
        this.load.image('sky', 'assets/sky.png')
        this.load.image('cloud', 'assets/cloud.png')
        this.load.image('mountains', 'assets/mountains.png')
        this.load.image('trees', 'assets/trees.png')
        this.load.image('grass', 'assets/grass.png')
        this.load.image('leftborder', 'assets/leftborder.png')
        this.load.image('rightborder', 'assets/rightborder.png')
        this.load.image('bottomborder', 'assets/bottomborder.png')
        this.load.image('topborder', 'assets/topborder.png')
        
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spacecraft', './assets/spacecraft.png');
        this.load.image('starfield', './assets/starfield.png');

        // load spritesheet
        // this.load.spritesheet('spaceshipanim', './assets/spaceshipanim.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion1', './assets/explosion1.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion2', './assets/explosion2.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion3', './assets/explosion3.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion4', './assets/explosion4.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion5', './assets/explosion4.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosioncraft', './assets/explosioncraft.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        //load orange bug atlas
        this.load.atlas({
            key: 'bugsprite',
            textureURL: './assets/bugsprite.png',
            atlasURL: './assets/bugsprite.json'
        });
        //load green bug atlas
        this.load.atlas({
            key: 'greenbugsprite',
            textureURL: './assets/greenbugsprite.png',
            atlasURL: './assets/greenbugsprite.json'
        });


    }


    create() {
        //SET CAMERA BOUNDS
        this.cameras.main.setBounds(0, 0, 1800, 480);

        const width = this.scale.width
        const height = this.scale.height

        //ADD PARALLAX BACKGROUND ELEMENTS
        this.add.image(width * 0.5, height * 0.5, 'sky')
        .setScrollFactor(0)
        this.add.image(0, height, 'cloud')
		.setOrigin(0, 1)
		.setScrollFactor(0.1)
        this.add.image(0, height, 'mountains')
		.setOrigin(0, 1)
		.setScrollFactor(0.18)
        this.add.image(0, height, 'trees')
		.setOrigin(0, 1)
		.setScrollFactor(0.3)
        this.add.image(0, height, 'grass')
		.setOrigin(0, 1)
		.setScrollFactor(0.4)
        // this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // purple UI background

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x5e5ad6).setOrigin(0, 0).setScrollFactor(0);


        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x1c6925).setOrigin(0 ,0).setScrollFactor(0);
        this.add.image(0, 0, 'topborder').setOrigin(0 ,0).setScrollFactor(0);
        this.add.image(0, game.config.height - borderUISize, 'bottomborder').setOrigin(0, 0).setScrollFactor(0);
        this.add.image(0, 0, 'leftborder').setOrigin(0, 0).setScrollFactor(0);
        this.add.image(game.config.width - borderUISize, 0, 'rightborder').setOrigin(0, 0).setScrollFactor(0);

        // white borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0).setScrollFactor(0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0).setScrollFactor(0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0).setScrollFactor(0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0).setScrollFactor(0);

        this.anims.create({
            key: 'bugwiggle',
            frames: [
                {
                    key: 'bugsprite',
                    frame: "bug1.png"
                },
                {
                    key: 'bugsprite',
                    frame: "bug2.png"
            }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'greenbugwiggle',
            frames: [
                {
                    key: 'greenbugsprite',
                    frame: "greenbug1.png"
                },
                {
                    key: 'greenbugsprite',
                    frame: "greenbug2.png"
            }],
            frameRate: 10,
            repeat: -1
        });



        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0).setScrollFactor(0);

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'bugsprite', 0, 30).setOrigin(0, 0).setScrollFactor(0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'bugsprite', 0, 20).setOrigin(0,0).setScrollFactor(0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'bugsprite', 0, 10).setOrigin(0,0).setScrollFactor(0);

        //start playing animation "bugwiggle" for the spaceship class instances (they extend sprite class)
        this.ship01.play("bugwiggle");
        this.ship02.play("bugwiggle");
        this.ship03.play("bugwiggle");

        this.ship04 = new Spacecraft(this, game.config.width + borderUISize*6, borderUISize*9, 'greenbugsprite', 0, 50).setOrigin(0, 0).setScrollFactor(0);

        this.ship04.play("greenbugwiggle");

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        // this.anims.create({
        //     key: 'spaceshipanim',
        //     frames: this.anims.generateFrameNumbers('spaceshipanim', { start: 0, end: 9, first: 0}),
        //     frameRate: 30
        // });
        this.anims.create({
            key: 'explode1',
            frames: this.anims.generateFrameNumbers('explosion1', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explodecraft',
            frames: this.anims.generateFrameNumbers('explosioncraft', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('explosion2', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode3',
            frames: this.anims.generateFrameNumbers('explosion3', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode4',
            frames: this.anims.generateFrameNumbers('explosion4', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode5',
            frames: this.anims.generateFrameNumbers('explosion5', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = { fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#F3B141', color: '#843605', align: 'right', padding: { top: 5, bottom: 5, }, fixedWidth: 100};
        let timeLeftTextConfig = { fontFamily: 'Courier', fontSize: '18px', backgroundColor: '#41f3cc', color: '#030366', align: 'right', padding: { top: 5, bottom: 5, }, fixedWidth: 120};
        let timeLeftConfig = { fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#41f3cc', color: '#030366', align: 'right', padding: { top: 5, bottom: 5, }, fixedWidth: 40};

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig).setScrollFactor(0);
        this.add.text(borderUISize + borderPadding +385, borderUISize + borderPadding*2 +6, 'Time Left:', timeLeftTextConfig).setScrollFactor(0);
        this.add.text(borderUISize + borderPadding +515, borderUISize + borderPadding*2, (game.settings.timer/1000), timeLeftConfig).setScrollFactor(0);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5).setScrollFactor(0);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5).setScrollFactor(0);
            this.gameOver = true;
        }, null, this);


        this.timeCheck = (Math.round(this.clock.getOverallRemainingSeconds()));
        this.displayTime = this.add.text(borderUISize + borderPadding +515, borderUISize + borderPadding*2, (Math.round(this.clock.getOverallRemainingSeconds())), timeLeftConfig).setScrollFactor(0);


    }

    update() {

        let timeLeftConfig = { fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#41f3cc', color: '#030366', align: 'right', padding: { top: 5, bottom: 5, }, fixedWidth: 40};

        this.newTime = (Math.round(this.clock.getOverallRemainingSeconds())) 
        //set this.newTime to the current remaining seconds rounded. newTime variable used to update time display only when a second has passed, not every update call
        
        if(!(this.newTime == this.timeCheck)){ //if one second has passed update the time display and update timeCheck variable
        this.displayTime = this.add.text(borderUISize + borderPadding +515, borderUISize + borderPadding*2, (Math.round(this.clock.getOverallRemainingSeconds())), timeLeftConfig).setScrollFactor(0);
            this.timeCheck = this.newTime;
        }

        const cam = this.cameras.main
		const speed = 5
		if ((this.cursors.right.isDown) && (!this.p1Rocket.isFiring))
		{
			cam.scrollX += speed
		}
		else if ((this.cursors.left.isDown) && (!this.p1Rocket.isFiring))
		{
			cam.scrollX -= speed
		}

        //create camera movement for arrow keys
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update()
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        else
        {
            if(this.checkCollision(this.p1Rocket, this.ship03)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.p1Rocket, this.ship02)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship02);
            }
            if (this.checkCollision(this.p1Rocket, this.ship01)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship01);
            }
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        let timeLeftConfig = { fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#41f3cc', color: '#030366', align: 'right', padding: { top: 5, bottom: 5, }, fixedWidth: 40};


        
        if(ship === this.ship04)
        { //if ship is faster spacecraft then use correct explosion animation
            this.explosiontype = "explosioncraft";
            this.explodetype = "explodecraft";

            this.clock.elapsed -=3000;            //if you hit a type 04 ship, timer gains 3 seconds

            this.newTime = (Math.floor(this.clock.getElapsed()/1000));
            this.timeCheck = this.newTime;
            this.displayTime = this.add.text(borderUISize + borderPadding +515, borderUISize + borderPadding*2, this.newTime, timeLeftConfig).setScrollFactor(0);

        }
        else
        { // if ship is not spacecraft use a standard explosion
            this.explosionarray = ["explosion1", "explosion2","explosion3","explosion4", "explosion5"];
            this.boomarray = ["explode1", "explode2", "explode3", "explode4", "explode5"]
            this.randomnum = this.getRandomInt(5)
            this.explosiontype = this.explosionarray[this.randomnum];
            this.explodetype = this.boomarray[this.randomnum];
        }

        // temporarily hide ship
        console.log("ship : ", ship);
        ship.alpha = 0;                         

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, this.explosiontype).setOrigin(0, 0).setScrollFactor(0);
        boom.anims.play(this.explodetype);             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        
        // this.sound.play('sfx_explosion');
        this.sound.play(this.explodetype);
      }
}