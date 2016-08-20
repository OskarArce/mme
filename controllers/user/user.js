'use strict';

const router = require('express').Router(),
	users = require('../../managers/users');

// TODO: return user (teacher/student/admin) data
router.get('/', (req, res) => res.json({'data': req.auth_user}));

module.exports = router;
