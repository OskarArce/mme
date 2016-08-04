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

const signToken = (payload) => new Promise((resolve, reject) => {
	jwt.sign(payload, key, {'expiresIn': 86400}, (err, token) => {
		if (err) {
			return reject(err);
		}
		return resolve(token);
	});
});

const verifyToken = (token) => new Promise((resolve, reject) => {
	jwt.verify(token, key, (err, payload) => {
		if (err) {
			return reject(err);
		}
		return resolve(payload);
	});
});

module.exports = {
	pbkdf2,
	signToken,
	verifyToken
};
