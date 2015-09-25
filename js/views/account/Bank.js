['../../lib/gems.js', '../../net/UserStore.js'];

namespace('views.account').Bank = function Bank(_dom, _state) {
	this.dom = _dom;
	
	var _source = gems.attach(_state).attach('user');
	
	var _edit_button = document.getElementById('bank_edit_button');
	var _save_button = document.getElementById('bank_save_button');
	var _password_reveal = document.getElementById('bank_password_reveal');
	
	var _bank_name_input = document.getElementById('bank_name_input');
	var _institution_input = document.getElementById('bank_instituion_input');
	var _branch_input = document.getElementById('bank_branch_input');
	var _account_input = document.getElementById('bank_account_input');
	var _login_input = document.getElementById('bank_login_input');
	var _password_input = document.getElementById('bank_password_input');
	
	var _inputs = [_bank_name_input, _institution_input,
		_branch_input, _account_input,
		_login_input, _password_input];
	
	function oninputclick(e) {
		e.target.innerHTML = '';
	};
	
	function edit_input(input) {
		input.setAttribute('contenteditable', 'true');
		input.addEventListener('click', oninputclick, false);
	};
	
	function save_input(input) {
		input.removeAttribute('contenteditable');
		input.removeEventListener('click', oninputclick, false);
	};
	
	function setup_edit() {
		_edit_button.setStyle('display', 'none');
		_save_button.setStyle('display', 'inline-block');
		_password_reveal.setStyle('display', 'none');
		
		_inputs.forEach(edit_input);
	};
	
	function setup_norm() {
		_edit_button.setStyle('display', 'inline-block');
		_save_button.setStyle('display', 'none');
		_password_reveal.setStyle('display', 'inline-block');
		
		_inputs.forEach(save_input);
	};
	
	function edit_form() {
		setup_edit(); // is that it?
	};
	
	function save_form() {
		var user = _state.user;
		
		user.bank.name = _bank_name_input.innerHTML;
		user.bank.institution = _institution_input.innerHTML;
		user.bank.branch = _branch_input.innerHTML;
		user.bank.account = _account_input.innerHTML;
		
		user.bank.username = _login_input.innerHTML;
		user.bank.password = _password_input.innerHTML;
		
		user.has_bank = true;
		
		net.UserStore.save();
		// SAVED!
		
		setup_norm();
	};
	
	function view_render(e) {
		if (e.new_value)
			setup_norm();
		else
			setup_edit();
	};
	
	function on_name(e) {
		_bank_name_input.innerHTML = e.new_value;
	};
	
	function on_institution(e) {
		_institution_input.innerHTML = e.new_value;
	};
	
	function on_branch(e) {
		_branch_input.innerHTML = e.new_value;
	};
	
	function on_account(e) {
		_account_input.innerHTML = e.new_value;
	};
	
	function on_username(e) {
		_login_input.innerHTML = e.new_value;
	};
	
	function on_password(e) {
		_password_input.innerHTML = e.new_value;
	};
	
	function __constructor__() {
		_source.attach('has_bank').open(view_render);
		
		var bank_source = _source.attach('bank');
		// TODO: Add multiple properties to an attach statement with one callback
		// TODO: need something to wrap an element with a source and define how to render :)
		bank_source.attach('name').open(on_name);
		bank_source.attach('institution').open(on_institution);
		bank_source.attach('branch').open(on_branch);
		bank_source.attach('account').open(on_account);
		bank_source.attach('username').open(on_username);
		bank_source.attach('password').open(on_password);
		
		_save_button.addEventListener('click', save_form, false);
		_edit_button.addEventListener('click', edit_form, false);
	};
	
	this.init = function() {
		
	};

	this.dispose = function() {
		
	};
	
	__constructor__.call(this);
};