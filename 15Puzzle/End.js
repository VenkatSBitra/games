class End extends Phaser.Scene {
  constructor() {
    super("end");
  }

  create() {
    this.add.text(config.width / 2, config.height / 2, "You WON!!!", {fill: "#000", fontSize: 50}).setOrigin(0.5)
  }
}
