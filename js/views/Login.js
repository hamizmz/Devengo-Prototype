['../lib/gems.js'];

namespace('views').Login = function Login(_dom, _form, _close) {
	this.dom = _dom;
	var _oncancel = this.oncancel = new gems.Channel();
	
	function onclose(e) {
		_oncancel.broadcast();
	};
	
	this.init = function() {
		_close.addEventListener('click', onclose, false);
	};
	
	this.dispose = function() {
		_close.removeEventListener('click', onclose, false);
	};
};