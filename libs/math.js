function normalize(value, min, max) {
  return (value - min) / (max - min);
}

function lerp(norm, min, max) {
  return (max - min) * norm + min;
}

function map(value, sMin, sMax, dMin, dMax) {
  return lerp(normalize(value, sMin, sMax), dMin, dMax);
}

function roundToPlaces(value, places) {
  var mult = Math.pow(10, places);
  return Math.round(value * mult) / mult;
}

function roundToNearest(value, nearest) {
  return Math.round(value / nearest) *  nearest;
}

function toRadians(degree) {
  return Math.PI / 180 * degree;
}

function toDegrees(radians) {
  return 180 / Math.PI * radians;
}

function random(min, max, step) {
  if (step === undefined) { step = 1; }
  return ~~(Math.random() * ((max - min) / step + 1)) * step + min;
}

function quadraticBezier(p0, p1, p2, t) {
  var pFinal = {};
  pFinal.x = Math.pow(1 - t, 2) * p0.x +
             (1 - t) * 2 * t * p1.x +
             t * t * p2.x;
  pFinal.y = Math.pow(1 - t, 2) * p0.y +
             (1 - t) * 2 * t * p1.y +
             t * t * p2.y;
  return pFinal;
}
