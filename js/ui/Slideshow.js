['../lib/gems.js', '../utils/Maths.js', './PushPop.js'];

namespace('ui').Slideshow = function Slideshow(_container, _list) {
	var Maths = utils.Maths;
	var _index = 0;
	var _max = _list.length - 1;
	var _pushpop = new ui.PushPop(_container);
	
	this.dom = _container;
	this.position = new gems.Channel();
	
	this.next = function() {
		var old = _index;
		var i = _index = Maths.get_next(old, 1, 0, _max, true);
		_pushpop.push(_list[i], 1);
		this.position.broadcast(old, i);
	}.bind(this);
	
	this.prev = function() {
		var old = _index;
		var i = _index = Maths.get_next(old, -1, 0, _max, true);
		_pushpop.push(_list[i], -1);
		this.position.broadcast(old, i);
	}.bind(this);
	
	this.goto = function(index, direction) {
		var old = _index;
		_index = index;
		_pushpop.push(_list[index], direction || 1);
		this.position.broadcast(old, index);
	}.bind(this);
	
	_pushpop.push(_list[0], 1);
};
