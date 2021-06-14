var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#000';

// Global variables
var fl = 300,
    shapes = [],
    numShapes = 10,
    centerZ = 1000,
    centerY = 0,
    radius = 500,
    baseAngle = 0,
    angleSpeed = 0.005;

// Before loop starts
function load() {
  // Init inputs
  Mouse.listenTo(canvas);
  Keyboard.listenTo(document);

  // Center context
  context.translate(cWidth * .5, cHeight * .5);
  context.fillStyle = '#F78';

  // Create shapes.
  for (var i = 0; i < numShapes; i++) {
    var shape = {
      angle: Math.PI * 2 / numShapes * i,
      radius: 50,
      speed: random(50, 500, 10),
      r: 255,
      g: 0,
      b: 0
    }
    shape.x = Math.cos(shape.angle + baseAngle) * radius;
    shape.y = centerY;
    shape.z = centerZ + Math.sin(shape.angle + baseAngle) * radius;
    shapes.push(shape);
  }
}

// Update objects 60 times per second
function update(dt) { //  dt = delta time. For smooth movement.
  if (Keyboard.pressing['ArrowUp']) {
    centerY -= 300 * dt;
  } else if (Keyboard.pressing['ArrowDown']) {
    centerY += 300 * dt;
  }
}

// Draw obejects 60 times per second
function render() {
  clear(context, bgColor, -cWidth * .5, -cHeight * .5, cWidth, cHeight);
  context.save();
  var l = shapes.length;
  for (var i = 0; i < l; i++) {
    var shape = shapes[i];
    var perspective = fl / (fl + shape.z);
    context.save();
    /*context.translate(shape.x * perspective, shape.y * perspective);
    context.scale(perspective, perspective);*/
    context.scale(perspective, perspective);
    context.translate(shape.x, shape.y);
    context.beginPath();
    context.fillStyle = rgba(shape.r, shape.g, shape.b, 1);
    context.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    shape.x = Math.cos(shape.angle + baseAngle) * radius;
    shape.y = centerY;
    shape.z = centerZ + Math.sin(shape.angle + baseAngle) * radius; 
  }
  baseAngle += angleSpeed;
  context.restore();
}

// Main loop
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