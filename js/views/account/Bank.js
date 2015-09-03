namespace('views.account').Bank = function Bank(_dom) {
	this.dom = _dom;
	
	this.init = function() {
		console.log('BANK INITIALIZED');
	};

	this.dispose = function() {
		console.log('BANK DISPOSED');
	};
};