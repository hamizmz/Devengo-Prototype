['../../lib/gems.js', '../../lib/morpheus.js', '../../net/UserStore.js'];

namespace('views.account').Employers = function Employers(_dom, _state) {
	this.dom = _dom;
	var _refresh = this.refresh = new gems.Channel();
	var _source = gems.attach(_state).attach('user');
	
	//var _add_button = document.getElementById('employers_add');
	var _edit_button = document.getElementById('employers_edit');
	var _submit_button = document.getElementById('employers_submit');
	var _cancel_button = document.getElementById('employers_cancel');
	
	var _form = document.getElementById('employers_form');
	var _info = document.getElementById('employers_info');
	
	var _employer_name = document.getElementById('employers_name');
	var _employer_phone = document.getElementById('employers_phone');
	var _employer_address = document.getElementById('employers_address');
	
	var _name_input = document.getElementById('employers_name_input');
	var _phone_input = document.getElementById('employers_phone_input');
	var _street_input = document.getElementById('employers_street_input');
	var _city_input = document.getElementById('employers_city_input');
	var _prov_input = document.getElementById('employers_prov_input');
	var _postal_input = document.getElementById('employers_postal_input');
	
	function __constructor__() {
		var emp_src = _source.attach('employer');
		emp_src.attach('name').open(render_name);
		emp_src.attach('phone').open(render_phone);
		emp_src.attach('address').open(render_address);
		
		var address_src = emp_src.attach('address');
		address_src.attach('street').open(render_address);
		address_src.attach('city').open(render_address);
		address_src.attach('province').open(render_address);
		address_src.attach('postal').open(render_address);
		
		_source.attach('has_employer').open(render_view);
		//_source.attach('has_employer').open(render_add_button);
	};
	
	function render_view(e) {
		if (e.new_value)
			show_info();
		else
			show_form();
	};
	
	function render_add_button(e) {
		//_add_button.setStyle('display', e.new_value ? 'none' : 'inline-block');
	};
	
	function render_name(e) {
		_employer_name.innerHTML = _name_input.value = e.new_value;
	};
	
	function render_phone(e) {
		_employer_phone.innerHTML = _phone_input.value = e.new_value;
	};
	
	function render_address(e) {
		var address = _state.user.employer.address;
		
		_street_input.value = address.street;
		_city_input.value = address.city;
		_prov_input.value = address.province;
		_postal_input.value = address.postal;
		
		_employer_address.innerHTML = address.street + '<br />' +
			address.city + ', ' + address.province +
			'<br />' + address.postal;
	};
	
	function show_form() {
		_info.setStyle('display', 'none');
		_form.setStyle('display', 'block');
		
		_cancel_button.setStyle('display', _state.user.has_employer ? 'inline-block' : 'none');
		
		setTimeout(_refresh.broadcast, 250);
	};
	
	function show_info() {
		_info.setStyle('display', 'block');
		_form.setStyle('display', 'none');
		
		setTimeout(_refresh.broadcast, 250);
	};
	
	function submit_form(e) {
		// do what you gotta do here, bruh
		var user = _state.user;
		
		user.set_employer(_name_input.value, _phone_input.value, _street_input.value,
				_city_input.value, _prov_input.value, _postal_input.value);
		user.has_employer = true;
		
		net.UserStore.save();
	};
	
	this.init = function() {
		//_add_button.addEventListener('click', show_form, false);
		_edit_button.addEventListener('click', show_form, false);
		_submit_button.addEventListener('click', submit_form, false);
		_cancel_button.addEventListener('click', show_info, false);
	};

	this.dispose = function() {
		//_add_button.removeEventListener('click', show_form, false);
		_edit_button.removeEventListener('click', show_form, false);
		_submit_button.removeEventListener('click', submit_form, false);
		_cancel_button.removeEventListener('click', show_info, false);
	};
	
	__constructor__.call(this);
};