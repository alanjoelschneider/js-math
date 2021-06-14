var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    cWidth = canvas.width = window.innerWidth,
    cHeight = canvas.height = window.innerHeight,
    bgColor = '#666';

var v1 = Vector.create(2, -2);
var v2 = Vector.create(-3, -1);
var v3 = Vector.create(-1, 2);
var v4 = Vector.create(-2, -2);

var vAdd = Vector.add(v1, v2, v3);
var vSub = Vector.sub(v4, v1);

console.log(vAdd.x, vAdd.y);
console.log(vSub.x, vSub.y);

(function render() {
  clear(context, bgColor, cWidth, cHeight);
  context.save();
  // ...
  context.restore();
  window.requestAnimationFrame(render);
})();