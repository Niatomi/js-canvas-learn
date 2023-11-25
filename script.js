let flowFieldAnimation;


window.onload = () => {
  canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let flowField = new FlowFieldEffect(ctx, canvas.clientWidth, canvas.height)
  flowField.animate()

  window.addEventListener('resize', () => {
    cancelAnimationFrame(flowFieldAnimation)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let flowField = new FlowFieldEffect(ctx, canvas.clientWidth, canvas.height)
    flowField.animate()
  })
}


class FlowFieldEffect {
  #ctx;
  #width
  #height

  constructor(ctx, width, height) {
    this.#ctx = ctx
    this.#ctx.strokeStyle = 'red'
    this.#width = width
    this.#height = height

    this.startX = 0
    this.startY = 0
  }

  #draw(x, y) {
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y)
    this.#ctx.lineTo(x + 100, y + 100)
    this.#ctx.stroke()
  }

  animate() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height)
    this.#draw(this.startX, this.startY)
    this.startX += 2
    this.startY += 1.5
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
  }

}