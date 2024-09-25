const express = require('express');
const router = express.Router();

const statusCodes = require('../constants/statusCodes');
const { registerUser, verifyUser } = require('../controllers/auth.controllers');
const logger = require('../middleware/logger');
const isAdmin = require('../middleware/isAdmin');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validatePassword = (password) => {
    // Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long (Regex from Perplexity)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?/\\-]).{8,}$/;
    return passwordRegex.test(password);
};

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const createAdmin = (req.body.createAdmin === true && req.session.isAdmin === true); // Only admins can create other admins

    if (!email || !username || !password) {
        return res.status(statusCodes.badRequest).json({ message: 'Missing required fields' });
    }
    if (!emailRegex.test(email)) {
        return res.status(statusCodes.badRequest).json({ message: 'Invalid email' });
    }
    if (!validatePassword(password)) {
        return res.status(statusCodes.badRequest).json({ message: 'Invalid password' });
    }
    try{
        const user = await registerUser(email, username, password, createAdmin);
        if (!user) {
            return res.status(statusCodes.conflict).json({ message: 'User already exists' });
        }
        return res.status(statusCodes.success).json(user);
    } catch (error) {
        logger.error(error.message);
        return res.status(statusCodes.internalServerError).json({ message: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(statusCodes.badRequest).json({ message: 'Missing required fields' });
    }
    try {
        const user = await verifyUser(email, password);
        if (!user) {
            return res.status(statusCodes.badRequest).json({ message: 'Invalid email or password' });
        }
        req.session.loggedIn = true;
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.isAdmin = user.isAdmin;
        return res.status(statusCodes.success).json({ isAdmin: user.isAdmin });
    } catch (error) {
        logger.error(error.message);
        return res.status(statusCodes.internalServerError).json({ message: 'Error logging in' });
    }
});

router.get('/session', (req, res) => {
    if (req.session.loggedIn) {
        return res.status(statusCodes.success).json({ isAdmin: req.session.isAdmin });
    }
    return res.status(statusCodes.unauthorized).json({ message: 'Not logged in' });
});


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(statusCodes.internalServerError).json({ message: 'Error logging out' });
        }
        return res.status(statusCodes.success).json({ message: 'Logged out' });
    });
});

module.exports = router;
