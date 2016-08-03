'use strict';

const router = require('express').Router(),
	users = require('../managers/users');

router.get('/', function (req, res) {
	users.listAll().then(
		(users) => {
			return res.jsonp({'data': users});
		},
		(err) => {
			return res.jsonp({'code': 'error_listAll_users', 'desc': err});
		}
	);
});

module.exports = router;
