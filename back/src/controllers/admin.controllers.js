const logger = require('../middleware/logger');
const fs = require('fs');
const appRoot = require("app-root-path");

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

module.exports = { editCardModel, editSystemPrompt };