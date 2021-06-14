function Particle() {
  this.position = null;
  this.velocity = null;
  this.mass = null;
  this.radius = null;
}

Particle.prototype.move = function(dt) {
  this.position.add(Vector.mult(this.velocity, dt));
}

Particle.prototype.accelerate = function(v, dt) {
  this.velocity.add(Vector.mult(v, dt));
}

Particle.prototype.angleTo = function(p) {
  return Math.atan2(p.position.y - this.position.y, p.position.x - this.position.x);
}

Particle.prototype.distanceTo = function(p) {
  var dx = p.position.x - this.position.x;
  var dy = p.position.y - this.position.y;
  return Math.sqrt(dx * dx + dy * dy);
}

Particle.prototype.gravitateTo = function(p, dt) {
  /*var distance = this.distanceTo(p),
      direction = this.angleTo(p),
      gravityForce = p.mass / (distance * distance);
  this.vx += Math.cos(direction) * gravityForce;
  this.vy += Math.sin(direction) * gravityForce;*/
  
  var gravity = Vector.create(0, 0),
      distance = this.distanceTo(p);
  gravity.magnitude = p.mass / (distance * distance);
  gravity.direction = this.angleTo(p);
  this.velocity.add(Vector.mult(gravity, dt));
}

Particle.create = function(x, y, speed, angle, radius, mass) {
  var p = new Particle();
  p.position = Vector.create(x, y);
  p.velocity = Vector.zero();
  p.velocity.magnitude = speed || 0;
  p.velocity.direction = angle || 0;
  p.radius = radius || 10;
  p.mass = mass || 1;
  return p;
}

Particle.prototype.draw = function(context, renderOptions) {
  context.save();
  context.beginPath();
  context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
  if (renderOptions.fill !== undefined) {
    context.fillStyle = renderOptions.fill;
    context.fill();
  } else if (renderOptions.stroke !== undefined) {
    context.strokeStyle = renderOptions.stroke;
    context.stroke();
  }
  context.restore();
}

