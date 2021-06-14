function Cube(x, y, z, size) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.angleX = 0;
  this.size = size;
  this.points = [];
  this.savedPoints = [];
  this._createPoints();
}

Cube.prototype._createPoints = function() {
  var halfSize = this.size / 2;
  this.points.push({ x: this.x - halfSize, y: this.y - halfSize, z: this.z + halfSize });
  this.points.push({ x: this.x + halfSize, y: this.y - halfSize, z: this.z + halfSize });
  this.points.push({ x: this.x + halfSize, y: this.y + halfSize, z: this.z + halfSize });
  this.points.push({ x: this.x - halfSize, y: this.y + halfSize, z: this.z + halfSize });
  this.points.push({ x: this.x - halfSize, y: this.y - halfSize, z: this.z - halfSize });
  this.points.push({ x: this.x + halfSize, y: this.y - halfSize, z: this.z - halfSize });
  this.points.push({ x: this.x + halfSize, y: this.y + halfSize, z: this.z - halfSize });
  this.points.push({ x: this.x - halfSize, y: this.y + halfSize, z: this.z - halfSize });
}

Cube.prototype._project = function(fov) {
  var l = this.points.length;
  for (var i = 0; i < l; i++) {
    var point = this.points[i],
        scale = fov / (fov + point.z);
    point.sx = point.x * scale;
    point.sy = point.y * scale;
  }
}

Cube.prototype.stroke = function(context, fov) {
  // Project to 2D
  this._project(fov);
  var flt = this.points[0], // Front left top
      frt = this.points[1], // Front right top
      frb = this.points[2], // Front right bottom
      flb = this.points[3], // Front left bottom
      blt = this.points[4], // Back left top
      brt = this.points[5], // Back right top
      brb = this.points[6], // Back right bottom
      blb = this.points[7]; // Back left bottom
  context.save();
  context.beginPath();
  context.rect(flt.sx, flt.sy, frt.sx - flt.sx, flb.sy - flt.sy); // Front face
  context.rect(blt.sx, blt.sy, brt.sx - blt.sx, blb.sy - blt.sy); // Back face
  context.moveTo(flt.sx, flt.sy);
  context.lineTo(blt.sx, blt.sy);
  context.moveTo(frt.sx, frt.sy);
  context.lineTo(brt.sx, brt.sy);
  context.moveTo(frb.sx, frb.sy);
  context.lineTo(brb.sx, brb.sy);
  context.moveTo(flb.sx, flb.sy);
  context.lineTo(blb.sx, blb.sy);
  context.closePath();
  context.stroke();
  context.restore();
}

Cube.prototype.fill = function(context, fov) {
  // Project to 2D
  this._project(fov);
  var flt = this.points[0], // Front left top
      frt = this.points[1], // Front right top
      frb = this.points[2], // Front right bottom
      flb = this.points[3], // Front left bottom
      blt = this.points[4], // Back left top
      brt = this.points[5], // Back right top
      brb = this.points[6], // Back right bottom
      blb = this.points[7]; // Back left bottom
  context.save();
  context.fillStyle = '#F00';
  context.beginPath();
  context.fillRect(flt.sx, flt.sy, frt.sx - flt.sx, flb.sy - flt.sy); // Front face
  context.closePath();
  context.restore();
  context.save();
  context.fillStyle = '#00F';
  context.beginPath();
  context.fillRect(blt.sx, blt.sy, brt.sx - blt.sx, blb.sy - blt.sy); // Back face
  context.closePath();
  context.restore();
  // Left face
  context.save();
  context.fillStyle = '#0F0';
  context.beginPath();
  context.moveTo(flt.sx, flt.sy);
  context.lineTo(blt.sx, blt.sy);
  context.lineTo(blb.sx, blb.sy);
  context.lineTo(flb.sx, flb.sy);
  context.closePath();
  context.fill();
  context.restore();
  // Right face
  context.save();
  context.fillStyle = '#FF0';
  context.beginPath();
  context.moveTo(frt.sx, frt.sy);
  context.lineTo(brt.sx, brt.sy);
  context.lineTo(brb.sx, brb.sy);
  context.lineTo(frb.sx, frb.sy);
  context.closePath();
  context.fill();
  context.restore();
  // Top face
  context.save();
  context.fillStyle = '#0FF';
  context.beginPath();
  context.moveTo(flt.sx, flt.sy);
  context.lineTo(blt.sx, blt.sy);
  context.lineTo(brt.sx, brt.sy);
  context.lineTo(frt.sx, frt.sy);
  context.closePath();
  context.fill();
  context.restore();
  // Bottom face
  context.save();
  context.fillStyle = '#F0F';
  context.beginPath();
  context.moveTo(flb.sx, flb.sy);
  context.lineTo(blb.sx, blb.sy);
  context.lineTo(brb.sx, brb.sy);
  context.lineTo(frb.sx, frb.sy);
  context.closePath();
  context.fill();
  context.restore();
}

Cube.prototype.save = function() {
  this.savedPoints = this.points;
}

Cube.prototype.restore = function() {
  this.points = this.savedPoints;
}

Cube.prototype.translate = function(x, y, z) {
  var l = this.points.length;
  for (var i = 0; i < l; i++) {
    var p = this.points[i];
    p.x += x;
    p.y += y;
    p.z += z;
  }
}

Cube.prototype.rotateX = function(angle) {
  var l = this.points.length,
      cos = Math.cos(angle),
      sin = Math.sin(angle);
  for (var i = 0; i < l; i++) {
    var p = this.points[i];
    p.y = p.y * cos - p.z * sin;
    p.z = p.z * cos + p.y * sin;
  }
}