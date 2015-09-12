['../lib/gems.js', '../utils/Date.js'];

(function() {
	var serial = 0;
	
	function get_arbitrary_date(now) {
		var day = now.getDate() < 15 ? 15 : utils.Date.total_days(now);
		
		now.setDate(day);
		now.setDate(utils.Date.last_business_day(now));
		return now;
	};
	
	namespace('models').User = function User(_type) {
		this.id = serial++;
		this.type = _type;
		this.username = '';
		this.password = '';
		
		this.verification_code = 1234;
		
		this.verified = false;
		this.has_employer = false;
		this.has_bank = false;
		
		this.complete = false;
		this.tier = 0;
		
		this.contact = new gems.Model({
			name: '',
			email: '',
			avatar: '/assets/images/avatars/lafleur.jpg',
			phone: '',
			address: {
				street: '',
				unit: '',
				city: '',
				province: '',
				postal: ''
			}
		});
		
		this.employer = new gems.Model({
			name: '',
			phone: '',
			address: {
				street: '',
				unit: null,
				city: '',
				province: '',
				postal: ''
			},
			next_cheque: get_arbitrary_date(new Date()).toLocaleDateString()
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
			this.contact.street = street;
			this.contact.unit = unit || null;
			this.contact.city = city;
			this.contact.province = province;
			this.contact.postal = postal;
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
		
		this.set_employer = function(name, phone, street, unit, city, province, postal) {
			this.employer.name = name;
			this.employer.phone = phone;
			this.employer.address.street = street;
			this.employer.address.unit = unit;
			this.employer.address.city = city;
			this.employer.address.province = province;
			this.employer.address.postal = postal;
		};
		
		this.verify = function(code) {
			if (code === this.verification_code)
				return this.verified = true;
			return false;
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