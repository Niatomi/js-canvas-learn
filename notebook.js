window.onload = () => {
  canvas = document.getElementById('canvas1')
  const context = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  
  context.beginPath();
  context.strokeStyle = 'red'
  context.moveTo(window.innerWidth - 100, 0);
  context.lineTo(window.innerWidth - 100, window.innerWidth);
  context.stroke();
  
  let y = 40
  context.strokeStyle = 'blue'
  context.beginPath();
  context.moveTo(0, y);
  context.lineTo(window.innerWidth, y);
  context.stroke();
  y += 40

  const betweenSpace = 20
  for (; y < window.innerHeight; y += 80) {
    context.strokeStyle = 'blue'
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(window.innerWidth, y);
    context.stroke();


    context.beginPath();
    context.moveTo(0, y+betweenSpace);
    context.lineTo(window.innerWidth, y+betweenSpace);
    context.stroke();
  } 

  let x = 80
  for (; x < window.innerWidth * 2; x += 200) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(0, x);
    context.stroke();
  }

}
