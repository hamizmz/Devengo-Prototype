/* API Worker */
function create_response(id, success, data) {
	return {
		id: id,
		success: success,
		data: data || null
	};
};

function success(req, args) {
	return create_response(
		args.id,
		true,
		req.response
	);
};

function failure(req, args) {
	return create_response(args.id, false);
};

function get_request_handler(args) {
	return function() {
		if (this.readyState === 4) {
			if (this.status === 200)
				self.postMessage(success(this, args));
			else
				self.postMessage(failure(this, args));
		}
	};
};

function send_request(args) {
	var req = new XMLHttpRequest();
	req.open(args.method || 'GET', args.src, true);
	if (args.type)
		req.responseType = args.type;
	req.onreadystatechange = get_request_handler(args);
	req.send(args.data || null);
};

function onmessage(e) {
	send_request(JSON.parse(e.data));
};

self.addEventListener('message', onmessage, false);
