function rgba(r, g, b, a) {
  return 'rgba('+ r + ',' + g + ',' + b + ',' + a + ')';
}

function clear(context, color, x, y, w, h) {
  context.save()
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
  context.restore();
}

function drawLine(context, x1, y1, x2, y2, renderOptions) {
  context.save();
  context.strokeStyle = renderOptions.stroke;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.restore();
}

function drawPoint(context, x, y, renderOptions) {
  context.save();
  context.strokeStyle = renderOptions.stroke;
  context.beginPath();
  context.moveTo(x + 1, y + 1);
  context.lineTo(x - 1, y);
  context.lineTo(x, y - 1);
  context.lineTo(x + 1, y);
  context.closePath();
  context.stroke();
  context.restore();
}

function circle(context, x, y, r) {
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, true);
  context.closePath();
}

function fillCircle(context, x, y, r) {
  circle(context, x, y, r);
  context.fill();
}

function strokeCircle(context, x, y, r) {
  circle(context, x, y, r);
  context.stroke();
}

function inPairs(array, callback) {
  let l = array.length;
  let i = 0;
  let j = 1;
  for(; j < l; i = j++) {
    callback(array[i], array[j]);
  }
}

function poblate(array, count, callback) {
  for (var i = 0; i < count; i++) {
    array.push(callback(i));
  }
}

function decToHex(dec) {
  var hex = Number(dec).toString(16).toUpperCase();
  return (dec < 16) ? '0' + hex : hex; 
}

function rgbToHex(r, g, b) {
  return decToHex(r) + decToHex(g) + decToHex(b);
}