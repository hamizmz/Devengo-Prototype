['../models/User.js'];

(function() {
	namespace('net').UserStore = new (function UserStore(_name) {
		var User = models.User;
		var _users = null;
	
		function get_user_filter(type, username, password) {
			return function(item) {
				return (type === User.OPEN_ID &&
					item.type === type) ||
					(item.username === username &&
					item.password === password);
			};
		};
		
		function get_email_filter(email) {
			return function(item) {
				return item.contact.email === email;
			};
		};
		
		function get_username_filter(username) {
			return function(item) {
				return item.username === username;
			};
		};
		
		this.check_email = function(email) {
			return _users.filter(get_email_filter(email)).length > 0;
		};
		
		this.check_username = function(username) {
			return _users.filter(get_username_filter(username)).length > 0;
		};
	
		this.get_user = function(type, username, password) {
			var users = _users.filter(get_user_filter(type, username, password));
			if (users.length > 0)
				return users[0];
			return null;
		};
		
		this.add_user = function(user) {
			_users.push(user);
			this.save();
		}.bind(this);
		
		this.save = function() {
			localStorage.setItem(_name, JSON.stringify(_users));
		};
		
		this.load = function() {
			var item = localStorage.getItem(_name);
			if (item)
				_users = JSON.parse(item);
			else {
				_users = [];
				this.save();
			}
		}.bind(this);
		
		this.load();
	})('user_store');

})();