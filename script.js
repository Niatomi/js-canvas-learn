window.onload = () => {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const flowField = new FlowFieldEffect(ctx, canvas.clientWidth, canvas.height)
  flowField.animate()
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
    this.#draw(this.startX, this.startY)
    this.startX += 20
    this.startY += 10
    requestAnimationFrame(this.animate.bind(this))
  }

}