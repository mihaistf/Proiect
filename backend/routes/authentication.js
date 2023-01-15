const { Router } = require('express');
const { 
    register,
    login,
    forgotPassword,
    // changeEmail,
    // changePassword,
    // logout,
    // confirmChangeEmail,
    // confirmChangePassword
} = require('../controllers/authentication');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

module.exports = router;