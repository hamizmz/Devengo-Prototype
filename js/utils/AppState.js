['../lib/gems.js'];

namespace('utils').AppState = new (function AppState() {
	this.inherit = gems.Model;
	this.inherit({
		user: null
	});
	
	this.save = function() {
		localStorage.setItem('app_state', JSON.stringify(this));
	}.bind(this);
	
	this.load = function() {
		var data = localStorage.getItem('app_state');
		if (!data)
			return;
		
		data = JSON.parse(data);
		this.user = data.user;
		// add whatever else hurr
	}.bind(this);
	
	this.load();
})();