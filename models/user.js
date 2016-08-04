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
			'enum': ['admin', 'student', 'teacher'],
			'default': 'student'
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
