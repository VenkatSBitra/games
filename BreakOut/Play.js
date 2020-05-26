class Play extends Phaser.Scene {
  constructor() {
    super('play');
  }

  preload() {
    this.load.image('paddle', 'assets/paddle.png')
    this.load.image('ball', 'assets/ball.png')
    this.load.image('gtile', 'assets/gtile.png')
    this.load.image('rtile', 'assets/rtile.png')
    this.load.image('otile', 'assets/otile.png')
    this.keys = this.input.keyboard.addKeys({
      left: 'left',
      right: 'right',
      space: 'space'
    });
    this.gameStart = false
    this.physics.world.checkCollision.down = false
    this.layers = []
  }

  generateLayer(tileType, y, tileCount) {
    let tileWidth = (config.width) / tileCount
    let height = config.height * 0.025 + y * (config.height * 0.05)
    console.log(this.layers)
    this.layers.push(this.physics.add.group({
      key: tileType,
      repeat: tileCount - 1,
      setXY: {
        x: tileWidth / 2,
        y: height,
        stepX: (config.width) / tileCount
      }
    }))
    this.layers[this.layers.length - 1].children.iterate(child => {
      child.displayHeight = config.height * 0.05
      child.displayWidth = tileWidth
      child.setImmovable(true)
    })
  }

  tileCount() {
    let count = 0;
    for(let i = 0; i < this.layers.length; i++) {
      count += this.layers[i].countActive()
    }
    return count
  }

  create() {
    this.paddle = this.physics.add.image(config.width / 2, config.height - 50, 'paddle')
    this.paddle.displayWidth = config.width * 0.1
    this.paddle.displayHeight = config.height * 0.03
    this.paddle.setCollideWorldBounds(true)
    this.paddle.setFriction(0, 0)
    this.paddle.setImmovable(true)

    for(let i = 0; i < 9; i++) {
      let tile
      if(i % 3 === 0) tile = 'gtile'
      else if(i % 3 === 1) tile = 'rtile'
      else tile = 'otile'
      this.generateLayer(tile, i, 15)
    }

    this.ball = this.physics.add.image(config.width / 2, config.height - 80, 'ball')
    this.ball.setScale(0.5)
    this.ball.setCircle(this.ball.width / 2)
    this.ball.setBounce(1, 1)
    this.ball.setCollideWorldBounds(true)
    this.ball.setFriction(0, 0)

    this.physics.add.collider(this.ball, this.paddle, null, null, this)
    this.physics.add.collider(this.ball, this.layers, (ball, brick) => {brick.destroy(); console.log(this.tileCount())}, null, this)
  }

  update() {
    this.paddle.setVelocityX(0)
    if(!this.gameStart) {
      this.ball.setVelocityX(0)
      if(this.keys.space.isDown) {
        this.gameStart = true
        let n = Math.random() * 60 + 170
        let s = Math.random() * 20 + 280
        let k = Math.sqrt(s*s - n*n)
        this.ball.setVelocity(n, Math.random() > 0.5 ? k : -k)
      }
    }
    if(this.ball.body.speed < 250 && this.ball.body.speed !== 0) {
      let k = Math.sqrt(290*290 - 200*200)
      this.ball.setVelocityX(this.ball.body.velocity.x < 0 ? -200 : 200)
      this.ball.setVelocityY(this.ball.body.velocity.y < 0 ? -k : k)
    }
    if(this.keys.left.isDown) {
      this.paddle.setVelocityX(-200)
      if(!this.gameStart) this.ball.setVelocityX(-200)
    } else if(this.keys.right.isDown) {
      this.paddle.setVelocityX(200)
      if(!this.gameStart) this.ball.setVelocityX(200)
    }
    if(this.ball.y > config.height) {
      this.gameStart = false
      this.ball.x = this.paddle.x = config.width / 2
      this.ball.y = config.height - 80
      this.paddle.y = config.height - 50
      this.ball.setVelocity(0, 0)
    }
  }
}
