['../lib/gems.js'];

namespace('ui').AccountDash = function AccountDash(_dom, _source) {
	this.dom = _dom;
	
	var _name = _source.attach('contact').attach('name').open(update_name);
	
	function update_name(e) {
		console.log('here...');
		console.log(e);
	};
};