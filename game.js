const config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 900, 
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }, // Increased gravity for a snappier jump
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
    this.load.image('ball', 'https://labs.phaser.io/assets/sprites/shinyball.png');
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
}

function create() {
    // 1. Draw the border
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0x00ff00);
    graphics.strokeRect(0, 0, 1440, 900);

    this.add.text(20, 35, 'ULTRA-WIDE CANVAS (1440x900)', {
        fill: '#00ff00',
        fontFamily: 'Arial',
        fontSize: '24px',
    });

    // 2. Create the Floor/Platforms
    this.platforms = this.physics.add.staticGroup();
    // Placing a long platform at the bottom
    this.platforms.create(720, 880, 'ground').setScale(4, 1).refreshBody();

    // 3. Create the Player
    this.player = this.physics.add.sprite(720, 400, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(false); // False so we can wrap around screen

    // 4. Create the balls loop
    const balls = this.physics.add.group();
    for (let i = 0; i < 10; i++) {
        const x = Phaser.Math.Between(50, 1390);
        const y = Phaser.Math.Between(20, 400); // Changed to upper half of screen
        const ball = balls.create(x, y, 'ball');
        ball.setCollideWorldBounds(true);
        ball.setBounce(1);
        ball.setVelocity(
            Phaser.Math.Between(-200, 200),
            Phaser.Math.Between(-100, 100)
        );
    }

    // 5. Physics Collisions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(balls, this.platforms);
    this.physics.add.collider(balls, balls);
    // Optional: Player hits balls
    this.physics.add.collider(this.player, balls);

    // 6. Setup Controls
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    const speed = 300;
    const jumpForce = -500;

    // Horizontal Movement
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(speed);
    } else {
        this.player.setVelocityX(0);
    }

    // Jumping (Only if touching the floor or a platform)
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(jumpForce);
    }

    // Screen Wrapping
    // If player goes off the left (0) or right (1440), they reappear on the other side
    this.physics.world.wrap(this.player, 16);
}