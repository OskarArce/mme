'use strict';

const router = require('express').Router(),
	users = require('../../managers/users');

router.get('/', (req, res) => {
	users.listAll().then(
		(users) => res.json({'data': users}),
		(err) => res.json({'code': 'error_listAll_users', 'desc': err})
	);
});

module.exports = router;
