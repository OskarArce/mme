
var router = require('express').Router();

// Login no required
router.use('/auth/access', require('./auth/access'));

// Login required (token)
router.use('/user', require('./user/user'));

/******************/
/* Administrators */
router.use('/admin/user', require('./admin/user'));
router.use('/admin/user', require('./admin/user'));
/* Administrators */
/******************/

module.exports = router;
