const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1440,
        height: 900,
    },
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

}

function update() {
    player.x += 1;
}

function class_selector() {
    player = this.add.image(400, 300, "square");
    this.add.text(400, 300, 'Hello World',)
}