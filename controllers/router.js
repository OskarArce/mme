
const router = require('express').Router(),
	mw = {
		'security': require('../middlewares/security')
	};

// Login no required
router.use('/auth/access', mw.security.verifyUser, require('./auth/access'));

// Login required (token)
router.use(mw.security.verifyToken);
router.use(mw.security.verifyUser);
router.use('/user', require('./user/user'));

/******************/
/* Administrators */
router.use(mw.security.verifyAdmin);
router.use('/admin/user', require('./admin/user/list'));
router.use('/admin/user/:user_id', require('./admin/user/detail'));
router.use('/admin/load', require('./admin/load'));
/* Administrators */
/******************/

module.exports = router;
