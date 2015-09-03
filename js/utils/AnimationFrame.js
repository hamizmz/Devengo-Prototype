namespace("utils").AnimationFrame = new (function AnimationFrame(_req) {
	var _id = 1;
	var _requests = [];

	function get_time_passed(last_stamp) {
		return Date.now() - last_stamp;
	};

	function create_request(callback, ms, repeat) {
		return {
			id: _id++,
			interval: ms,
			start: Date.now(),
			fn: callback,
			offset: 0,
			repeat: repeat
		};
	};

	function process_requests(reqs) {
		return function() {
			var req = reqs.shift();
			while (req) {
				var diff = get_time_passed(req.start);
				if (diff >= req.interval - req.offset) {
					req.fn();
					if (req.repeat) {
						req.start = Date.now();
						req.offset = diff - (req.interval - req.offset);
					} else
						clear(req.id);
				}
				req = reqs.shift();
			}
			requestAnimationFrame(check);
		}
	};
	
	function check() {
		if (_requests.length)
			requestAnimationFrame(process_requests(_requests.slice(0)));
	};

	function add_request(req) {
		var l = _requests.push(req);
		if (l === 1) {
			_time = Date.now();
			requestAnimationFrame(process_requests(_requests.slice(0)));
		}
		return req.id;
	};
	
	this.set_interval = function(callback, ms) {
		return add_request(create_request(callback, ms, true));
	};

	this.set_timeout = function(callback, ms) {
		return add_request(create_request(callback, ms, false));
	};

	var clear = this.clear_interval = this.clear_timeout = function(id) {
		for (var i = 0, reqs = _requests, l = reqs.length; i < l; i++) {
			if (reqs[i].id === id)
				return reqs.splice(i, 1);
		}
		return [];
	};
})(window.requestAnimationFrame);
