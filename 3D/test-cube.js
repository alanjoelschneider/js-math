var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#000';

// Global variables
var fov = 300,
    cubes = [];

// Before loop starts
function load() {
  // Init inputs
  Mouse.listenTo(canvas);
  Keyboard.listenTo(document);

  // Center origin
  context.translate(cWidth / 2 , cHeight / 2);

  // Create cubes
  cubes.push(new Cube(0, 0, 500, 250));
  /*cubes.push(new Cube(300, 0, 1000, 500));
  cubes.push(new Cube(300, 0, 2000, 500));
  cubes.push(new Cube(-1000, 0, 0, 500));
  cubes.push(new Cube(-1000, 0, 1000, 500));
  cubes.push(new Cube(-1000, 0, 2000, 500));*/
}

// Update objects 60 times per second
function update(dt) { //  dt = delta time. For smooth movement.
  if (Keyboard.pressing['ArrowLeft']) {
    cubes.forEach(function(cube) {
      cube.translate(300 * dt, 0, 0);
    });
  } else if (Keyboard.pressing['ArrowRight']) {
    cubes.forEach(function(cube) {
      cube.translate(-300 * dt, 0, 0);
    });
  }
  
  if (Keyboard.pressing['ArrowUp']) {
    cubes.forEach(function(cube) {
      cube.translate(0, 0, -300 * dt);
    });
  } else if (Keyboard.pressing['ArrowDown']) {
    cubes.forEach(function(cube) {
      cube.translate(0, 0, 300 * dt);
    });
  }

  if (Keyboard.pressing['KeyW']) {
    cubes.forEach(function(cube) {
      cube.translate(0, 300 * dt, 0);
    });
  } else if (Keyboard.pressing['KeyS']) {
    cubes.forEach(function(cube) {
      cube.translate(0, -300 * dt, 0);
    });
  }
}

// Draw obejects 60 times per second
function render() {
  clear(context, bgColor, -cWidth / 2, -cHeight / 2, cWidth, cHeight);
  context.save();
  context.strokeStyle = '#FFF';
  cubes.forEach(function(cube) {
    cube.stroke(context, fov);
    //cube.fill(context, fov);
  });
  context.restore();
}

// Main loop.
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