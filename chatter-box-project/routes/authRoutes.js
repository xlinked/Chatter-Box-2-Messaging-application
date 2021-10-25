const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/edit/:id', authController.edit_get);
router.post('/edit/:id', authController.edit_post);

router.get('/text/:id', authController.text_get);
router.post('/text/:id', authController.text_post);

router.get('/private/:id', authController.private_get);
router.get('/private', authController.dm_get);

router.get('/details/:id', authController.details_get);
router.delete('/delete/:id', authController.delete);
router.get('/logout', authController.logout_get);

module.exports = router;