
var router = require('express').Router();

// Login no required
router.use('/auth/access', require('./auth/access'));

// Login required (token)
router.use('/user', require('./user/user'));

/******************/
/* Administrators */
router.use('/admin/user', require('./admin/user'));
router.use('/admin/load', require('./admin/load'));
/* Administrators */
/******************/

module.exports = router;
