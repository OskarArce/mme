'use strict';

const router = require('express').Router(),
	securityMgr = require('../../managers/security'),
	users = require('../../managers/users');

router.post('/', function (req, res) {
	securityMgr.token(req.body).then(
		(token) => res.json({'data': {'token': token}}),
		(err) => res.json({'code': 'error_token_auth', 'desc': err})
	);
	// users.findUser({'nick': req.body.nick, 'password': req.body.password}).then(
	// 	(user) => {
	// 		if (!user) {
	// 			res.status(404).json({'code': 'error_unauthorized_auth'});
	// 		}
	// 		else {
	// 			securityMgr.token(payload).then(
	// 				(token) => res.json({'data': {'token': token}}),
	// 				(err) => res.json({'code': 'error_token_auth', 'desc': err})
	// 			);
	// 		}
	// 	},
	// 	(err) => res.json({'code': 'error_find_auth', 'desc': err})
	// );
});

module.exports = router;
