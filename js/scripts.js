const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Paint canvas every second
setInterval(paintCanvas, 1000);

function paintCanvas() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw circles
  outerCircleOut();
  outerCircleIn();
  centerCircle();

  function outerCircleOut() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  }

  function outerCircleIn() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 14, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  }

  // Draw small center circle
  function centerCircle() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 4, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  }
}
