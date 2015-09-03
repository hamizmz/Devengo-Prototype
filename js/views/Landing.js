['../ui/Slideshow.js', '../lib/morpheus.js',
'../ui/PushPop.js',
'../ui/Footer.js', '../utils/DOM.js',
'./Login.js', './Register.js'];

namespace('views').Landing = function Landing(_view, _dom, _slideshow_dom, _loginbtn, _registerbtn) {
	var DOM = utils.DOM;
	
	var _login = new views.Login(DOM.login.container, DOM.login.form, DOM.login.cancel_btn);
	var _register = new views.Register(DOM.register.container, DOM.register.form, DOM.register.cancel_btn);
	
	var _slideshow = new ui.Slideshow(_slideshow_dom.container, _slideshow_dom.slides);
	var _lastIndex = 0;
	var _left = _slideshow_dom.nav.left;
	var _right = _slideshow_dom.nav.right;
	var _nav = _slideshow_dom.nav.all;
	
	var _footer = new ui.Footer(DOM.footer_tmpl, _dom.getElementsByTagName('footer')[0]);
	
	this.dom = _dom;
	
	function on_shift(old_index, new_index) {
		_lastIndex = new_index;
		_nav[old_index + 1].className = '';
		_nav[new_index + 1].className = 'Selected';
	};
	
	function get_clicker(index) {
		return function(e) {
			if (index < _lastIndex)
				_slideshow.goto(index, -1);
			else
				_slideshow.goto(index, 1);
		};
	};
	
	function leave_login() {
		_login.dispose();
		_view.push(_dom, 1);
	};
	
	function leave_register() {
		_register.dispose();
		_view.push(_dom, 1);
	};
	
	function push_login(e) {
		_login.oncancel.connect(leave_login);
		_view.push(_login.dom, -1);
		_login.init();
	};
	
	function push_register(e) {
		_register.oncancel.connect(leave_register);
		_view.push(_register.dom, -1);
		_register.init();
	};
	
	function setup_buttons() {
		_loginbtn.addEventListener('click', push_login, false);
		_registerbtn.addEventListener('click', push_register, false);
	};
	
	function disable_buttons() {
		_loginbtn.removeEventListener('click', push_login, false);
		_registerbtn.removeEventListener('click', push_register, false);
	};
	
	function setup_slideshow_nav() {
		_nav[0].parentNode.addTransition('opacity', 250, 'ease-out', 0);
		_slideshow.position.connect(on_shift);
		
		_left.addEventListener('click', _slideshow.prev, false);
		_right.addEventListener('click', _slideshow.next, false);
		
		for (var i = 1, l = _nav.length - 1; i < l; i++)
			_nav[i].addEventListener('click', get_clicker(i - 1), false);
	};
	
	function reveal_slideshow() {
		_slideshow.goto(0);
		_slideshow_dom.container.addTransition(Morpheus.TRANSFORM, 500, 'ease-out', 0);
		_slideshow_dom.container.setStyle('opacity', 1);
	};
	
	function hide_slideshow() {
		_slideshow_dom.container.setStyle('opacity', 0);
	};
	
	this.init = function() {
		reveal_slideshow();
		setup_slideshow_nav();
		setup_buttons();
		_footer.init();
	};
	
	this.dispose = function() {
		hide_slideshow();
		disable_buttons();
		_footer.dispose();
		
		// remove slideshow_nav listeners....
	};
};