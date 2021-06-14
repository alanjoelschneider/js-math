var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#000';

// Global variables

// ...

// Before loop starts
function load() {
  // Init inputs
  Mouse.listenTo(canvas);
  Keyboard.listenTo(document);
}

// Update objects 60 times per second
function update(dt) { //  dt = delta time. For smooth movement.

}

// Draw obejects 60 times per second
function render() {
  clear(context, bgColor, 0, 0, cWidth, cHeight);
  context.save();
  //...
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