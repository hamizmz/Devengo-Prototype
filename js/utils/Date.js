['./Maths.js'];

namespace('utils').Date = new (function Date() {
	var Maths = utils.Maths;
	this.total_days = function(date) {
		var month = date.getMonth();
		if (month === 1)
			return date.getYear() % 4 === 0 ? 29 : 28;
		
		if (month <= 6)
			return Maths.is_even(month) === 0 ? 31 : 30;
		return Maths.is_even(month) ? 30 : 31;
	};
	this.last_business_day = function(date) {
		var day_of_m = date.getDate(); // 1st - whenever-th
		var day_of_w = date.getDay(); // 0 - 6 (0 => Sunday)
		if (day_of_w === 0)
			return day_of_m - 2;
		if (day_of_w === 6)
			return day_of_m - 1;
		return day_of_m;
	};
})();