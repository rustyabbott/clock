const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let secondHandLength = canvas.width / 2 - 16;

// Paint canvas every second
setInterval(paintCanvas, 1000);

function paintCanvas() {
  let date = new Date();

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw circles & notches
  outerCircleOut();
  outerCircleIn();
  centerCircle();
  hourNotches();
  minuteNotches();
  hourHand();
  minuteHand();
  secondHand();

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

  // Draw the hour notches
  function hourNotches() {
    for (let i = 0; i < 12; i++) {
      let angle = (i - 3) * (Math.PI * 2) / 12;
      ctx.beginPath();
      let x1 = canvas.width / 2 + Math.cos(angle) * secondHandLength;
      let y1 = canvas.height / 2 + Math.sin(angle) * secondHandLength;
      let x2 = canvas.width / 2 + Math.cos(angle) * (secondHandLength - secondHandLength / 8);
      let y2 = canvas.height / 2 + Math.sin(angle) * (secondHandLength - secondHandLength / 8);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  // Draw the minute notches
  function minuteNotches() {
    for (let i = 0; i < 60; i++) {
      let angle = (i - 3) * (Math.PI * 2) / 60;
      ctx.beginPath();
      let x1 = canvas.width / 2 + Math.cos(angle) * secondHandLength;
      let y1 = canvas.width / 2 + Math.sin(angle) * secondHandLength;
      let x2 = canvas.width / 2 + Math.cos(angle) * (secondHandLength - secondHandLength / 30);
      let y2 = canvas.width / 2 + Math.sin(angle) * (secondHandLength - secondHandLength / 30);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  // Draw the hour hand
  function hourHand() {
    let hour = date.getHours();
    let min = date.getMinutes();
    let angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secondHandLength / 1.6), canvas.height / 2 + Math.sin(angle) * secondHandLength / 1.6);
    ctx.stroke();
  }

  // Draw the minute hand
  function minuteHand() {
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    console.log('The time is ' + hour + ':' + min + ':' + sec);
    let angle = ((Math.PI * 2) * (min / 60) - ((Math.PI * 2)) / 4);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secondHandLength / 1.3), canvas.height / 2 + Math.sin(angle) * secondHandLength / 1.3);
    ctx.stroke();
  }

  // Draw the second hand
  function secondHand() {
    let sec = date.getSeconds();
    let angle = ((Math.PI * 2) * (sec / 60)) - Math.PI * 2 / 4;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo((canvas.width / 2 - Math.cos(angle) * 20), canvas.height / 2 - Math.sin(angle) * 22);
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secondHandLength), canvas.height / 2 + Math.sin(angle) * secondHandLength);
    ctx.stroke();
  }
}
