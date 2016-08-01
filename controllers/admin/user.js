'use strict';

const router = require('express').Router(),
	mongoMgr = require('../managers/mongo');

router.get('/', function (req, res) {
	if (!mongoMgr.db) {
		mongoMgrinitDb(function(err){});
	}
	if (mongoMgr.db) {
		let col = mongoMgr.db.collection('counts');

		col.count(function(err, count){
			res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
			res.status(200).jsonp({'data': {
				'pageCountMessage': count,
				'dbInfo': mongoMgr.dbDetails
			}});
		});
	}
	else {
		res.status(500).jsonp({'code': 'error'});
	}
});

router.post('/', function (req, res) {
	if (!mongoMgr.db) {
		mongoMgrinitDb(function(err){});
	}
	if (mongoMgr.db) {
		let col = mongoMgr.db.collection('counts');

		col.count(function(err, count){
			res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
			res.status(200).jsonp({'data': {
				'pageCountMessage': count,
				'dbInfo': mongoMgr.dbDetails
			}});
		});
	}
	else {
		res.status(500).jsonp({'code': 'error'});
	}
});

module.exports = router;
