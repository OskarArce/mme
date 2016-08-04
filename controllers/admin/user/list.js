'use strict';

const router = require('express').Router(),
	users = require('../../../managers/users');

router.get('/', function (req, res) {
	users.listAll().then(
		(users) => res.json({'data': users}),
		(err) => res.json({'code': 'error_listAll_users', 'desc': err})
	);
});

router.post('/', function (req, res) {
	users.create(req.body).then(
		(user) => res.json({'data': user}),
		(err) => res.json({'code': 'error_create_users', 'desc': err})
	);
});

module.exports = router;
