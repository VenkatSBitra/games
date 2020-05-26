class Play extends Phaser.Scene {
  constructor() {
    super("play");
  }

  init(boardSize) {
    this.boardSize = boardSize
    this.gamePlay = true
  }

  preload() {
    for(let i = 0; i < this.boardSize * this.boardSize - 1; i++) {
      this.load.image(`${i + 1}`, `assets/${i + 1}.png`)
    }
    this.puzzle = []
    this.originalPuzzle = []
    for(let row = 0; row < this.boardSize; row++) {
      this.puzzle.push([])
      this.originalPuzzle.push([])
      for(let col = 0; col < this.boardSize; col++) {
        this.puzzle[row].push(this.boardSize * row + col + 1)
        this.originalPuzzle[row].push(this.puzzle[row][col])
      }
    }
    this.tileDimension = config.width / this.boardSize
    this.graphics = this.add.graphics()
    this.blankRow = this.boardSize - 1
    this.blankCol = this.boardSize - 1
    switch (this.boardSize) {
      case 3:
        this.randomize(10)
        break
      case 4:
        this.randomize(100)
        break
      case 5:
        this.randomize(400)
        break
      case 6:
        this.randomize(1000)
        break
      default:
        break
    }
  }

  randomize(count) {
    for(let i = 0; i < count; i++) {
      let k = Math.random() > 0.5 ? 1 : -1
      if(Math.random() > 0.5) {
        if(this.blankRow + k >= this.boardSize || this.blankRow + k < 0) i--
        else this.swap(this.blankRow + k, this.blankCol)
      } else {
        if(this.blankCol + k >= this.boardSize || this.blankCol + k < 0) i--
        else this.swap(this.blankRow, this.blankCol + k)
      }
    }
  }

  swap(r, c) {
    const t = this.puzzle[r][c]
    this.puzzle[r][c] = this.puzzle[this.blankRow][this.blankCol]
    this.puzzle[this.blankRow][this.blankCol] = t
    this.blankCol = c
    this.blankRow = r
  }

  create(boardSize) {
    for(let row = 0; row < this.boardSize; row++) {
      for(let col = 0; col < this.boardSize; col++) {
        if(this.puzzle[row][col] !== this.boardSize * this.boardSize) {
          const tile = this.add.image(col * this.tileDimension, row * this.tileDimension,`${this.puzzle[row][col]}`).setOrigin(0)
          tile.setScale(this.tileDimension / tile.height)
          tile.setInteractive()
        }
      }
    }
    this.input.on('gameobjectdown', (pointer, gameObject) => {
      if(this.gamePlay) {
        const x = Math.floor(pointer.x / this.tileDimension)
        const y = Math.floor(pointer.y / this.tileDimension)
        if ((Math.abs(x - this.blankCol) === 1 && y - this.blankRow === 0) || (Math.abs(y - this.blankRow) === 1 && x - this.blankCol === 0)) {
          gameObject.x = this.blankCol * this.tileDimension
          gameObject.y = this.blankRow * this.tileDimension
          this.swap(y, x)
        }
      }
    })
  }
  update() {
    if(JSON.stringify(this.puzzle) === JSON.stringify(this.originalPuzzle)) {
      this.add.text((this.boardSize - 1) * this.tileDimension + this.tileDimension / 2, (this.boardSize - 1) * this.tileDimension + this.tileDimension / 2, "You\nWON!!!", {
        fill: "#000",
        fontSize: 25,
        align: "center",
        justifyContent: "center"
      }).setOrigin(0.5)
      if(this.gamePlay) this.time.addEvent({
        delay: 5000,
        callback: () => this.scene.start('start'),
        callbackScope: this,
        loop: false
      })
      this.gamePlay = false
    }
  }
}
