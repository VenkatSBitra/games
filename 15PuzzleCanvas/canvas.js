canvas = document.getElementById('canvas')

canvas.width = 400
canvas.height = 400

var ctx = canvas.getContext('2d')
var click = false
var p

class Tile {
    constructor(val, ind) {
        this.x = 100 * (ind % 4)
        this.y = Math.floor(ind / 4) * 100
        this.val = val
        this.ind = ind
        this.width = 100
        this.height = 100
        this.tileColour = "skyblue"
        this.tileBorder = "black"
        this.textColour = "black"
        this.font = "50px serif"
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.tileColour
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.tileBorder
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.beginPath()
        ctx.fillStyle = this.textColour
        ctx.font = this.font
        ctx.fillText(this.val, this.x + (this.width - ctx.measureText(this.val).width) / 2, this.y + this.height / 2 + 15)
    }

    updateIndex(ind) {
        this.ind = ind
        this.x = 100 * (ind % 4)
        this.y = Math.floor(ind / 4) * 100
    }
}

class Puzzle {
    constructor() {
        this.size = 4
        this.puzzle = []
        for(let i = 1; i < 17; i++) {
            this.puzzle.push(new Tile(i, i - 1))
        }
        this.blank = this.puzzle[15]
        const x = [100, -100, 0, 0]
        const y = [0, 0, 100, -100]
        for(let i = 0; i < 100; i++) {
            const i = Math.floor(Math.random() * 4)
            this.swap(this.blank.x + x[i], this.blank.y + y[i])
        }
        this.textColour = "black"
        this.font = "50px serif"
    }

    draw() {
        if(!this.check())
            for(let i = 0; i < this.puzzle.length; i++) {
                if(this.puzzle[i] !== this.blank) this.puzzle[i].draw()
            }
        else {
            ctx.clearRect(0, 0, 400, 400)
            ctx.font = this.font
            ctx.fillStyle = this.textColour
            ctx.fillText("YOU WON!!", 50, 200)
            click = true
        }
    }

    swapTiles(dt) {
        const i = this.puzzle.indexOf(this.blank)
        const k = this.puzzle[i]
        this.puzzle[i] = this.puzzle[i + dt]
        this.puzzle[i + dt] = k
        this.puzzle[i].updateIndex(i)
        this.puzzle[i + dt].updateIndex(i + dt)
        this.blank = this.puzzle[i + dt]
    }

    swap(x, y) {
        if(!click) {
            x = Math.floor(x / 100) * 100
            y = Math.floor(y / 100) * 100
            if(x < 0 || x > 300 || y < 0 || y > 300) return
            if (x + this.blank.width === this.blank.x && y === this.blank.y) {
                this.swapTiles(-1)
            } else if (x - this.blank.width === this.blank.x && y === this.blank.y) {
                this.swapTiles(+1)
            } else if (x === this.blank.x && y + this.blank.height === this.blank.y) {
                this.swapTiles(-4)
            } else if (x === this.blank.x && y - this.blank.height === this.blank.y) {
                this.swapTiles(+4)
            }
        }
    }

    check() {
        for (let i = 0; i < 16; i++) {
            if (this.puzzle[i].val !== i + 1) {
                return false
            }
        }
        return true
    }
}

setup = () => {
    p = new Puzzle()
}

update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    p.draw()
    requestAnimationFrame(update)
}

canvas.addEventListener('click', event => p.swap(event.x, event.y))

window.onload = function () {
    setup()
    update()
}


/*

swap = (a, b) => {
    const k = puzzle[a]
    puzzle[a] = puzzle[b]
    puzzle[b] = k
}

for(let i = 0; i < 16; i++) {
    const k = [-4, +4, -1, +1]
    const l = Math.floor(Math.random() * 4)
    if(index + k[l] < 0 || index + k[l] > 15) i--;
    else {
        console.log(index, index + k[l])
        console.log(puzzle)
        swap(index, index + k[l])
        console.log(puzzle[index + k[l]] , " swaped by ", puzzle[index])
        index = index + k[l]
    }
}

for(let i = 0; i < 17; i++) {
    if(puzzle[i] !== 16)
        drawRectwithText((i % 4) * 100, Math.floor(i / 4) * 100, 100, 100, "skyblue", puzzle[i])
}

getIndexFromClick = (x, y) => ((Math.floor(y / 100)) * 4 + Math.floor(x / 100))

canvas.addEventListener('click', event => {
    if(!click){
        click = true
        console.log(event)
        const k = getIndexFromClick(event.x, event.y)
        if(index - 4 === k){
            let x = (k % 4) * 100
            let y = Math.floor(k / 4) * 100
            ctx.clearRect(x, y, 100, 200)
            drawRectwithText(x, y + 100, 100, 100, "skyblue", puzzle[k])
            swap(index, k)
            index = k
            console.log(puzzle)
        }else if(index + 4 === k){
            let x = (k % 4) * 100
            let y = Math.floor(k / 4) * 100
            ctx.clearRect(x, y - 100, 100, 200)
            drawRectwithText(x, y - 100, 100, 100, "skyblue", puzzle[k])
            swap(index, k)
            index = k
            console.log(puzzle)
        }else if(index - 1 === k){
            let x = (k % 4) * 100
            let y = Math.floor(k / 4) * 100
            ctx.clearRect(x, y, 200, 100)
            drawRectwithText(x + 100, y, 100, 100, "skyblue", puzzle[k])
            swap(index, k)
            index = k
            console.log(puzzle)
        }else if(index + 1 === k){
            let x = (k % 4) * 100
            let y = Math.floor(k / 4) * 100
            ctx.clearRect(x - 100, y, 200, 100)
            drawRectwithText(x - 100, y, 100, 100, "skyblue", puzzle[k])
            swap(index, k)
            index = k
            console.log(puzzle)
        }
        if(JSON.stringify(puzzle) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])){
            ctx.clearRect(0, 0, 400, 400)
            drawRectwithText(50, 150, 300, 100, "skyblue", "You WON!!")
            click = true
        } else {
            click = false
        }
    }
})*/
