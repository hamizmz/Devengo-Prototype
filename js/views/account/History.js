['../../lib/gems.js'];

namespace('views.account').History = function History(_dom, _state) {
	this.dom = _dom;
	
	var _hours_clicked = this.hours_clicked = new gems.Channel();
	
	var _source = gems.attach(_state);
	
	var _no_history = document.getElementById('history_none_yet');
	var _history = document.getElementById('history_exists');
	var _submit_hours_btn = document.getElementById('history_submit_hours');
	
	function __constructor__() {
		
	};
	
	this.init = function() {
		if (_state.user.history.length === 0) {
			_history.setStyle('display', 'none');
			_no_history.setStyle('display', 'block');
		} else {
			_no_history.setStyle('display', 'none');
			_history.setStyle('display', 'block');
		}
		
		_submit_hours_btn.addEventListener('click', _hours_clicked.broadcast, false);
	};
	
	this.dispose = function() {
		_submit_hours_btn.removeEventListener('click', _hours_clicked.broadcast, false);
	};
	
	__constructor__.call(this);
};