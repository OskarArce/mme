'use strict';

const securityMgr = require ('./security'),
	User = require ('../models/user');

const listAll = () => User.find({});

const getUser = (id) => User.findById(id);

const findUser = (data) => {
	return new Promise((resolve, reject) => {
		let passPromise = new Promise((resolvePass, rejectPass) => {
			if (!data.password) {
				resolvePass();
			}
			else {
				securityMgr.pbkdf2(data.password).then(resolvePass, rejectPass);
			}
		});
		passPromise.then(
			(password) => {
				data.password = password;
				User.findOne(data, (err, user) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				});
			},
			reject
		);
	});
};

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
	findUser,
	create,
	update,
	remove,
	load
};
