const express = require('express');
const router = express.Router();

const statusCodes = require('../constants/statusCodes');
const { editCardModel, editSystemPrompt } = require('../controllers/admin.controllers');
const logger = require('../middleware/logger');

router.patch('/editCardModel', async (req, res) => {
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

router.put('/editSystemPrompt', async (req, res) => {
    const { newPrompt } = req.body;
    if (!newPrompt) {
        return res.status(statusCodes.badRequest).json({ message: 'Missing required fields' });
    }
    if (typeof newPrompt !== 'string') {
        return res.status(statusCodes.badRequest).json({ message: 'Invalid prompt format' });
    }
    try {
        await editSystemPrompt(newPrompt);
        return res.status(statusCodes.success).json({ message: 'System prompt updated' });
    } catch (error) {
        logger.error(error.message);
        return res.status(statusCodes.internalServerError).json({ message: 'Error updating system prompt' });
    }
});

module.exports = router;

