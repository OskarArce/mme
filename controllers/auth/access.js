'use strict';

const router = require('express').Router(),
	securityMgr = require('../../managers/security');

router.post('/', (req, res) => {
	let payload = req.auth_user.toObject({'getters': false, 'virtuals': false});
	securityMgr.signToken(payload).then(
		(token) => res.json({'data': {'token': token}}),
		(err) => res.json({'code': 'error_token_auth', 'desc': err})
	);
});

module.exports = router;
