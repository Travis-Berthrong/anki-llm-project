const express = require('express');

const invokeAnkiApi = require('../utils/invokeAnkiApi');
const logger = require('../middleware/logger');
const statusCodes = require('../constants/statusCodes');

const router = express.Router();

router.get('/decks', async (_req, res) => {
    try {
        const response = await invokeAnkiApi('deckNames', 6);
        return res.status(statusCodes.success).json(response.result);
    } catch (error) {
        logger.error(error.message);
        return res.status(statusCodes.internalServerError).json({ message: 'Error retrieving decks' });
    }
});

router.post('/decks', async (req, res) => {
    const { deckName } = req.body;
    if (!deckName) {
        return res.status(statusCodes.badRequest).json({ message: 'Missing required fields' });
    }
    try {
        const response = await invokeAnkiApi('createDeck', 6, {deck: deckName});
        return res.status(statusCodes.success).json({ message: 'Deck created', deckId: response.result });
    } catch (error) {
        logger.error(error.message);
        return res.status(statusCodes.internalServerError).json({ message: 'Error creating deck' });
    }
});

module.exports = router;