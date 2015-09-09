['../lib/gems.js', '../models/User.js', '../net/UserStore.js'];

namespace('views').Login = function Login(_dom, _form, _close) {
	var Store = net.UserStore;
	var User = models.User;
	var State = utils.AppState;
	
	this.dom = _dom;
	
	var _buttons = (function(form) {
		var btns = form.by_tag('button');
		
		return {
			login: btns[0],
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
		
		if (!user)
			alert('User does not exist.  Please register.');
		else
			_onlogin.broadcast(user);
	};
	
	function onbuttonclick(e) {
		alert('Not available in MVP');
	};
	
	function onsubmit(e) {
		var inputs = _form.by_tag('input');
		var username = inputs[0].value;
		var password = inputs[1].value;
		
		var user = Store.get_user(User.DEFAULT, username, password);
		
		if (!user)
			alert('No such user found or password is incorrect.');
		else
			_onlogin.broadcast(user);
	};
	
	function init_buttons(btns) {
		btns.fb.addEventListener('click', onfacebook, false);
		btns.login.addEventListener('click', onsubmit, false);
		
		for (var i = 0, l = btns.others.length; i < l; i++)
			btns.others[i].addEventListener('click', onbuttonclick, false);
	};
	
	function dispose_buttons(btns) {
		btns.fb.removeEventListener('click', onfacebook, false);
		btns.login.removeEventListener('click', onsubmit, false);
		
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