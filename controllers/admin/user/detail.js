'use strict';

const router = require('express').Router({'mergeParams': true}),
	users = require('../../managers/users');

router.get('/', function (req, res) {
	users.getUser(req.params.user_id).then(
		(user) => {
			return res.jsonp({'data': user});
		},
		(err) => {
			return res.jsonp({'code': 'error_getUser_users', 'desc': err});
		}
	);
});

router.put('/', function (req, res) {
	users.update(req.params.user_id, req.body).then(
		(users) => {
			return res.jsonp({'data': users});
		},
		(err) => {
			return res.jsonp({'code': 'error_update_users', 'desc': err});
		}
	);
});

router.delete('/', function (req, res) {
	users.remove(req.params.user_id).then(
		(users) => {
			return res.jsonp({'data': users});
		},
		(err) => {
			return res.jsonp({'code': 'error_delete_users', 'desc': err});
		}
	);
});

module.exports = router;
