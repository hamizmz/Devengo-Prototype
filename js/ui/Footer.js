/* Takes a footer template and injects it where necessary */

namespace('ui').Footer = function Footer(input, output) {
	function __constructor__() {
		output.innerHTML = input.innerHTML;
	};
	
	this.init = function() {
		//console.log('FOOTER - ENABLED!');
	};
	
	this.dispose = function() {
		//console.log('FOOTER - DISABLED');
	};
	
	__constructor__.call(this);
};
