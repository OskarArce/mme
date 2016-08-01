//  OpenShift sample Node application
const express = require('express'),
	app     = express(),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	morgan  = require('morgan'),
	mongoMgr = require('/managers/mongo');

Object.assign = require('object-assign');

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));

app.disable('x-powered-by');

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
	ip   	= process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(cors());
app.use(bodyParser.urlencoded({'extended': false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.render('index.html', { pageCountMessage : null});
});
app.use(require('/controllers/router'));

// error handling
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500).send('Something bad happened!');
});

mongoMgr.initDb(function(err){
	console.log('Error connecting to Mongo. Message:\n'+err);
});

app.listen(port, ip);

console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
