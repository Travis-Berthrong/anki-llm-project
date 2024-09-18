const logger = require('./logger');

module.exports = (req, res, next) => {
    if (req?.session?.loggedIn) {
        logger.info(`Session found for user ${req.session.username}`);
    } else {
        logger.error('No session found');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

