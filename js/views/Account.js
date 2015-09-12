[
'../utils/DOM.js',

'../ui/Footer.js',
'../ui/ViewPusher.js',
'../ui/AccountDash.js',

'../views/account/History.js',
'../views/account/Hours.js',
'../views/account/Employers.js',
'../views/account/Bank.js'
];

namespace('views').Account = function Account(_dom, _state) {
	this.dom = _dom.container;
	
	var _viewpusher = new ui.ViewPusher(_dom.pages.container);
	
	var _account_dash = new ui.AccountDash(_dom.header, gems.attach(_state).attach('user'));
	
	var _pages = _dom.pages.container;
	var _history = new views.account.History(_dom.pages.history);
	var _hours = new views.account.Hours(_dom.pages.hours);
	var _employers = new views.account.Employers(_dom.pages.employers);
	var _bank = new views.account.Bank(_dom.pages.bank);
	
	var _menu_links = _dom.menu.links;
	var _last_item = _menu_links[0].parentNode;
	
	var _footer = new ui.Footer(utils.DOM.footer_tmpl, this.dom.getElementsByTagName('footer')[0]);
	
	var push_view = function(view) {
		_viewpusher.push(view, -1);
		_pages.setStyle('height', view.dom.offsetHeight, 'px');
	}.bind(this);
	
	function select_item(index) {
		_last_item.className = '';
		var item = _last_item = _menu_links[index].parentNode;
		item.className = 'Selected';
	};
	
	var get_on_click = function(index) {
		return function() {
			select_item(index);
			
			if (index === 0)
				this.show_history();
			else if (index === 1)
				this.show_hours();
			else if (index === 2)
				this.show_employers();
			else if (index === 3)
				this.show_bank();
		}.bind(this);
	}.bind(this);
	
	function hook_listener(item, index) {
		item.addEventListener('click', get_on_click(index), false);
	};
	
	this.init = function() {
		_pages.addTransition('height', 250, 'ease-out', 0);
		_footer.init();
		
		setTimeout(this.show_history, 350);
	}.bind(this);
	
	this.dispose = function() {
		_footer.dispose();
	};
	
	this.show_history = function() {
		push_view(_history);
		select_item(0);
	};
	
	this.show_hours = function() {
		push_view(_hours);
		select_item(1);
	};
	
	this.show_employers = function() {
		push_view(_employers);
		select_item(2);
	};
	
	this.show_bank = function() {
		push_view(_bank);
		select_item(3);
	};
	
	for (var i = 0, m = _menu_links, l = m.length; i < l; i++)
		hook_listener(m[i], i);
};