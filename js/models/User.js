['../lib/gems.js', '../utils/Date.js'];

(function() {
	var serial = 0;
	
	function get_arbitrary_date(now) {
		var day = now.getDate() < 15 ? 15 : utils.Date.total_days(now);
		
		now.setDate(day);
		now.setDate(utils.Date.last_business_day(now));
		return now;
	};
	
	function get_last_day(now) {
		now.setDate(utils.Date.total_days(now));
		return now;
	};
	
	function get_quota(tier) {
		if (tier === 1)
			return 250;
		if (tier === 2)
			return 500;
		if (tier === 3)
			return 1000;
		if (tier === 4)
			return 2500;
		return 0;
	};
	
	namespace('models').User = function User(_type) {
		// Inherit from gems.Model (code at the bottom)
		var __self__ = this;
		
		this.id = serial++;
		this.type = _type;
		this.username = '';
		this.password = '';
		
		this.verification_code = 1234;
		
		this.verified = false;
		this.has_employer = false;
		this.has_bank = false;
		
		this.complete = false;
		this.tier = 1;
		this.expiration = get_last_day(new Date()).toLocaleDateString();
		
		this.__ignore__ = ['expiration'];
		
		this.history = [];
		
		this.contact = new gems.Model({
			name: '',
			email: '',
			avatar: '/assets/images/avatars/lafleur.jpg',
			phone: '',
			address: new gems.Model({
				street: '',
				unit: '',
				city: '',
				province: '',
				postal: ''
			})
		});
		
		this.employer = new gems.Model({
			name: '',
			phone: '',
			address: new gems.Model({
				street: '',
				city: '',
				province: '',
				postal: ''
			}),
			next_cheque: get_arbitrary_date(new Date()).toLocaleDateString(),
			hours_earned: 0,
			amount_earned: 0,
			__ignore__: ['next_cheque']
		});
		
		this.bank = new gems.Model({
			name: '',
			institution: '',
			branch: '',
			account: '',
			balance: 0,
			
			username: '',
			password: ''
		});
		
		this.hours = new gems.Model({
			banked: 0,
			quota: get_quota(__self__.tier),
			__ignore__: ['quota']
		});
		
		this.set_login = function(username, password) {
			this.username = username;
			this.password = password;
		}.bind(this);
		
		this.set_contact = function(name, email, phone) {
			this.contact.name = name;
			this.contact.email = email;
			this.contact.phone = phone;
		}.bind(this);
		
		this.set_address = function(street, unit, city, province, postal) {
			this.contact.address.street = street;
			this.contact.address.unit = unit || '';
			this.contact.address.city = city;
			this.contact.address.province = province;
			this.contact.address.postal = postal;
		}.bind(this);
		
		this.set_photo = function(urlOrBlob) {
			if (typeof urlOrBlob === 'string')
				this.contact.avatar = urlOrBlob;
			else
				this.contact.avatar = window.URL.createObjectURL(urlOrBlob);
		}.bind(this);
		
		this.set_bank = function(name, number, branch, account, login, pass) {
			this.bank.name = name;
			this.bank.institution = number;
			this.bank.branch = branch;
			this.bank.account = account;
			
			this.bank.username = login;
			this.bank.password = pass;
		}.bind(this);
		
		this.set_employer = function(name, phone, street, city, province, postal) {
			this.employer.name = name;
			this.employer.phone = phone;
			this.employer.address.street = street;
			this.employer.address.city = city;
			this.employer.address.province = province;
			this.employer.address.postal = postal;
		}.bind(this);
		
		this.verify = function(code) {
			if (code === this.verification_code)
				return this.verified = true;
			return false;
		}.bind(this);
		
		this.add_history = function(title, state, photo, description, delta) {
			this.history = this.history.concat([{
				title: title,
				state: state,
				photo: photo,
				description: description,
				delta: delta
			}]);
		}.bind(this);
		
		this.inheritFrom = gems.Model;
		this.inheritFrom();
	};
	models.User.DEFAULT = 0;
	models.User.OPEN_ID = 1;
	models.User.BANKS = [
		{
			name: 'Bank of Montreal',
			number: '001'
		},
		{
			name: 'The Bank of Nova Scotia (Scotiabank)',
			number: '002'
		},
		{
			name: 'Royal Bank of Canada',
			number: '003'
		},
		{
			name: 'Toronto-Dominion Canada Trust',
			number: '004'
		},
		{
			name: 'National Bank',
			number: '006'
		},
		{
			name: 'Canadian Imperial Bank of Commerce',
			number: '010'
		},
		{
			name: 'HSBC',
			number: '016'
		},
		{
			name: 'Tangerine Bank',
			number: '614'
		},
		{
			name: 'Desjardins',
			number: '815'
		}
	];
})();