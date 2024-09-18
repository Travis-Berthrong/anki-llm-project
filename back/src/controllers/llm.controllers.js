const logger = require('../middleware/logger');
const modelInstance = require('../llmModel');

const generateCard = async (prompt) => {
    try {
        const completion = await modelInstance.getCompletion(prompt);
        logger.info(`Response: ${completion.choices[0].message}`);
        const cardJSON = JSON.parse(completion.choices[0].message.content);
        return cardJSON;
    } catch (error) {
        logger.error(error.message);
        return null;
    }
}

module.exports = { generateCard };