require('dotenv').config();
const appRoot = require("app-root-path");
const fs = require('fs');
const logger = require('../middleware/logger');

const invokeAnkiApi = require('../utils/invokeAnkiApi');


const addAnkiModel = async (cardModel) => {
    try {
        await invokeAnkiApi('createModel', 6, cardModel);
        logger.info('Anki model added successfully');
    } catch (error) {
        logger.error(`addAnkiModel error: ${error}`);
        return;
    }
}

const verifyAnkiModel = async (cardModel) => {
    try {
        const response = await invokeAnkiApi('modelNames', 6);
        if (!response.result.includes('LLM Model')) {
            logger.info('LLM Model not found, adding model');
            addAnkiModel(cardModel);
        } else {
            logger.info('Card model verified successfully');
        }
    } catch (error) {
        logger.error(`verifyAnkiModel error: ${error}`);
        return;
    }
}

module.exports = async () => {
    try {
        const modelConfig = JSON.parse(fs.readFileSync(`${appRoot}/src/config/cardModel.json`, 'utf8'));
        if (modelConfig) {
            await verifyAnkiModel(modelConfig);
        } else {
            logger.error('Card model not found');
        }
    } catch (error) {
        logger.error(error);
        return;
    }
}
