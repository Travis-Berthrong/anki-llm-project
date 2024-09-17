const express = require('express');
const router = express.Router();

const statusCodes = require('../constants/statusCodes');
const { editCardModel } = require('../controllers/admin.controllers');
const logger = require('../middleware/logger');

router.put('/editCardModel', async (req, res) => {
    const { frontTemplate, backTemplate } = req.body;
    if (!frontTemplate || !backTemplate) {
        return res.status(statusCodes.badRequest).json({ message: 'Missing required fields' });
    }

    try {
        await editCardModel(frontTemplate, backTemplate);
        return res.status(statusCodes.success).json({ message: 'Card model updated' });
    } catch (error) {
        logger.error(error.message);
        return res.status(statusCodes.internalServerError).json({ message: 'Error updating card model' });
    }
});

module.exports = router;

