'use strict';

const router = require('express').Router(),
	securityMgr = require('../../managers/users'),
	users = require('../../managers/users');

router.post('/', function (req, res) {
	users.findUser({'nick': req.body.nick, 'password': req.body.password}).then(
		(user) => {
			if (user) {
				securityMgr.token(user).then(
					(token) => res.json({'data': {'token': token}}),
					(err) => res.json({'code': 'error_token_auth', 'desc': err})
				);
			}
			else {
				res.status(404).json({'code': 'error_unauthorized_auth', 'desc': req.body});
			}
		},
		(err) => res.json({'code': 'error_find_auth', 'desc': err})
	);
});

module.exports = router;
