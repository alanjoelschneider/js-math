var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight;

var centerY = cHeight * .5,
    centerX = cWidth * .5,
    rectSize = 20,
    offset = cHeight * .1,
    speed = .05,
    angle = 0;

(function render() {
  var y = centerY + Math.cos(angle) * offset;
  var alpha = Math.cos(angle);
  angle += speed;

  context.clearRect(0, 0, cWidth, cHeight);
  context.fillStyle = rgba(alpha * 256, 0, 0, Math.abs(alpha));
  context.save();
  context.fillRect(centerX - rectSize * .5, y - rectSize * .5, rectSize, rectSize);
  context.restore();

  window.requestAnimationFrame(render);
})();