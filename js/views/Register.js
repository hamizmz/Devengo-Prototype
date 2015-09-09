['../lib/gems.js', '../models/User.js', '../net/UserStore.js'];

namespace('views').Register = function Register(_dom, _form, _close) {
	var Store = net.UserStore;
	var User = models.User;
	var State = utils.AppState;
	
	this.dom = _dom;
	
	var _buttons = (function(form) {
		var btns = form.by_tag('button');
		
		return {
			register: btns[0],
			fb: btns[1],
			others: [btns[2], btns[3], btns[4]]
		};
	})(_form);
	
	var _oncancel = this.oncancel = new gems.Channel();
	var _onlogin = this.onlogin = new gems.Channel();
	
	function onclose(e) {
		_oncancel.broadcast();
	};
	
	function onfacebook(e) {
		var user = Store.get_user(User.OPEN_ID, 'facebook', 'password');
		if (user)
			alert('User already exists.  Try logging in.');
		else {
			var fb_user = new User(User.OPEN_ID);
			fb_user.verified = true;
			fb_user.set_login('facebook', 'password');
			fb_user.set_contact('Andrew LaFleur', 'andrew@devengo.ca', '1-905-555-5678');
			
			Store.add_user(fb_user);
			
			_onlogin.broadcast(fb_user);
		}
	};
	
	function onbuttonclick(e) {
		alert('Not available in MVP');
	};
	
	function onsubmit(e) {
		var inputs = _form.by_tag('input');
		var email = inputs[0].value;
		var username = inputs[1].value;
		var password = inputs[2].value;
		
		if (Store.check_email(email))
			alert('Email is already registered.');
		else if (Store.check_username(username))
			alert('Username already exists.');
		else {
			var user = new User(User.DEFAULT);
			user.verified = true;
			user.set_login(username, password);
			user.set_contact('', email, '');
			
			Store.add_user(user);
			
			_onlogin.broadcast(user);
		}
	};
	
	function init_buttons(btns) {
		btns.fb.addEventListener('click', onfacebook, false);
		btns.register.addEventListener('click', onsubmit, false);
		
		for (var i = 0, l = btns.others.length; i < l; i++)
			btns.others[i].addEventListener('click', onbuttonclick, false);
	};
	
	function dispose_buttons(btns) {
		btns.fb.removeEventListener('click', onfacebook, false);
		btns.register.removeEventListener('click', onsubmit, false);
		
		for (var i = 0, l = btns.others.length; i < l; i++)
			btns.others[i].removeEventListener('click', onbuttonclick, false);
	};
	
	this.init = function() {
		init_buttons(_buttons);
		
		_close.addEventListener('click', onclose, false);
	};
	
	this.dispose = function() {
		dispose_buttons(_buttons);
		
		_close.removeEventListener('click', onclose, false);
	};
};