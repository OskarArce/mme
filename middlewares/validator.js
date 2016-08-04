'use strict';

const _find = require('lodash/find');

const username = (req, res, next) => {
	var usernameP = req.query.username ||
		req.params.username ||
		req.body.username;

	if (!usernameP) {
		if (!this.isOptional) {
			return res.status(400).json({'code': 'wrong_username'});
		}
		return next();
	}
	if (usernameP.length < 3) {
		return res.status(400).json({'code': 'wrong_username'});
	}
	return next();
};

const password = (req, res, next) => {
	var passwordP = req.query.password ||
		req.params.password ||
		req.body.password;

	if (!passwordP) {
		if (!this.isOptional) {
			return res.status(400).json({'code': 'wrong_password'});
		}
		return next();
	}
	if (passwordP.length < 4) {
		return res.status(400).json({'code': 'wrong_password'});
	}
	return next();
};

const role = (req, res, next) => {
	var roleP = req.query.role ||
		req.params.role ||
		req.body.role;

	if (!roleP) {
		if (!this.isOptional) {
			return res.status(400).jsonp({'code': 'wrong_role'});
		}
		return next();
	}
	if (!_find(global.role, (o) => o === roleP)) {
		return res.status(400).jsonp({'code': 'wrong_role'});
	}
	return next();
};

module.exports = {
	username,
	password,
	role,
	required: {
		'username': role.bind({'isOptional': false}),
		'password': role.bind({'isOptional': false}),
		'role': role.bind({'isOptional': false}),
	},
	optional: {
		'username': role.bind({'isOptional': true}),
		'password': role.bind({'isOptional': true}),
		'role': role.bind({'isOptional': true}),
	}
};
