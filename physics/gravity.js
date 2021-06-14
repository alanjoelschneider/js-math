var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#000';

var sun = Particle.create(cWidth / 2, cHeight / 2, 0, 0, 5, .0001 * Math.pow(10, 10)),
    sun2 = Particle.create(cWidth / 2 + 500, cHeight / 2 - 300, 0, 0, 25, .0001 * Math.pow(10, 10)),
    sun3 = Particle.create(cWidth / 2 + 200, 0, 0, 0, 15, .0001 * Math.pow(10, 10)),
    planet = Particle.create(0, 0, 100, toRadians(-30), 10),
    stars = [],
    starsQuantity = 1000;

function load() {
  // Move the drawing surface origin (0, 0) to the canvas middle.
  context.translate(cWidth * .5, cHeight * .5); // Center the camera.
  // Add stars.
  for (var i = 0; i < starsQuantity; i++) {
    var rx = random(-cWidth * 2, cWidth * 2, 10),
        ry = random(-cHeight * 2, cHeight * 2, 10),
        rRadius = random(.1, 1.5, .1);
    stars.push(Particle.create(rx, ry, 0, 0, rRadius));
  }
}

function update(dt) {
  planet.gravitateTo(sun, dt);
  planet.gravitateTo(sun2, dt);
  planet.gravitateTo(sun3, dt);
  planet.move(dt);
}

function render() {
  clear(context, bgColor, -cWidth * .5, -cHeight * .5, cWidth, cHeight);
  context.save();

  // Smooth camera
  var camx = lerp(.9, -planet.x * .5, -planet.x),
      camy = lerp(.9, -planet.y * .5, -planet.y);
  context.translate(camx, camy); // Focus the camera on planet.

  // Draw stars.
  for (var i = 0; i < starsQuantity; i++) {
    stars[i].draw(context, { fill: '#FFF' });
  }

  // Draw planets.
  sun.draw(context, { fill: '#FF0' });
  sun2.draw(context, { fill: rgba(0, 120, 80, .7) });
  sun3.draw(context, { fill: rgba(120, 0, 0, .8) });
  planet.draw(context, { fill: '#0FF' });

  context.restore();
}

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