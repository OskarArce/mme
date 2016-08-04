'use strict';

const crypto = require('crypto'),
	jwt = require('jsonwebtoken'),
	salt = 'jIkJ3b3N3chBnIsICVwADMwADMwAjI6ISZtFmTyV2c1JCLxEjOiIXZzVFZpJye-pbkdf2',
	key = 'jIkJ3b3N3chBnIsICVwADMwADMwAjI6ISZtFmTyV2c1JCLxEjOiIXZzVFZpJye-jwt';

const pbkdf2 = (password) => new Promise((resolve, reject) => {
	crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, key) => {
		if (err) {
			reject(err);
		}
		resolve(key.toString('hex'));
	});
});

const token = (payload) => new Promise((resolve, reject) => {
	jwt.sign(payload, key, {'expiresIn': 86400}, (err, token) => {
		if (err) {
			reject(err);
		}
		resolve(token);
	});
});

module.exports = {
	pbkdf2,
	token
};
