'use strict';

const router = require('express').Router(),
	users = require('../../managers/users');

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

router.post('/', function (req, res) {
	users.create(req.body).then(
		(user) => {
			return res.jsonp({'data': user});
		},
		(err) => {
			return res.jsonp({'code': 'error_listAll_users', 'desc': err});
		}
	);
});

router.put(':user_id/', function (req, res) {
	users.update(req.params.user_id, req.body).then(
		(users) => {
			return res.jsonp({'data': users});
		},
		(err) => {
			return res.jsonp({'code': 'error_listAll_users', 'desc': err});
		}
	);
});

router.delete(':user_id/', function (req, res) {
	users.remove(req.params.user_id).then(
		(users) => {
			return res.jsonp({'data': users});
		},
		(err) => {
			return res.jsonp({'code': 'error_listAll_users', 'desc': err});
		}
	);
});

// router.post('/', function (req, res) {
// 	if (!db) {
// 		db = mongoMgr.initDb(function(err){});
// 	}
// 	if (db) {
// 		let col = db.collection('counts');
//
// 		col.count(function(err, count){
// 			res.status(200).jsonp({'data': {
// 				'dbInfo': dbDetails,
// 				'pageCountMessage': -1
// 			}});
// 		});
// 	}
// 	else {
// 		res.status(500).jsonp({'code': 'error'});
// 	}
// });

module.exports = router;
