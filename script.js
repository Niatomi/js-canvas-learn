window.onload = () => {
  canvas = document.getElementById('canvas1')
  canvas.style.background = 'black'

  const context = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const b = new Board(context)
  
  addEventListener('keydown', (e) => {
    b.movePong(e.key)
  })
  b.update()
}


class Ball {
  #ctx
  #x
  #y 
  #radius
  #velocityX
  #velocityY

  constructor(ctx, x, y) {
    this.#ctx = ctx
    this.#x = x
    this.#y = y
    this.#radius = 10

    this.#velocityX = 10
    this.#velocityY = 10
  }

  recountVelocity(x2, y2) {

    this.getX() + this.getRadius()

  }

  getX() {
    return this.#x
  }

  getY() {
    return this.#y
  }

  getRadius() {
    return this.#radius
  }

  moveBall() {
    this.#x += this.#velocityX
    this.#y += this.#velocityY
  }

  draw() {
    this.#ctx.beginPath();
    this.#ctx.arc(this.#x, this.#y, this.#radius, 0, 2 * Math.PI, false);
    this.#ctx.fillStyle = 'green';
    this.#ctx.fill();
    this.#ctx.lineWidth = 5;
    this.#ctx.strokeStyle = '#003300';
    this.#ctx.stroke();
  }


}

class Brick {
  #ctx
  #x
  #y 
  #xSize
  #ySize

  constructor(ctx, x, y, xSize, ySize) {
    this.#ctx = ctx
    this.#x = x
    this.#y = y
    this.#xSize = xSize
    this.#ySize = ySize
  }

  draw() {
    this.#ctx.beginPath()
    this.#ctx.moveTo(this.#x  , this.#y)
    this.#ctx.lineTo(this.#x + this.#xSize - 1, this.#y) 

    this.#ctx.strokeStyle = 'red'
    this.#ctx.lineWidth = 2
    this.#ctx.lineCap = 'round'
    
    this.#ctx.stroke();
  }

}


class Bricks {
  #ctx
  #y_percent
  #density_x
  #bricks
  #width
  #height

  constructor(ctx, y_percent, density_x, width, height) {
    this.#ctx = ctx
    this.#y_percent = y_percent
    this.#density_x = density_x

    this.#width = width
    this.#height = height
    this.margin = 100
    this.betweenSpace = 30
    
    this.brickYHeight = 1
    this.#bricks = []
    this.#generateBricks()
  }

  #generateBricks() {
    const availableXSpace = this.#width - this.margin * 2
    let brickXSize = availableXSpace/this.#density_x - (availableXSpace/(this.betweenSpace * this.#density_x))
    
    for (let y = 0; y <= 100; y += 20) {
      for (let x = 0; x < this.#density_x; x += 1) {
        this.#bricks.push(
          new Brick(
            this.#ctx, 
            this.margin + (x * brickXSize) + this.betweenSpace, 
            y + this.margin, 
            brickXSize - this.betweenSpace, 
            100 * y))
      }
    }
  }


  draw() {
    for (const brick of this.#bricks) {
      brick.draw()
    }
  }

}

class Pong {
  #ctx
  #x
  #y 
  #size

  #width

  constructor(ctx, x, y, size, width) {
    this.#ctx = ctx
    this.#x = x
    this.#y = y
    this.#size = size
    this.#width = width
  }

  move(x) {
    if ((this.#x + x + this.#size < this.#width) && (this.#x + x > 0))
    this.#x += x
  }

  getX() {
    return this.#x
  }

  getY() {
    return this.#y
  }

  getSize() {
    return this.#size
  }

  draw() {
    this.#ctx.beginPath()
    this.#ctx.moveTo(this.#x, this.#y)
    this.#ctx.lineTo(this.#x + this.#size, this.#y)

    this.#ctx.strokeStyle = '#1e00ffdc'
    this.#ctx.lineWidth = 10
    this.#ctx.lineCap = 'round'
    
    this.#ctx.stroke();
  }
}

class Board {
  #ctx
  #width
  #height

  constructor(ctx) {
    this.#ctx = ctx
    this.#width = window.innerWidth
    this.#height = window.innerHeight

    this.prevTime = 0
    this.interval = 1000/60

    this.pongSize = 200
    this.pong = new Pong(
      this.#ctx, 
      this.#width/2 - this.pongSize/2, 
      this.#height - 100, 
      this.pongSize, 
      this.#width)
    this.bricks = new Bricks(this.#ctx, 20, 24, this.#width, this.#height)
    this.ball = new Ball(this.#ctx, 100, 100)
  }

  movePong(key) {
    if (key === 'ArrowLeft') {
      this.pong.move(-10)
    } else if (key === 'ArrowRight') {
      this.pong.move(10)
    }

  }

  #draw() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height)
    this.pong.draw()
    this.bricks.draw()
    this.ball.draw()
  }

  #checkBallCollision() {
    if ((this.ball.getY() - this.ball.getRadius()) === this.pong.getY()) {
      if (this.ball.getX() > this.pong.getX() && this.ball.getX() < this.pong.getX() + this.pong.getSize())
      console.log('collided');
    }
  }

  update(timestamp) {
    const delta = timestamp - this.prevTime
    if (delta > this.interval) {
      this.ball.moveBall()
      this.#checkBallCollision()
      this.#draw()
      this.prevTime = timestamp
    }
    requestAnimationFrame(this.update.bind(this))
  }

}