const express = require('express');
const router = express.Router();

const statusCodes = require('../constants/statusCodes');
const { getCardModelHTML, editCardModel, getSystemPrompt, editSystemPrompt } = require('../controllers/admin.controllers');
const logger = require('../middleware/logger');

router.get('/getCardModelHTML', async (_req, res) => {
    try {
        const cardModel = await getCardModelHTML();
        if (!cardModel) {
            return res.status(statusCodes.internalServerError).json({ message: 'Error getting card model' });
        }
        return res.status(statusCodes.success).json(cardModel);
    } catch (error) {
        logger.error(error.message);
        return res.status(statusCodes.internalServerError).json({ message: 'Error getting card model' });
    }
});

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

router.get('/getSystemPrompt', async (_req, res) => {
    try {
        const systemPrompt = await getSystemPrompt();
        if (!systemPrompt) {
            return res.status(statusCodes.internalServerError).json({ message: 'Error getting system prompt' });
        }
        return res.status(statusCodes.success).json({ systemPrompt });
    } catch (error) {
        logger.error(error.message);
        return res.status(statusCodes.internalServerError).json({ message: 'Error getting system prompt' });
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

