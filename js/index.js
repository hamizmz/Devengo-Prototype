['./lib/morpheus.js',
'./utils/DOM.js',

'./ui/Slideshow.js',
'./ui/ViewPusher.js',

'./views/Splash.js',
'./views/Landing.js',
'./views/Account.js',
'./views/PreAccount.js',

'./utils/AppState.js'];

function __main__() {
	var DOM = utils.DOM;
	var SPLASH_TIME = 1000;
	
	var _viewpusher = window.viewpusher = new ui.ViewPusher(DOM.view);
	var _splash = new views.Splash(
		DOM.splash.container,
		DOM.splash.logo,
		DOM.splash.spinner);
	
	var _landing = new views.Landing(
		_viewpusher,
		DOM.landing.container,
		DOM.landing.slideshow,
		DOM.landing.login_btn,
		DOM.landing.register_btn);
	
	var _account = window.account = new views.Account(DOM.account, utils.AppState);
	
	var _pre = new views.PreAccount(DOM.preaccount, utils.AppState);
	
	function start() {
		_viewpusher.push(_splash, 1);
		setTimeout(_splash.hide, SPLASH_TIME);
		setTimeout(show_landing, SPLASH_TIME + 500);
		//setTimeout(show_account, SPLASH_TIME + 500);
	};
	
	function onuserlogin(user) {
		utils.AppState.user = user;
		
		if (user.complete)
			show_account();
		else
			show_preaccount();
	};
	
	function onsubmit(user) {
		show_account();
	};
	
	window.show_landing = function show_landing() {
		_landing.onlogin.connect(onuserlogin);
		_viewpusher.push(_landing);
	};
	
	window.show_account = function show_account() {
		_viewpusher.push(_account, 1);
	};
	
	window.show_preaccount = function() {
		_pre.onsubmit.connect(onsubmit);
		_viewpusher.push(_pre, 1);
	};
	
	function return_to_slideshow(e) {
		e.target.style.display = 'none';
		_loginbtn.style.display = 'inline-block';
		_registerbtn.style.display = 'inline-block';
		
		_slideshow.goto(0);
		_nav[0].parentNode.setStyle('opacity', 1);
	};
	
	/* We shall start in X ms */
	setTimeout(start, SPLASH_TIME / 2);
};
