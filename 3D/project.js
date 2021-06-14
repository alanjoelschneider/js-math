var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#000';

// Global variables
var fl = 300,
    points = [],
    z = 1000,
    tSpeed = 500;

// Before loop starts
function load() {
  // Init inputs
  Mouse.listenTo(canvas);
  Keyboard.listenTo(document);

  // Center context
  context.translate(cWidth * .5, cHeight * .5);
  context.fillStyle = '#F78';

  // Create points.
  points.push({ x: -150, y: -150, z: z });
  points.push({ x: 150,  y: -150, z: z });
  points.push({ x: 150,  y: 150,  z: z });
  points.push({ x: -150, y: 150,  z: z });
  points.push({ x: -150, y: -150, z: z + 150 });
  points.push({ x: 150,  y: -150, z: z + 150 });
  points.push({ x: 150,  y: 150,  z: z + 150 });
  points.push({ x: -150, y: 150,  z: z + 150 });

  points.push({ x: 450, y: -150, z: z });
  points.push({ x: 700, y: -150, z: z });
  points.push({ x: 700, y: 150,  z: z });
  points.push({ x: 450, y: 150,  z: z });
  points.push({ x: 450, y: -150, z: z + 150 });
  points.push({ x: 700, y: -150, z: z + 150 });
  points.push({ x: 700, y: 150,  z: z + 150 });
  points.push({ x: 450, y: 150,  z: z + 150 });
}

// Update objects 60 times per second
function update(dt) { //  dt = delta time. For smooth movement.
  if (Keyboard.pressing['ArrowLeft']) {
    translateModel(tSpeed * dt, 0, 0);
  } else if (Keyboard.pressing['ArrowRight']) {
    translateModel(-tSpeed * dt, 0, 0);
  }

  if (Keyboard.pressing['ArrowUp']) {
    //translateModel(0, -tSpeed * dt, 0);
    translateModel(0, 0, -tSpeed * dt);
  } else if (Keyboard.pressing['ArrowDown']) {
    //translateModel(0, tSpeed * dt, 0);
    translateModel(0, 0, tSpeed * dt);
  }
  
  /*
  if (Keyboard.pressing['KeyW']) {
    translateModel(0, 0, tSpeed * dt);
  } else if (Keyboard.pressing['KeyS']) {
    translateModel(0, 0, -tSpeed * dt);
  }*/
}

// Draw obejects 60 times per second
function render() {
  clear(context, bgColor, -cWidth * .5, -cHeight * .5, cWidth, cHeight);
  context.save();
  project();
  drawLine(0, 1, 2, 3);
  drawLine(4, 5, 6, 7);
  drawLine(0, 4);
  drawLine(1, 5);
  drawLine(2, 6);
  drawLine(3, 7);
  context.restore();

  context.save();
  drawLine(8, 9, 10, 11);
  drawLine(12, 13, 14, 15);
  drawLine(8, 12);
  drawLine(9, 13);
  drawLine(10, 14);
  drawLine(11, 15);
  context.restore();
}

function project() {
  var l = points.length;
  for (var i = 0; i < l; i++) {
    var p = points[i],
        scale = fl / (fl + p.z);
    p.sx = p.x * scale;
    p.sy = p.y * scale;
  }
}

function translateModel(x, y, z) {
  var l = points.length;
  for (var i = 0; i < l; i++) {
    var p = points[i];
    p.x += x;
    p.y += y;
    p.z += z;
  }
}

function drawLine(...indexes) {
  var p = points[indexes[0]],
      l = indexes.length;
  context.save();
  context.strokeStyle = '#FFF';
  context.beginPath();
  context.moveTo(p.sx, p.sy);
  for (var i = 1; i < l; i++) {
    p = points[indexes[i]];
    context.lineTo(p.sx, p.sy);
  }
  context.closePath();
  context.stroke();
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