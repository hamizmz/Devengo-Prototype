namespace('net').REST = new (function REST() {
	/*
		Here we need to leverage RequestWorker and stack our requests by id.
		Then, we need to get our Frame model to load images via this method
		as well, bruh.
	*/
	var _serial = 0;
	var _requests = {};
	var _thread = new Worker('js/net/RequestWorker.js');
	
	_thread.addEventListener('message', onmessage, false);
	
	function onmessage(e) {
		var response = e.data;
		var request = get_request(response.id);
		
		if (response.success)
			request.success(response.data);
		else
			request.error();
		
		remove_request(request);
	};
	
	function create_request(i, u, m, d, t, s, e) {
		return {
			id: i, src: u, method: m, data: d, type: t,
			success: s || function() {}, error: e || function() {}
		}
	};
	
	function get_request(id) {
		return _requests[id];
	};
	
	function remove_request(req) {
		requestAnimationFrame(function() {
			delete _requests[req.id];
		});
	};
	
	function add_request(req) {
		return _requests[req.id] = req;
	};
	
	var _send = function(u, m, d, s, e, t) {
		requestAnimationFrame(function() {
			_thread.postMessage(JSON.stringify(add_request(create_request(_serial++, u, m, d, t, s, e))));
		});
	};
	
	this.get = function(url, success, error, type) {
		_send(url, 'GET', null, success, error, type);
	};

	this.put = function(url, data, success, error) {
		_send(url, 'PUT', data, success, error);
	};

	this.post = function(url, data, success, error) {
		_send(url, 'POST', data, success, error);
	};

	this.delete = function(url, success, error) {
		_send(url, 'DELETE', null, success, error);
	};

	this.get_json_callback = function(callback) {
		return function(data) {
			callback(JSON.parse(data));
		};
	};
})();
