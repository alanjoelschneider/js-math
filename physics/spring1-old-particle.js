var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#00032F';

var springPoint = Vector.create(cWidth / 2, cHeight / 2),
    weight = Particle.create(-cWidth, cHeight * 2, 0, toRadians(30), 10),
    earth = Particle.create(cWidth / 2, cHeight * 15, 0, 0, cHeight * 14.1),
    //earth = Particle.create(cWidth / 2, cHeight * 1, 0, 0, cHeight / 2),
    k = 45,
    frictionAir = .955;

earth.mass = Math.pow(10, 14);
Mouse.listenTo(canvas);
context.strokeStyle = '#FFF';

function update(dt) {
  springPoint.x = Mouse.x;
  springPoint.y = Mouse.y;
  var distance = Vector.sub(springPoint, weight.position);
  var springForce = Vector.mult(distance, k);
  weight.accelerate(springForce, dt);
  weight.gravitateTo(earth, dt);
  weight.velocity.mult(frictionAir);
  weight.move(dt);
}

function render() {
  clear(context, bgColor, cWidth, cHeight);
  drawPoint(context, springPoint.x, springPoint.y, { stroke: '#FFF' })
  drawLine(context, springPoint.x, springPoint.y, weight.position.x, weight.position.y, { stroke: '#FFF' });
  weight.draw(context, { fill: '#B18501' });
  earth.draw(context, { fill: '#8AAFAC' });
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