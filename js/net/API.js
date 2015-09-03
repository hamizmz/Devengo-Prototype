['./REST.js'];

namespace("net").API = new (function API(REST) {
	var SERVER = 'http://69.112.61.118/fake_server';
	var END_POINT = '/comics.json';

	function get_comics_callback(callback) {
		return function(jsun) {
			callback(jsun.comics);
		};
	};

	this.get_comics = function(success, error) {
		REST.get(SERVER + END_POINT,
			REST.get_json_callback(
				get_comics_callback(success)), error);
	};
})(net.REST);
