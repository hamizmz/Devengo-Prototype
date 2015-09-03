['./PushPop.js'];

namespace('ui').ViewPusher = function ViewPusher(_container) {
	this.inheritFrom = ui.PushPop;
	this.inheritFrom(_container);
	
	var _old_view = null;
	
	var super_push = this.push;
	this.push = function(view, direction) {
		if (_old_view)
			_old_view.dispose();
		_old_view = view;
		
		super_push(view.dom, direction || 1);
		view.init();
	};
};