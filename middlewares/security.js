'use strict';

const securityMgr = require('../managers/security'),
	usersMgr = require('../managers/users');

const verifyToken = (req, res, next) => {
	var token = req.headers['x-smart-token'];
	res.status(200).json({'wtf': token})
	securityMgr.verifyToken(token).then(
		(decoded) => {
			req.auth_token = decoded;
			return next();
		},
		(error) => res.status(401).json({'code': 'error_unauthorized_auth', 'desc': err})
	);
};

const verifyUser = (req, res, next) => {
	if (!req.auth_token && !req.body.username && !req.body.password) {
		res.status(400).jsonp({'code': 'wrong_username'});
	}
	let verifyUserPromise = req.auth_token ?
		usersMgr.getUser(req.auth_token._id) :
		usersMgr.findUser({'username': req.body.username, 'password': req.body.password});
	verifyUserPromise.then(
		(user) => {
			if (!user) {
				return res.status(400).json({'code': 'unauthorized'});
			}
			req.auth_user = user;
			return next();
		},
		(err) => res.status(401).json({'code': 'error_unauthorized_auth', 'desc': err})
	);
};

const verifyAdmin = (req, res, next) => {
	if (!req.auth_user || req.auth_user.role !== global.role.ADMIN) {
		return res.status(400).json({'code': 'unauthorized'});
	}
	return next();
};

module.exports = {
	verifyToken,
	verifyUser,
	verifyAdmin
};
