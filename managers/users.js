'use strict';

const securityMgr = require ('./security'),
	User = require ('../models/user');

const listAll = () => User.find({});

const getUser = (id) => User.findById(id);

const create = (data) => {
	return new Promise((resolve, reject) => {
		securityMgr.pbkdf2(data.password)
			.then(
				(password) => {
					(new User(Object.assign(data, {'password': password})))
						.save()
						.then(resolve, reject);
				},
				reject
			);
	});
};

const update = (id, data) => {
	return new Promise((resolve, reject) => {
		securityMgr.pbkdf2(data.password)
			.then(
				(password) => {
					User.findByIdAndUpdate(
						id,
						{'$set': Object.assign(data, {'password': password})}
					).then(resolve, reject);
				},
				reject
			);
	});
};

const remove = (id) => User.findByIdAndRemove(id);

const load = () => {
	return User.create([
		{
			'nick': 'oskar.arce',
			'password': 'qwerty',
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
