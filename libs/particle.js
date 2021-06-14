function Particle() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.mass = 1;
  this.radius = 1;
  this.springs = [];
}

Particle.prototype.move = function(dt) {
  this.x += this.vx * dt;
  this.y += this.vy * dt;
}

Particle.prototype.accelerate = function(ax, ay, dt) {
  this.vx += ax * dt;
  this.vy += ay * dt;
}

Particle.prototype.angleTo = function(p) {
  return Math.atan2(p.y - this.y, p.x - this.x);
}

Particle.prototype.distanceTo = function(p) {
  var dx = p.x - this.x,
      dy = p.y - this.y;
  return Math.sqrt(dx * dx + dy * dy);
}

Particle.prototype.gravitateTo = function(p, dt) {
  var dx = p.x - this.x,
      dy = p.y - this.y,
      distanceSq = dx * dx + dy * dy,
      distance = Math.sqrt(distanceSq),
      gravityForce = p.mass / (distanceSq),
      ax = dx / distance * gravityForce,
      ay = dy / distance * gravityForce;
  this.accelerate(ax, ay, dt);
}

Particle.prototype.addSpring = function(point, k, length) {
  this.removeSpring(point);
  this.springs.push({
    point: point,
    k: k,
    length: length
  })
}

Particle.prototype.removeSpring = function(point) {
  var l = this.springs.length;
  for (var i = 0; i < l; i++) {
    if (point === this.springs[i]) {
      return this.springs.splice(i, 1);
    }
  }
}

Particle.prototype.handleSprings = function(dt) {
  var l = this.springs.length;
  for (var i = 0; i < l; i++) {
    var spring = this.springs[i];
    this.springTo(spring.point, spring.k, spring.length, dt);
  }
}

Particle.prototype.springTo = function(point, k, length, dt) {
  var dx = point.x - this.x,
      dy = point.y - this.y,
      distanceSq = dx * dx + dy * dy;
      distance = Math.sqrt(distanceSq),
      force = (distance - length) * k,
      ax = dx / distance * force;
      ay = dy / distance * force;
  this.vx += ax * dt;
  this.vy += ay * dt;
}

Object.defineProperties(Particle.prototype, {
  speed: {
    get: function() {
      return Math.sqrt(this.vx * this.vx, this.vy * this.vy);
    },
    set: function(speed) {
      var angle = this.angle;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
    }
  },
  angle: {
    get: function() {
      return Math.atan2(this.vy, this.vx);
    },
    set: function(angle) {
      var speed = this.speed;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
    }
  }
});

Particle.create = function(x, y, speed, angle, radius, mass) {
  var p = new Particle();
  p.x = x;
  p.y = y;
  p.vx = Math.cos(angle) * speed;
  p.vy = Math.sin(angle) * speed;
  p.radius = radius || 10;
  p.mass = mass || 1;
  return p;
}

Particle.prototype.draw = function(context, renderOptions) {
  context.save();
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  if (renderOptions.fill !== undefined) {
    context.fillStyle = renderOptions.fill;
    context.fill();
  } else if (renderOptions.stroke !== undefined) {
    context.strokeStyle = renderOptions.stroke;
    context.stroke();
  }
  context.restore();
}

