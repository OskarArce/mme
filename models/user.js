'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		'username': {
			'type': String,
			'require': true
		},
		'password': {
			'type': String,
			'require': true
		},
		'role': {
			'type': String,
			'require': true,
			'enum': Object.keys(global.role).reduce(
				(roles, roleKey) => {
					roles.push(role[roleKey]);
					return roles;
				},
				[]
			),
			'default': global.role.STUDENT
		}
	},
	{
		'versionKey': false,
		'toObject': {
			'virtuals': false
		},
		'toJSON': {
			'virtuals': false
		}
	}
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
