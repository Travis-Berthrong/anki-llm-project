const logger = require('../middleware/logger');
const fs = require('fs');
const appRoot = require("app-root-path");

const getCardModelHTML = async () => {
    try {
        const cardModel = await fs.promises.readFile(`${appRoot}/src/config/cardModel.json`, 'utf8');
        const parsedModel = JSON.parse(cardModel);
        const frontTemplate = parsedModel.cardTemplates[0].Front;
        const backTemplate = parsedModel.cardTemplates[0].Back;
        return { frontTemplate, backTemplate };
    } catch (error) {
        logger.error(error.message);
        return false;
    }
}

const editCardModel = async (frontTemplate, backTemplate) => {
    try {
        const cardModel = await fs.promises.readFile(`${appRoot}/src/config/cardModel.json`, 'utf8');
        const parsedModel = JSON.parse(cardModel);
        parsedModel.cardTemplates[0].Front = frontTemplate;
        parsedModel.cardTemplates[0].Back = backTemplate;
        const data = JSON.stringify(parsedModel);
        await fs.promises.writeFile(`${appRoot}/src/config/cardModel.json`, data);
        logger.info('Card model updated');
        return true;
    } catch (error) {
        logger.error(error.message);
        return false;
    }
}

const getSystemPrompt = async () => {
    try {
        const systemPrompt = await fs.promises.readFile(`${appRoot}/src/config/systemPrompt.txt`, 'utf8');
        return systemPrompt;
    } catch (error) {
        logger.error(error.message);
        return null;
    }
}

const editSystemPrompt = async (newPrompt) => {
    try {
        if (newPrompt.slice(0,11) !== '### System:') {
            newPrompt = '### System:\n' + newPrompt;
        }
        logger.info(`Updating system prompt to: ${newPrompt}`);
        await fs.promises.writeFile(`${appRoot}/src/config/systemPrompt.txt`, newPrompt);
        logger.info('System prompt updated');
        return true;
    } catch (error) {
        logger.error(error.message);
        return false;
    }
}

module.exports = { getCardModelHTML, editCardModel, getSystemPrompt, editSystemPrompt };