var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  cWidth = (canvas.width = window.innerWidth),
  cHeight = (canvas.height = window.innerHeight),
  bgColor = '#000';

var MTP = 100,
  p = Particle.create(0, 0, 0, 0),
  venus = Particle.create(
    (cWidth / 2) * 0.8,
    (cHeight / 2) * 0.8,
    0,
    0,
    5,
    0.00001 * Math.pow(10, 10)
  ),
  mars = Particle.create(
    (-cWidth / 2) * 0.8,
    (cHeight / 2) * 0.8,
    0,
    0,
    8,
    0.0001 * Math.pow(10, 10)
  ),
  earth = Particle.create(
    (cWidth / 2) * 0.8,
    (-cHeight / 2) * 0.8,
    0,
    0,
    15,
    0.0001 * Math.pow(10, 10)
  ),
  jupiter = Particle.create(-cWidth / 2, -cHeight / 2, 0, 0, 100, 0.001 * Math.pow(10, 10)),
  sun = Particle.create(-cWidth * 2, -cHeight * 2, 0, 0, 800, 0.01 * Math.pow(10, 10)),
  thrust = Vector.zero(),
  thrusting = false,
  angle = 0,
  stars = [],
  starsQuantity = 2000;

function load() {
  // Start keyboard.
  Keyboard.listenTo(document);

  // Center origin.
  context.translate(cWidth * 0.5, cHeight * 0.5);

  // Add stars.
  for (var i = 0; i < starsQuantity; i++) {
    var rx = random(-cWidth * 5, cWidth * 5, 10),
      ry = random(-cHeight * 5, cHeight * 5, 10),
      rRadius = random(0.1, 1.5, 0.1);
    stars.push(Particle.create(rx, ry, 0, 0, rRadius));
  }
}

function update(dt) {
  // Accelerate ship.
  if (Keyboard.pressing['ArrowUp']) {
    thrust.magnitude = 2 * MTP;
    thrusting = true;
  } else {
    thrust.magnitude = 0;
    thrusting = false;
  }

  // Rotate ship
  if (Keyboard.pressing['ArrowLeft']) {
    angle -= toRadians(180) * dt;
  } else if (Keyboard.pressing['ArrowRight']) {
    angle += toRadians(180) * dt;
  }
  thrust.direction = angle;

  p.gravitateTo(venus, dt);
  p.gravitateTo(mars, dt);
  p.gravitateTo(earth, dt);
  p.gravitateTo(jupiter, dt);
  p.gravitateTo(sun, dt);
  p.accelerate(thrust.x, thrust.y, dt);
  p.move(dt);

  // Edges handling. (World limit).
  /*if (p.x > cWidth) {
    p.x = 0;
  } else if (p.x < 0) {
    p.x = cWidth;
  }

  if (p.y > cHeight) {
    p.y = 0;
  } else if (p.y < 0) {
    p.y = cHeight;
  }*/
}

function render() {
  clear(context, bgColor, -cWidth * 0.5, -cHeight * 0.5, cWidth, cHeight);

  // Focus the camera to the ship.
  context.save();
  var camx = lerp(0.95, -p.x * 0.5, -p.x),
    camy = lerp(0.95, -p.y * 0.5, -p.y);
  context.translate(camx, camy);

  // Draw stars.
  for (var i = 0; i < starsQuantity; i++) {
    stars[i].draw(context, { fill: '#FFF' });
  }

  // Draw plantes.
  venus.draw(context, { fill: '#9F9' });
  mars.draw(context, { fill: '#F55' });
  earth.draw(context, { fill: '#77F' });
  jupiter.draw(context, { fill: '#F78' });
  sun.draw(context, { fill: '#FF2' });

  // Draw ship.
  context.save();
  context.translate(p.x, p.y);
  context.rotate(angle);
  context.strokeStyle = '#FFF';
  context.beginPath();
  context.moveTo(-0.1 * MTP, -0.1 * MTP);
  context.lineTo(0.1 * MTP, 0 * MTP);
  context.lineTo(-0.1 * MTP, 0.1 * MTP);
  context.lineTo(-0.1 * MTP, -0.1 * MTP);
  if (thrusting) {
    // Fire!
    context.moveTo(-0.1 * MTP, 0);
    context.lineTo(-0.2 * MTP, 0);
  }
  context.stroke();
  context.restore();

  context.restore();
}

(function () {
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
