var Mouse = {
  x: 0,
  y: 0,
  onMouseMove: function(event) {
    this.x = event.clientX;
    this.y = event.clientY;
  },
  listenTo: function(domElement) {
    this.onMouseMove = this.onMouseMove.bind(this);
    domElement.addEventListener('mousemove', this.onMouseMove, false);
  }
};

var Keyboard = {
  pressing: {
    ArrowLeft: 0,
    ArrowUp: 0,
    ArrowRight: 0,
    ArrowDown: 0
  },
  onKeyDown: function(event) {
    var code = event.code;
    this.pressing[code] = 1;
  },
  onKeyUp: function(event) {
    var code = event.code;
    this.pressing[code] = 0;
  },
  listenTo: function(domElement) {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    domElement.addEventListener('keydown', this.onKeyDown, false);
    domElement.addEventListener('keyup', this.onKeyUp, false);
  }
}