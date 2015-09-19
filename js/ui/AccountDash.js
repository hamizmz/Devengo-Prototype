['../lib/gems.js'];

namespace('ui').AccountDash = function AccountDash(_dom, _source) {
	this.dom = _dom;
	var _wage_caps = [0, 250, 500, 1000, 2000, 5000];
	
	var _employer_src = _source.attach('employer');
	
	function set(id, val) {
		document.getElementById(id).innerHTML = val;
	};
	
	function get_max_wages(tier) {
		return _wage_caps[tier];
	};
	
	
	function update_name(e) {
		set('account_name', e.new_value);
	};
	
	function update_balance(e) {
		set('account_balance', '$' + e.new_value)
	};
	
	function update_tier(e) {
		set('account_tier', 'Tier ' + e.new_value);
	};
	
	function update_expiration(e) {
		set('account_expiration', 'Registered until ' + e.new_value)
	};
	
	function update_paycheque(e) {
		set('account_paycheque', e.new_value)
	};
	
	function update_amount_earned(e) {
		set('account_amount_earned', '$' + e.new_value);
	};
	
	function update_hours_earned(e) {
		set('account_hours_earned', '(' + e.new_value + ' hours)');
	};
	
	function logout(e) {
		
	};
	
	this.init = function() {
		_source.attach('contact').attach('name').open(update_name);
		
		_source.attach('tier').open(update_tier);
		_source.attach('expiration').open(update_expiration);
		
		_source.attach('bank').attach('balance').open(update_balance);
		
		_employer_src.attach('next_cheque').open(update_paycheque);
		_employer_src.attach('amount_earned').open(update_amount_earned);
		_employer_src.attach('hours_earned').open(update_hours_earned);
		
		var controls = document.getElementById('account_controls').by_tag('a');
		
		//controls[0].addEventListener('click', get_help, false);
		//controls[1].addEventListener('click', logout, false);
	};
	
	this.dispose = function() {
		// TODO: seriously.  dispose of these source attachments (although, setting user to null
			// KIND of takes care of it...)
	};
	
	this.init();
};