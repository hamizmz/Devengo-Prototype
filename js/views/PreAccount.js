['../lib/gems.js', '../net/UserStore.js'];

namespace('views').PreAccount = function PreAccount(_dom, _state) {
	this.dom = _dom.container;
	var _onsubmit = this.onsubmit = new gems.Channel();
	
	var _submit_btn = _dom.submit_btn;
	
	function hide(dum) {
		dum.setStyle('display', 'none');
	};
	
	function set(val, dum) {
		if (val)
			hide(dum);
	};
	
	function on_submit(e) {
		var user = _state.user;
		var form = _dom.form;
		user.contact.name = form.name.value;
		user.contact.phone = form.number.value;
		user.contact.email = form.email.value;
		
		user.set_address(form.address.street.value,
			form.address.unit.value, form.address.city.value,
			form.address.province.value, form.address.postal.value);
		
		user.complete = true;
		
		net.UserStore.save();
		
		_onsubmit.broadcast(user);
	};
	
	this.init = function() {
		var user = _state.user;
		var form = _dom.form;
		
		set(user.contact.name, form.name);
		set(user.contact.email, form.email);
		set(user.contact.number, form.number);
		
		set(user.contact.address.street, form.address.container);
		
		_submit_btn.addEventListener('click', on_submit, false);
	};
	
	this.dispose = function() {
		_submit_btn.removeEventListener('click', on_submit, false);
	};
};