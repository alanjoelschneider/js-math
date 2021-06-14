var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#666';

var METERS_TO_PIXELS = 100,
    p = Particle.create(0, cHeight, 12 * METERS_TO_PIXELS, toRadians(-60)),
    gravity = Vector.create(0, 9.8 * METERS_TO_PIXELS);

(function() {
  var now = 0;
  var last = 0;
  var dt = 0;
  (function render() {
    now = window.performance.now();
    dt = (now - last) / 1000;
    if (dt > 1) {
      dt = 0;
    }
    last = now;
    p.accelerate(gravity, dt);
    p.move(dt);
    clear(context, bgColor, cWidth, cHeight);
    context.save();
    context.fillStyle = '#000';
    context.beginPath();
    context.arc(p.position.x, p.position.y, 10, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    window.requestAnimationFrame(render);
  })();
})();