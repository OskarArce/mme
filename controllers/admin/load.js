'use strict';

const router = require('express').Router(),
	users = require('../../managers/users');

router.post('/', (req, res) => {
	users.load().then(
		(users) => {
			return res.json({'data': users});
		},
		(err) => {
			return res.json({'code': 'error_load_users', 'desc': err});
		}
	);
});

module.exports = router;
