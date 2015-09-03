['../utils/Maths.js', '../lib/gems.js'];

namespace('models').Touch = new (function Touch(_dom, Maths, Vector) {
	// Private class
	function Finger(pos, vel) {
		this.extend = gems.Model;
		this.extend({
			position: pos || new Vector(),
			velocity: vel || new Vector()
		});
	};	
	
	// Inheritence
	this.extend = gems.Model;
	this.extend({
		position: new Vector(),
		velocity: new Vector(),
		moving: false,
		fingers: []
	});
	
	// Helpers
	function get_coord(touch) {
		return new Vector(touch.pageX, touch.pageY);
	};
	
	function new_finger(touch) {
		var f = new Finger();
		f.position = touch ? get_coord(touch) : new Vector();
		return f;
	};
	
	function update_finger(finger, touch) {
		var pos = touch ? get_coord(touch) : new Vector();
		var vel = Vector.subtract(pos, finger.position);
		
		finger.velocity = vel;
		finger.position = pos;
	};
	
	function get_updater(touches) {
		return function(finger, index) {
			update_finger(finger, touches[index]);
		};
	};
	
	// Event Handling
	function update_velocity(e) {
		this.velocity = e.new_value;
	};
	
	function update_position(e) {
		this.position = e.new_value;
	};
	
	var ondown = function(e) {
		if (this.moving || this.fingers.length === e.touches.length)
			return;
		
		this.fingers.push(new_finger(e.touches[e.touches.length - 1]));
		if (this.fingers.length === 1) {
			this.fingers[0].bind('velocity', update_velocity.bind(this));
			this.fingers[0].bind('position', update_position.bind(this));
		}
	}.bind(this);
	
	var onmove = function() {
		var moves = 0;
		return function(e) {
			e.preventDefault();
			if (++moves < e.touches.length)
				return;
			moves = 0;
			this.moving = true;
			this.fingers.forEach(get_updater(e.touches));
		}.bind(this);
	}.bind(this);
	
	var onup = function(e) {
		if (e.touches.length === 0)
			this.moving = false;
		this.fingers.pop();
	}.bind(this);
	
		
	// Event Binding...
	// touch events...
	if ('ontouchstart' in _dom.documentElement) {
		_dom.addEventListener('touchstart', ondown, false);
		_dom.addEventListener('touchmove', onmove(), false);
		_dom.addEventListener('touchend', onup, false);
	} else {
		console.warn('What do we do now?');
		// mouse events.  Cuz like, why not, right?
		//_dom.addEventListener('mousedown', ondown, false);
		//_dom.addEventListener('mousemove', onmove(), false);
		//_dom.addEventListener('mouseup', onup, false);
	}
})(
	window.document,
	utils.Maths,
	utils.Maths.Vector
);
