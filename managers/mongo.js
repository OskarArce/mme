'use strict';

let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
	mongoURLLabel = '',
	mongoose = require('mongoose');

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
	let mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
		mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
		mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
		mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
		mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
		mongoUser = process.env[mongoServiceName + '_USER'];

	if (mongoHost && mongoPort && mongoDatabase) {
		mongoURLLabel = mongoURL = 'mongodb://';
		if (mongoUser && mongoPassword) {
			mongoURL += mongoUser + ':' + mongoPassword + '@';
		}
		// Provide UI label that excludes user id and pw
		mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
		mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
	}
}

function initDb(callback) {
	if (mongoURL == null) return;

	let mongodb = require('mongodb');
	if (mongodb == null) return;

	mongoose.connect(mongoURL, function(err) {
		callback(err);
		console.log('Connected to MongoDB at: %s', mongoURL);
		return;
	});
}

module.exports = {
	initDb
};
