const logger = require('./logger');

module.exports = (req, res, next) => {
    if (req?.session?.isAdmin) {
        logger.info(`Session found for admin ${req.session.username}`);
    } else {
        logger.error('No admin session found');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}