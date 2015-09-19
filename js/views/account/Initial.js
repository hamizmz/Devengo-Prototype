['../../lib/gems.js'];

namespace('views.account').Initial = function Initial(_dom, _state) {
	this.dom = _dom;
	
	var _link = this.link = new gems.Channel();
	
	var _source = gems.attach(_state).attach('user');
	var _list = _dom.by_tag('li');
	
	function __constructor__() {
		_source.attach('has_bank').open(on_bank);
		_source.attach('has_employer').open(on_employer);
		
		_list[0].by_tag('button')[0].addEventListener('click', onclick_bank, false);
		_list[1].by_tag('button')[0].addEventListener('click', onclick_employer, false);
		_list[2].by_tag('button')[0].addEventListener('click', onclick_hours, false);
	};
	
	function onclick_bank() {
		if (_state.user.has_bank)
			return;
		_link.broadcast(1);
	};
	
	function onclick_employer() {
		if (_state.user.has_employer)
			return;
		_link.broadcast(2);
	};
	
	function onclick_hours() {
		_link.broadcast(3);
	};
	
	function on_bank(e) {
		_list[0].className = e.new_value ? 'Completed' : '';
	};
	
	function on_employer(e) {
		_list[1].className = e.new_value ? 'Completed' : '';
	};
	
	this.init = function() {
	};
	
	this.dispose = function() {
	};
	
	__constructor__.call(this);
};