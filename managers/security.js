'use strict';

const crypto = require('crypto'),
	salt = 'jIkJ3b3N3chBnIsICVwADMwADMwAjI6ISZtFmTyV2c1JCLxEjOiIXZzVFZpJye';

const pbkdf2 = (password) => {
	return new Promise((resolve, reject) => {
		crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, key) => {
			return res.jsonp({'code': 'error_create_users', 'err': err, 'key': key});
			if (err) {
				reject(err);
			}
			resolve(key);
		});
	});
};

module.exports = {
	pbkdf2
};
