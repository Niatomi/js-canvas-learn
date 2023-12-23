window.onload = () => {
  canvas = document.getElementById('canvas1')
  canvas.style.background = 'black'

  const context = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const s = new Board(context)
  
  addEventListener('keyup', (e) => {
    s.snakeMove(e.key)
  })
  s.update()
}


class Snake {
  #ctx
  #width
  #height

  #bannedMoves = {
    "w": "s",
    "a": "d",
    "s": "w",
    "d": "a",
    "ArrowUp": "ArrowDown",
    "ArrowLeft": "ArrowRight",
    "ArrowDown": "ArrowUp",
    "ArrowRight": "ArrowLeft"
  }
  #moveValues = {
    "w": [0, -100],
    "a": [-100, 0],
    "s": [0, 100],
    "d": [100, 0],
    "ArrowUp": [0, -100],
    "ArrowLeft": [-100, 0],
    "ArrowDown": [0, 100],
    "ArrowRight": [100, 0],
  }

  constructor(ctx) {
    this.#ctx = ctx
    this.#width = window.innerWidth
    this.#height = window.innerHeight

    this.prevTime = 0
    this.interval = 200

    this.prevApple = 0
    this.appleInterval = 6000
    this.apples = []
    
    this.snakeSize = 2
    this.snakeDir = 'w'
    this.snakePath = [[700, 500], [900, 600]]
    this.#generateApple()
  }

  #draw() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height)
    for (let s of this.snakePath) {
      const [x, y] = s
      this.#ctx.fillStyle = 'green'
      this.#ctx.fillRect(x, y, 100, 100)
    }
    for (let s of this.apples) {
      const [x, y] = s
      this.#ctx.fillStyle = 'red'
      this.#ctx.fillRect(x, y, 100, 100)
    }
  }

  #redraw() {
    if (this.#checkSnake()) 
      this.#restart()
    this.#checkApple()
    if (this.#checkBorder())
      this.#restart()
    this.#draw()
  }

  snakeMove(dir) {
    if (!Object.keys(this.#moveValues).includes(dir)) 
      return 0
    if (dir === this.#bannedMoves[this.snakeDir])
      return 0
  
    this.snakeDir = dir
    const [move_x, move_y] = this.#moveValues[this.snakeDir]
    let [x, y] = this.snakePath[this.snakePath.length - 1]
    x += move_x
    y += move_y
    this.snakePath.push([x, y])
    this.snakePath.shift()
    this.#redraw()
  }

  #checkApple() {
    for (const s of this.snakePath) {
      const [x, y] = s
      for (let i in this.apples) {
        if ((x === this.apples[i][0]) && (y === this.apples[i][1])) {
          console.log(x, y);
          this.snakePath.unshift(this.snakePath[0])
          this.apples.splice(i, 1)
          if (this.apples.length === 0) {
            this.#generateApple()
          }
        }
      }
    }
  }
  
  #checkSnake() {
    let [x, y] = this.snakePath[this.snakePath.length - 1]
    for (let s of this.snakePath.slice(0, this.snakePath.length - 1)) {
      if (x === s[0] && y === s[1]) {
        console.log(x, y,this.snakePath)
        return true
      }
    }
  }

  #checkBorder() {
    let [x, y] = this.snakePath[this.snakePath.length - 1]
    if (x > this.#width || x < 0) 
      return true
    if (y > this.#height || y < 0) 
      return true
    return false
  }

  #generateApple() {
    let isAppleGenerated = false
    while (!isAppleGenerated) {
      let x = Math.floor(Math.random() * window.innerWidth) + 0;
      let y = Math.floor(Math.random() * window.innerHeight) + 0;
      x = x - x % 100
      y = y - y % 100

      for (let [s_x, s_y] of this.snakePath) {
        if ((s_x === x) && (s_y === y)) {
          isAppleGenerated = false
          break
        } 
          isAppleGenerated = true
      }

      if (isAppleGenerated) {
        this.apples.push([x, y])
      }
    }
  }

  #restart() {
    this.prevApple = 0
    this.appleInterval = 10000
    this.apples = [[500, 600]]

    this.snakeSize = 2
    this.snakeDir = 'd'
    this.snakePath = [[0, 0], [100, 0]]
  }

  start(timestamp) {
    const delta = timestamp - this.prevTime
    if (delta > this.interval) {
      this.snakeMove(this.snakeDir)
      if (this.#checkSnake()) 
        this.#restart()
      this.#checkApple()
      if (this.#checkBorder())
        this.#restart()
      this.#draw()
      this.prevTime = timestamp

      this.appleDelta = timestamp - this.prevApple
      if (this.appleDelta > this.appleInterval) {
        this.#generateApple()
        this.prevApple = timestamp
      }
    }
    requestAnimationFrame(this.start.bind(this))
  }

  

}