const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const button = document.getElementsByTagName('button');
let secondHandLength = canvas.width / 2 - 16;
let toggleDark = true;
let toggleLight = false;
let toggleWild = false;
let footerDate = new Date();
let dd = footerDate.getDate();
let mm = footerDate.getMonth() + 1;
let yyyy = footerDate.getFullYear();

// Paint canvas every second
setInterval(paintCanvas, 1000);

// Main canvas function
function paintCanvas() {
  let date = new Date();

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Toggle clock styles based on theme
  if (toggleLight === true) {
    ctx.strokeStyle = '#000';
  } else if (toggleDark === true){
    ctx.strokeStyle = '#fff';
  }

  // Draw circles & notches
  outerCircleOut();
  outerCircleIn();
  centerCircle();
  hourNotches();
  minuteNotches();
  numbers();
  hourHand();
  minuteHand();
  secondHand();

  function outerCircleOut() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function outerCircleIn() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 14, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Draw small center circle
  function centerCircle() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 4, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.stroke();
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
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
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
      if (toggleDark === true) {
        ctx.strokeStyle = '#1a9af9';
      } else if (toggleLight === true) {
        ctx.strokeStyle = '#000';
      }
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // Draw numbers
  function numbers() {
    for (let i = 1; i < 13; i++) {
      let angle = (i - 3) * (Math.PI * 2) / 12;
      let x = canvas.width / 2 + Math.cos(angle) * secondHandLength / 1.25;
      let y = canvas.height / 2 + Math.sin(angle) * secondHandLength / 1.25;
      ctx.font = '16px arial';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      toggleDark === true ? ctx.fillStyle = '#fff' : ctx.fillStyle = '#000';
      ctx.fillText(i, x, y);
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
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  // Draw the minute hand
  function minuteHand() {
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let angle = ((Math.PI * 2) * (min / 60) - ((Math.PI * 2)) / 4);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secondHandLength / 1.3), canvas.height / 2 + Math.sin(angle) * secondHandLength / 1.3);
    ctx.lineWidth = 2;
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
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff3300';
    ctx.stroke();
  }
}

// Dark theme
function darkTheme() {
  toggleDark = true;
  toggleLight = false;
  toggleWild = false;
  document.body.style.backgroundColor = '#191919';
  document.body.style.color = '#fff';
  for (let i = 0; i < 3; i++) {
    button[i].className = 'dark';
  }
}

// Light theme
function lightTheme() {
  toggleLight = true;
  toggleDark = false;
  toggleWild = false;
  document.body.style.backgroundColor = '#e5e5e7';
  document.body.style.color = '#000';
  for (let i = 0; i < 3; i++) {
    button[i].className = 'light';
  }
}

// Today's date in the footer
document.getElementById('date').innerHTML = mm + '/' + dd + '/' + yyyy;
