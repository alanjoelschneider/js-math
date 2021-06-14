var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#000';

// Global variables
var balls = [],
    position = {
      x: 0,
      y: 0
    };

// Before loop starts
function load() {
  // Init inputs
  Mouse.listenTo(canvas);
  Keyboard.listenTo(document);

  // Create balls.
  poblate(balls, 200, function(i) {
    var rr = random(0, 255),
        rg = random(0, 255),
        rb = random(0, 255),
        ra = random(0, 255);
    return {
      x: 0,
      y: 0,
      radius: 5,
      r: rr,
      g: rg,
      b: rb,
      a: ra
    };
  });
}

// Update objects 60 times per second
function update(dt) { //  dt = delta time. For smooth movement.
  var i = 0,
      l = balls.length - 1;
  for (; i < l; i++) {
    var b1 = balls[i],
        b2 = balls[i + 1];
    easeTo(b1, b2, .09);
    //b1.x = lerp(.09, b1.x, b2.x);
    //b1.y = lerp(.09, b1.y, b2.y);
  }
  //easeTo(balls[i], Mouse, .09);
  balls[i].x = lerp(.9, balls[i].x, Mouse.x);
  balls[i].y = lerp(.9, balls[i].y, Mouse.y);
  /*position.x = lerp(.09, position.x, Mouse.x);
  position.y = lerp(.09, position.y, Mouse.y);*/
}

// Draw obejects 60 times per second
function render() {
  clear(context, bgColor, 0, 0, cWidth, cHeight);
  context.save();
  var l = balls.length;
  for (var i = 0; i < l; i++) {
    var ball = balls[i];
    context.fillStyle = rgba(ball.r, ball.g, ball.b, ball.a);
    fillCircle(context, ball.x, ball.y, ball.radius);
  };
  context.restore();
}

function easeTo(position, target, ease) {
  var dx = target.x - position.x,
      dy = target.y - position.y;
  position.x += dx * ease;
  position.y += dy * ease;
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