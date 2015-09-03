namespace('views.account').History = function History(_dom) {
	this.dom = _dom;
	
	this.init = function() {
		console.log('HISTORY INITIALIZED');
	};
	
	this.dispose = function() {
		console.log('HISTORY DISPOSED');
	};
};