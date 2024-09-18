const express = require('express');
const router = express.Router();

const statusCodes = require('../constants/statusCodes');

const { generateCard } = require('../controllers/llm.controllers');
const logger = require('../middleware/logger');

router.post('/generateCard', async (req, res) => {
    let { level, prompt } = req.body;
    if (!prompt || ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(level) === -1) {
        return res.status(statusCodes.badRequest).json({ message: 'Invalid request' });
    }
    try {
        prompt = `vocab level: ${level}\nprompt: ${prompt}`;
        logger.info(`Generating card for prompt: ${prompt}`);
        const card = await generateCard(prompt);
        if (!card) {
            return res.status(statusCodes.internalServerError).json({ message: 'Error generating card' });
        }
        return res.status(statusCodes.success).json(card);
    } catch (error) {
        logger.error(error.message);
        return res.status(statusCodes.internalServerError).json({ message: 'Error generating card' });
    }
});

module.exports = router;