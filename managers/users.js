'use strict';

const securityMgr = require ('./security'),
	User = require ('../models/user');

const listAll = (cb) => {
	return User.find({}, cb);
};

const getUser = (id, cb) => {
	return User.findById(id, cb);
};

const create = (data, cb) => {
	securityMgr.pbkdf2(data.password).then(
		(key) => {
			data.password = key.toString('hex');
			let user = new User(data);
			return user.save(cb);
		},
		(err) => {
			throw err;
		}
	);
};

const update = (id, data, cb) => {
	securityMgr.pbkdf2(data.password).then(
		(key) => {
			data.password = key.toString('hex');
			return User.findByIdAndUpdate(id, {'$set': data}, cb);
		},
		(err) => {
			throw err;
		}
	);
};

const remove = (id, cb) => {
	return User.findByIdAndRemove(id, cb);
};

const load = () => {
	return User.create([
		{
			'nick': 'oskar.arce',
			'password': 'qwert',
			'role': 'admin',
		}
	]);
};

module.exports = {
	listAll,
	getUser,
	create,
	update,
	remove,
	load
};
