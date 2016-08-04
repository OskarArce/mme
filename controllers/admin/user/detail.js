'use strict';

const router = require('express').Router({'mergeParams': true}),
	users = require('../../../managers/users');

router.get('/', function (req, res) {
	users.getUser(req.params.user_id).then(
		(user) => res.json({'data': user}),
		(err) => res.json({'code': 'error_get_users', 'desc': err})
	);
});

router.put('/', function (req, res) {
	users.update(req.params.user_id, req.body).then(
		() => {
			users.getUser(req.params.user_id).then(
				(user) => res.json({'data': user}),
				(err) => res.json({'code': 'error_get_users', 'desc': err})
			);
		},
		(err) => res.json({'code': 'error_update_users', 'desc': err})
	);
});

router.delete('/', function (req, res) {
	users.remove(req.params.user_id).then(
		() => res.status(204).send(),
		(err) => res.json({'code': 'error_delete_users', 'desc': err})
	);
});

module.exports = router;
