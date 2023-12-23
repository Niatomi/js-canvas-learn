let flowFieldAnimation;
const mouseCords = {
  x: 0,
  y: 0
}


window.onload = () => {
  canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  let flowField = new FlowFieldEffect(ctx, canvas.clientWidth, canvas.height)
  flowField.animate()

  window.addEventListener('mousemove', (evt) => {
    mouseCords.x = evt.clientX
    mouseCords.y = evt.clientY
    // cancelAnimationFrame(flowFieldAnimation)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // let flowField = new FlowFieldEffect(ctx, canvas.clientWidth, canvas.height)
    flowField.animate()
  })
}


class FlowFieldEffect {
  #ctx;
  #width
  #height
  lastTime

  constructor(ctx, width, height) {
    this.#ctx = ctx
    this.#ctx.strokeStyle = 'red'
    this.#ctx.lineWidth = 5
    this.#width = width
    this.#height = height
    this.lastTime

    this.startX = 0
    this.startY = 0

    this.interval = 1000/60
    this.timer = 0
  }

  #draw(x, y) {
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y)
    this.#ctx.lineTo(mouseCords.x, mouseCords.y)
    this.#ctx.stroke()
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp
    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height)
      this.#draw(this.#width/2, this.#height/2)
      this.timer = 0
    }
    this.timer += deltaTime
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
  }

}