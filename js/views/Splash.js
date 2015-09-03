['../lib/morpheus.js'];

namespace('views').Splash = function Splash(container, logo, spinner) {
	this.dom = container;
	
	function setup() {
		logo.addTransition(Morpheus.TRANSFORM, 450, Morpheus.EASE_OUT, 125);
		spinner.addEventListener(Morpheus.TRANSITION_END, onhidden, false);
		spinner.addTransition('opacity', 450, Morpheus.EASE_OUT, 125);
	};
	
	function onhidden(e) {
		spinner.removeEventListener(Morpheus.TRANSITION_END, onhidden, false);
		
		logo.removeTransition(Morpheus.TRANSFORM);
		spinner.removeTransition('opacity');
	};
	
	this.hide = function hide() {
		logo.translation(-100, 0, 0, 'vw');
		spinner.setStyle('opacity', 0);
	};
	
	this.init = function() {
		// ??
	};
	
	this.dispose = function() {
		// ?? CLEANUP
	};
	
	setup();
};