var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#000';

// Global variables
var p0 = {
      x: 0,
      y: cHeight
    },
    p1 = {
      x: cWidth * .5,
      y: 0
    },
    p2 = {
      x: cWidth * .5,
      y: cHeight
    },
    points = [];
  
// Before loop starts
function load() {
  // Init inputs
  Mouse.listenTo(canvas);
  Keyboard.listenTo(document);
}

// Update objects 60 times per second
function update(dt) { //  dt = delta time. For smooth movement.
  // Attach p2 to mouse coordinates.
  p2.x = Mouse.x;
  p2.y = Mouse.y;

  if (Keyboard.pressing['ArrowLeft']) {
    p0.x -= 300 * dt;
  } else if (Keyboard.pressing['ArrowRight']) {
    p0.x += 300 * dt;
  }

  if (Keyboard.pressing['ArrowUp']) {
    p1.y -= 300 * dt;
  } else if (Keyboard.pressing['ArrowDown']) {
    p1.y += 300 * dt;
  }

  points = [];
  for (var t = 0; t < 1; t += .02) {
    points.push(quadraticBezier(p0, p1, p2, t));
  }
}

// Draw obejects 60 times per second
function render() {
  clear(context, bgColor, 0, 0, cWidth, cHeight);
  context.save();
  
  // Draw bezier curve
  // context.strokeStyle = '#FFF';
  var l = points.length;
  for (var i = 0; i < l; i++) {
    var point = points[i];
    context.beginPath();
    context.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
    //context.stroke();
    var r = map(point.x, 0, cWidth, 0, 255);
    var g = map(point.y, 0, cHeight, 0, 255);
    context.fillStyle = rgba(r, g, 0, 1);
    context.fill();
  }
  /*drawLine(context, p0.x, p0.y, p1.x, p1.y, { stroke: '#FFF' });
  drawLine(context, p0.x, p0.y, p2.x, p2.y, { stroke: '#FFF' });
  drawLine(context, p1.x, p1.y, p2.x, p2.y, { stroke: '#FFF' });*/
  context.restore();
}

// Main loop strats
(function() {
  var now = 0;
  var last = 0;
  var dt = 0;
  load();
  (function loop() {
    now = window.performance.now();
    dt = (now - last) / 1000;
    if (dt > 1) {
      dt = 0;
    }
    last = now;
    update(dt);
    render();  
    window.requestAnimationFrame(loop);
  })();
})();