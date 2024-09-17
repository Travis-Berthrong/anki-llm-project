const logger = require('../middleware/logger');
const fs = require('fs');
const appRoot = require("app-root-path");

const editCardModel = async (frontTemplate, backTemplate) => {
    try {
        const cardModel = await fs.promises.readFile(`${appRoot}/src/config/cardModel.json`, 'utf8');
        const parsedModel = JSON.parse(cardModel);
        parsedModel.cardTemplates[0].Front = frontTemplate;
        parsedModel.cardTemplates[0].Back = backTemplate;
        await fs.promises.writeFile(`${appRoot}/src/config/cardModel.json`, data=JSON.stringify(parsedModel));
        logger.info('Card model updated');
        return true;
    } catch (error) {
        logger.error(error.message);
        return false;
    }
}

module.exports = { editCardModel };