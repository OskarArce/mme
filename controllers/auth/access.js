'use strict';

const router = require('express').Router(),
	securityMgr = require('../../managers/users'),
	users = require('../../managers/users');

router.post('/', function (req, res) {
	users.findUser({'nick': req.body.nick, 'password': req.body.password}).then(
		(user) => res.json({'data': {'token': securityMgr.token(user)}}),
		(err) => res.json({'code': 'error_listAll_users', 'desc': err})
	);
});

module.exports = router;
