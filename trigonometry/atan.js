var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#666';

var arrowX = cWidth * .5,
    arrowY = cHeight * .5,
    angle = 0;

context.lineWidth = 4;
context.lineJoin = context.lineCap = 'round';

(function render() {
  clear(context, bgColor, cWidth, cHeight);
  context.save();
  context.strokeStyle = '#000';
  context.translate(arrowX, arrowY);
  context.rotate(angle);
  context.beginPath();
  context.moveTo(-20, 0);
  context.lineTo(20, 0);
  context.lineTo(10, -10);
  context.moveTo(20, 0);
  context.lineTo(10, 10);
  context.closePath();
  context.stroke();
  context.restore();
  window.requestAnimationFrame(render);
})();

document.addEventListener('mousemove', function(event) {
  if (event.clientX !== arrowX && event.clientY !== arrowY) {
    angle = Math.atan2(event.clientY - arrowY, event.clientX - arrowX);
  }
}, false);