function decToHex(dec) {
  var base = 16,
      mod = dec % base,
      co = ~~(dec / base), // Floor
      hex = '',
      offset = 10,
      chars = ['A', 'B', 'C', 'D', 'E', 'F'];
    
  while (co > 0) {
    if (co >= offset) {
      hex += chars[co - offset];
    } else {
      hex += co;
    }
    mod = mod % base;
    co = ~~(mod / base);
  }

  if (mod >= offset) {
    hex += chars[mod - offset];
  } else {
    hex += mod;
  }

  return hex;
}