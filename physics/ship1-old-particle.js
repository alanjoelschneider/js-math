var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#000';

var thrusting = false,
    thrustLeft = false,
    thrustRight = false,
    angle = 0;

var MTP = 100,
    p = Particle.create(cWidth / 2, cHeight / 2, 0, 0),
    thrust = Vector.zero();
    //gravity = Vector.create(0, .5 * MTP);
    
function update(dt) {
  if (thrusting) {
    thrust.magnitude = 4 * MTP;
  } else {
    thrust.magnitude = 0;
  }

  if (thrustLeft) {
    angle -= toRadians(180) * dt;
  } else if (thrustRight) {
    angle += toRadians(180) * dt;
  }

  thrust.direction = angle;

  //p.accelerate(gravity, dt);
  p.accelerate(thrust, dt);
  p.move(dt);

  if (p.position.x > cWidth) {
    p.position.x = 0;
  } else if (p.position.x < 0) {
    p.position.x = cWidth;
  }

  if (p.position.y > cHeight) {
    p.position.y = 0;
  } else if (p.position.y < 0) {
    p.position.y = cHeight;
  }
}

function render() {
  clear(context, bgColor, cWidth, cHeight);
  context.save();
  context.translate(p.position.x, p.position.y);
  context.rotate(angle);
  context.strokeStyle = '#FFF';
  context.beginPath();
  context.moveTo(-.1 * MTP, -.1 * MTP);
  context.lineTo(.1 * MTP, 0 * MTP);
  context.lineTo(-.1 * MTP, .1 * MTP);
  context.lineTo(-.1 * MTP, -.1 * MTP);
  if (thrusting) { // Fire!
    context.moveTo(-.1 * MTP, 0);
    context.lineTo(-.2 * MTP, 0);
  }
  context.stroke();
  context.restore();
}

(function() {
  var now = 0;
  var last = 0;
  var dt = 0;
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

document.addEventListener('keydown', function(event) {
  switch (event.code) {
    case 'ArrowUp':
      thrusting = true;
      break;
    case 'ArrowLeft':
      thrustLeft = true;
      break;
    case 'ArrowRight':
      thrustRight = true;
      break;
  }
}, false);

document.addEventListener('keyup', function(event) {
  switch (event.code) {
    case 'ArrowUp':
      thrusting = false;
      break;
    case 'ArrowLeft':
      thrustLeft = false;
      break;
    case 'ArrowRight':
      thrustRight = false;
      break;
  }
}, false);