const s = Math.min(window.innerHeight, window.innerWidth)

const config = {
  type: Phaser.AUTO,
  width: s / window.devicePixelRatio > 540 ? 540 : s,
  height: s / window.devicePixelRatio > 540 ? 540 : s,
  scene: [Start, Play],
  backgroundColor: 0xffffff,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

const game = new Phaser.Game(config)
