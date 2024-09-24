const logger = require('../middleware/logger');
const modelInstance = require('../LlmModel');

const generateCard = async (prompt) => {
    try {
        const completionJSON = await modelInstance.getCompletion(prompt);
        logger.info(`Response: ${completionJSON}`);
        const cardJSON = JSON.parse(completionJSON);
        return cardJSON;
    } catch (error) {
        logger.error(error.message);
        return null;
    }
}

module.exports = { generateCard };