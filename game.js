const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#222222",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;

function preload() {
    // Load an image
    this.load.image("square", "https://labs.phaser.io/assets/sprites/block.png");
}

function create() {
    // Add image to screen
    player = this.add.image(400, 300, "square");
}

function update() {
    // Move right every frame
    player.x += 1;
}