'use strict';

const User = require ('../models/user');

const listAll = (cb) => {
	return User.find({}, cb);
};

const getUser = (id, cb) => {
	return User.findById(id, cb);
};

const create = (data, cb) => {
	let user = new User(data);
	return user.save(cb);
};

const update = (id, data, cb) => {
	return User.findByIdAndUpdate(id, {'$set': data}, cb);
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
