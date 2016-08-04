'use strict';

const _find = require('lodash/find');

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
	role,
	required: {
		'role': role.bind({'isOptional': false}),
	},
	optional: {
		'role': role.bind({'isOptional': true}),
	}
};
