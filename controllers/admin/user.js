'use strict';

const router = require('express').Router(),
	mongoMgr = require('../../managers/mongo'),
	dbDetails = mongoMgr.getDbDetails(),
	db = mongoMgr.getDb();

router.get('/', function (req, res) {
	if (!db) {
		mongoMgr.initDb(function(err, db){
			if(err) {
				res.status(500).jsonp({'code': err});
			}
			let col = db.collection('counts');

			col.count(function(err, count){
				res.status(200).jsonp({'data': {
					'dbInfo': dbDetails,
					'pageCountMessage': -1
				}});
			});
		});
	}
	else {
		let col = db.collection('counts');

		col.count(function(err, count){
			res.status(200).jsonp({'data': {
				'dbInfo': dbDetails,
				'pageCountMessage': -1
			}});
		});
	}
});

router.post('/', function (req, res) {
	if (!db) {
		db = mongoMgr.initDb(function(err){});
	}
	if (db) {
		let col = db.collection('counts');

		col.count(function(err, count){
			res.status(200).jsonp({'data': {
				'dbInfo': dbDetails,
				'pageCountMessage': -1
			}});
		});
	}
	else {
		res.status(500).jsonp({'code': 'error'});
	}
});

module.exports = router;
