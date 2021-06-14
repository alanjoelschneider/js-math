function Vector() {
  this.x = 1;
  this.y = 0;
}

Object.defineProperties(Vector.prototype, {
  magnitude: {
    get: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    set: function(magnitude) {
      var direction = this.direction;
      this.x = Math.cos(direction) * magnitude;
      this.y = Math.sin(direction) * magnitude;
    }
  },
  direction: {
    get: function() {
      return Math.atan2(this.y, this.x);
    },
    set: function(direction) {
      var magnitude = this.magnitude;
      this.x = Math.cos(direction) * magnitude;
      this.y = Math.sin(direction) * magnitude;
    }
  }
});

Vector.prototype.add = function(v2) {
  this.x += v2.x;
  this.y += v2.y;
}

Vector.prototype.sub = function(v2) {
  this.x -= v2.x;
  this.y -= v2.y;
}

Vector.prototype.mult = function(value) {
  this.x *= value;
  this.y *= value;
}

Vector.prototype.div = function(value) {
  this.x /= value;
  this.y /= value;
}

Vector.create = function(x, y) {
  var v = new Vector();
  v.x = x;
  v.y = y;
  return v;
}

Vector.zero = function() {
  return this.create(0, 0);
}

Vector.add = function(...vectors) {
  var l = vectors.length,
      v = Vector.copy(vectors[0]);
  for (var i = 1; i < l; i++) {
    v.add(vectors[i]);
  }
  return v;
}

Vector.sub = function(...vectors) {
  var l = vectors.length,
      v = Vector.copy(vectors[0]);
  for (var i = 1; i < l; i++) {
    v.sub(vectors[i]);
  }
  return v;
}

Vector.mult = function(v, value) {
  return this.create(v.x * value, v.y * value);
}

Vector.div = function(v, value) {
  return this.create(v.x / value, v.y / value);
}

Vector.copy = function(v) {
  return this.create(v.x, v.y);
}