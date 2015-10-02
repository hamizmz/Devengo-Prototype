['../../lib/gems.js'];

namespace('views.account').Hours = function Hours(_dom, _state) {
	this.dom = _dom;
	var _source = gems.attach(_state).attach('user');
	var _register_clicked = this.register_clicked = new gems.Channel();
	
	var _banked_field = document.getElementById('hours_banked');
	var _quota_field = document.getElementById('hours_quota');
	var _expiration_field = document.getElementById('hours_expiration');
	var _progress_bar = document.getElementById('hours_progress');
	
	var none = document.getElementById('hours_no_employment');
	var some = document.getElementById('hours_has_employment');
	
	var register_btn = document.getElementById('hours_register_employment');
	
	function __constructor__() {
		// we need to check if we have an employer.  If not, show a different screen :)
		var hours_src = _source.attach('hours');
		hours_src.attach('banked').open(render_banked);
		hours_src.attach('quota').open(render_quota);
		
		_source.attach('employer').attach('next_cheque').open(render_expiration);
		_source.attach('has_employer').open(render_view);
	};
	
	function render_view(e) {
		if (e.new_value) {
			none.setStyle('display', 'none');
			some.setStyle('display', 'block');
		} else {
			none.setStyle('display', 'block');
			some.setStyle('display', 'none');
		}
	};
	
	function render_banked(e) {
		_banked_field.innerHTML = '$' + e.new_value;
	};
	
	function render_quota(e) {
		_quota_field.innerHTML = '$' + e.new_value;
		render_progress();
	};
	
	function render_expiration(e) {
		_expiration_field.innerHTML = e.new_value;
		render_progress();
	};
	
	function render_progress() {
		var percent = Math.round((_state.user.hours.banked / _state.user.hours.quota) * 100);
		_progress_bar.setStyle('width', percent, '%');
	};
	
	this.init = function() {
		register_btn.addEventListener('click', _register_clicked.broadcast, false);
	};

	this.dispose = function() {
		register_btn.removeEventListener('click', _register_clicked.broadcast, false);
	};
	
	__constructor__.call(this);
};