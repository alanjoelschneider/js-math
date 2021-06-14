var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#00032F';

var //springPoint = Vector.create(cWidth / 2, cHeight / 2),
    springPoint = { x: cWidth / 2, y: cHeight / 2 },
    springPoint2 = { x: cWidth, y: 0},
    weightPoint = { x: cWidth / 2, y: cHeight / 2 },
    weight = Particle.create(cWidth * .5, cHeight * .5, 0, toRadians(30), 10),
    weight2 = Particle.create(cWidth * .5, cHeight * .4, 0, toRadians(30), 10),
    earth = Particle.create(cWidth / 2, cHeight * 15, 0, 0, cHeight * 14.1),
    //earth = Particle.create(cWidth / 2, cHeight * 1, 0, 0, cHeight / 2),
    k = 45,
    frictionAir = .955;

function load() {
  earth.mass = .005 * Math.pow(10, 14);
  Mouse.listenTo(canvas);
  context.strokeStyle = '#FFF';
  weight2.addSpring(weightPoint, k, 0);
  weight.addSpring(springPoint, k, 0);
  weight.addSpring(springPoint2, k, 0);
  console.log(weight2.x, weight2.y);
}

function update(dt) {
  // Attach the spring point to mouse cordinates.
  springPoint.x = Mouse.x;
  springPoint.y = Mouse.y;

  weightPoint.x = weight.x;
  weightPoint.y = weight.y;

  /*var dx = springPoint.x - weight.x,
      dy = springPoint.y - weight.y,
      distanceSq = dx * dx + dy * dy;
      distance = Math.sqrt(distanceSq),
      springForce = distance * k,
      ax = dx / distance * springForce;
      ay = dy / distance * springForce;
  weight.accelerate(ax, ay, dt);*/
  //weight.springTo(springPoint, k, 0, dt); 
  weight2.handleSprings(dt);
  weight.handleSprings(dt);
  weight.gravitateTo(earth, dt);
  weight2.gravitateTo(earth, dt);
  weight.vx *= frictionAir;
  weight.vy *= frictionAir;
  weight2.vx *= frictionAir;
  weight2.vy *= frictionAir;
  weight.move(dt);
  weight2.move(dt);
}

function render() {
  clear(context, bgColor, 0, 0, cWidth, cHeight);
  drawPoint(context, springPoint.x, springPoint.y, { stroke: '#FFF' });
  drawLine(context, springPoint.x, springPoint.y, weight.x, weight.y, { stroke: '#FFF' });
  drawPoint(context, springPoint2.x, springPoint2.y, { stroke: '#FFF' });
  drawLine(context, springPoint2.x, springPoint2.y, weight.x, weight.y, { stroke: '#FFF' });
  drawLine(context, weight2.x, weight2.y, weightPoint.x, weightPoint.y, { stroke: '#FFF' });
  weight.draw(context, { fill: '#B18501' });
  weight2.draw(context, { fill: '#B18501' });
  earth.draw(context, { fill: '#8AAFAC' });
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