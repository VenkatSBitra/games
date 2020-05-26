const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Play],
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

const game = new Phaser.Game(config)
