const s = Math.min(window.innerHeight, window.innerWidth)

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 540,
  scene: [Start, Play],
  backgroundColor: 0xffffff,
  scale: {
    scale: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

const game = new Phaser.Game(config)
