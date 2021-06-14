var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#000';

// Global variables
var fl = 300,
    shapes = [];

// Before loop starts
function load() {
  // Init inputs
  Mouse.listenTo(canvas);
  Keyboard.listenTo(document);

  // Center context
  context.translate(cWidth * .5, cHeight * .5);
  context.fillStyle = '#F78';

  // Create shapes.
  for (var i = 0; i < 500; i++) {
    var shape = {
      x: random(-cWidth * .5, cWidth * .5),
      y: random(-cHeight * .5, cHeight * .5),
      z: 20000,
      radius: random(10, 100, 5),
      speed: random(50, 500, 10),
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    }
    shapes.push(shape);
  }
}

// Update objects 60 times per second
function update(dt) { //  dt = delta time. For smooth movement.
  // Handle shapes.
  var l = shapes.length;
  for (var i = 0; i < l; i++) {
    shape = shapes[i];
    shape.z -= shape.speed * dt;
    if (shape.z <= 0) {
      shape.z = 20000;
      //shape.x = random(-cWidth * .5, cWidth * .5);
    }
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
    var alpha = normalize(shape.z, 20000, -10000);
    context.fillStyle = rgba(shape.r, shape.g, shape.b, alpha);
    context.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
  }
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