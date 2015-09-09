namespace('utils').DOM = (function dom(_doc) {
	var get_item = function(id) {
		return this.getElementById(id);
	}.bind(_doc);
	
	HTMLElement.prototype.by_tag = function(name) {
		return this.getElementsByTagName(name);
	};
	
	HTMLElement.prototype.by_class = function(name) {
		return this.getElementsByClassName(name);
	};
	
	function get_account_pages() {
		var container = get_item('account_pages');
		return {
			container: container,
			history: get_item('account_history'),
			hours: get_item('account_hours'),
			employers: get_item('account_employers'),
			bank: get_item('account_bank')
		};
	};
	
	function get_menu() {
		var container = get_item('account_menu');
		return {
			container: container,
			links: container.by_tag('menu')[0].by_tag('a'),
			stuff: null
		};
	};
	
	function get_header(container) {
		return {
			container: container,
			stuff: null
		};
	};
	
	function get_account() {
		var container = get_item('account');
		return {
			container: container,
			header: get_header(container.by_tag('header')[0]),
			menu: get_menu(),
			pages: get_account_pages()
		};
	};
	
	function get_form_pane(container) {
		return {
			container: container,
			form: container.by_class('Field')[0],
			cancel_btn: container.by_tag('header')[0].by_tag('button')[0]
		};
	};
	
	function get_login() {
		return get_form_pane(get_item('login'));
	};
	
	function get_register() {
		return get_form_pane(get_item('register'));
	};
	
	
	function get_nav(nav) {
		return {
			container: nav,
			left: get_item('slideshow_left'),
			all: nav.by_tag('li'),
			right: get_item('slideshow_right')
		};
	};
	
	function get_slideshow() {
		var container = get_item('slideshow');
		return {
			container: container,
			nav: get_nav(container.by_tag('nav')[0]),
			slides: container.by_class('Slide')
		};
	};
	
	function get_landing() {
		var container = get_item('landing');
		return {
			container: container,
			slideshow: get_slideshow(),
			login_btn: get_item('login_btn'),
			register_btn: get_item('register_btn'),
			footer: container.by_tag('footer')[0]
		};
	};
	
	
	function get_splash() {
		var c = get_item('splash');
		return {
			container: c,
			logo: c.by_tag('h1')[0],
			spinner: c.by_class('Spinner')[0]
		};
	};
	
	function get_views() {
		return {
			view: get_item('view'),
			splash: get_splash(),
			landing: get_landing(),
			register: get_register(),
			login: get_login(),
			account: get_account(),
			footer_tmpl: get_item('footer_template')
		};
	};
	
	return get_views();
})(window.document);
