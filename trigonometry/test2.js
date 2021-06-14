var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#666';

var centerY = cHeight * .5,
    centerX = cWidth * .5,
    rectSize = 20,
    xRadius = cWidth * .3,
    yRadius = cHeight * .3,
    xSpeed = .1,
    ySpeed = .139
    xAngle = 0,
    yAngle = 0;

(function render() {
  var x = centerX + Math.cos(xAngle) * xRadius,
      y = centerY + Math.sin(yAngle) * yRadius,
      alpha = Math.cos(xAngle);
  xAngle += xSpeed;
  yAngle += ySpeed;
  
  clear(context, bgColor, cWidth, cHeight);
  context.fillStyle = rgba(alpha * 255, 0, 0, 1);
  context.save();
  context.fillRect(x - rectSize * .5, y - rectSize * .5, rectSize, rectSize);
  context.restore();

  window.requestAnimationFrame(render);
})();