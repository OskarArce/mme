
var router = require('express').Router();

// Login no required
router.use('/auth/access', require('./auth/access'));

// Login required (token)
router.use('/user', require('./user/user'));

/******************/
/* Administrators */
router.use('/admin/user', require('./admin/user/list'));
router.use('/admin/user/:user_id', require('./admin/user/detail'));
router.use('/admin/load', require('./admin/load'));
/* Administrators */
/******************/

module.exports = router;
