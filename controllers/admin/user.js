'use strict';

const router = require('express').Router(),
	mongoMgr = require('../../managers/mongo');

router.get('/', function (req, res) {
	if (!mongoMgr.db) {
		mongoMgr.initDb(function(err){});
	}
	if (mongoMgr.db) {
		let col = mongoMgr.db.collection('counts');

		col.count(function(err, count){
			res.status(200).jsonp({'data': {
				'dbInfo': mongoMgr.dbDetails,
				'pageCount': -1
			}});
		});
	}
	else {
		res.status(500).jsonp({'code': 'error'});
	}
});

router.post('/', function (req, res) {
	if (!mongoMgr.db) {
		mongoMgr.initDb(function(err){});
	}
	if (mongoMgr.db) {
		let col = mongoMgr.db.collection('counts');

		col.count(function(err, count){
			res.status(200).jsonp({'data': {
				'dbInfo': mongoMgr.dbDetails,
				'pageCount': -1
			}});
		});
	}
	else {
		res.status(500).jsonp({'code': 'error'});
	}
});

module.exports = router;
