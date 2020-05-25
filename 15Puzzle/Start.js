class Start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  create() {
    this.gameMode = null
    this.graphics = this.add.graphics()
    this.graphics.fillStyle(0xe6c1c1)

    let mode = this.add.text(config.width / 2, config.height / 2 - 150, "Please Select Game Mode...",
      {fill: "#000", align: "center", fontSize: 20}).setOrigin(0.5)

    let game3 = new Phaser.Geom.Rectangle((config.width - 100) / 2 - 80, (config.height - 50) / 2 - 25, 100 * window.devicePixelRatio, 50 * window.devicePixelRatio)
    this.graphics.fillRectShape(game3)
    this.add.text(game3.centerX, game3.centerY, "3x3", {fill: "#000", fontSize: 30}).setOrigin(0.5)

    let game4 = new Phaser.Geom.Rectangle((config.width - 100) / 2 + 80, (config.height - 50) / 2 - 25, 100 * window.devicePixelRatio, 50 * window.devicePixelRatio)
    this.graphics.fillRectShape(game4)
    this.add.text(game4.centerX, game4.centerY, "4x4", {fill: "#000", fontSize: 30}).setOrigin(0.5)

    let game5 = new Phaser.Geom.Rectangle((config.width - 100) / 2 - 80, (config.height - 50) / 2 + 50, 100 * window.devicePixelRatio, 50 * window.devicePixelRatio)
    this.graphics.fillRectShape(game5)
    this.add.text(game5.centerX, game5.centerY, "5x5", {fill: "#000", fontSize: 30}).setOrigin(0.5)

    let game6 = new Phaser.Geom.Rectangle((config.width - 100) / 2 + 80, (config.height - 50) / 2 + 50, 100 * window.devicePixelRatio, 50 * window.devicePixelRatio)
    this.graphics.fillRectShape(game6)
    this.add.text(game6.centerX, game6.centerY, "6x6", {fill: "#000", fontSize: 30 * window.devicePixelRatio}).setOrigin(0.5)

    this.graphics.fillStyle(0x4281f5)
    let rect = new Phaser.Geom.Rectangle((config.width - 200) / 2, (config.height - 50) / 2 + 150, 200 * window.devicePixelRatio, 50 * window.devicePixelRatio)
    this.graphics.fillRectShape(rect)

    this.add.text(rect.centerX, rect.centerY, "Start Game", {fill: "#fff", fontSize: 30 * window.devicePixelRatio}).setOrigin(0.5)
    this.input.on('pointerup', pointer => {
      const x = pointer.x
      const y = pointer.y
      if(x >= game3.left && x <= game3.right && y >= game3.top && y <= game3.bottom) {
        this.gameMode = 3
        mode.text = "Game Mode 3x3 selected.\nPress Start Game Button to continue."
      }
      if(x >= game4.left && x <= game4.right && y >= game4.top && y <= game4.bottom) {
        this.gameMode = 4
        mode.text = "Game Mode 4x4 selected.\nPress Start Game Button to continue."
      }
      if(x >= game5.left && x <= game5.right && y >= game5.top && y <= game5.bottom) {
        this.gameMode = 5
        mode.text = "Game Mode 5x5 selected.\nPress Start Game Button to continue."
      }
      if(x >= game6.left && x <= game6.right && y >= game6.top && y <= game6.bottom) {
        this.gameMode = 6
        mode.text = "Game Mode 6x6 selected.\nPress Start Game Button to continue."
      }
      if(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        if(this.gameMode) this.scene.start('play', this.gameMode)
        else mode.text = "Game Mode not selected.\n\nPlease select a mode \nby clicking one of the three buttons below."
      }
    })
  }
}
