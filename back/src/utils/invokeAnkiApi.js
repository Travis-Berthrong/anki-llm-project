require('dotenv').config();
const logger = require('../middleware/logger');

const url = `http://localhost:${process.env.ANKI_PORT || 8765}`;

async function invoke(action, version, params = {}) {
    let response;
    try {
        logger.debug(`Anki request: ${url} ${action} ${version} ${JSON.stringify(params)}`);
        response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({action, version, params})
        });
    } catch (e) {
        logger.error(`Anki connection failure: ${e}`);
        const error = new Error('Anki connection failure');
        error.data = {action, params, originalError: e};
        throw error;
    }

    if (!response.ok) {
        logger.error(`Anki connection error: ${response.status}`);
        const error = new Error(`Anki connection error: ${response.status}`);
        error.data = {action, params, status: response.status};
        throw error;
    }

    let responseText = null;
    let result;
    try {
        responseText = await response.text();
        result = JSON.parse(responseText);
    } catch (e) {
        logger.error(`Invalid Anki response: ${responseText}`);
        const error = new Error('Invalid Anki response');
        error.data = {action, params, status: response.status, responseText, originalError: e};
        throw error;
    }

    if (result?.error) {
        const apiError = result.error;
        if (typeof apiError !== 'undefined') {
            logger.error(`Anki error: ${apiError}`);
            const error = new Error(`Anki error: ${apiError}`);
            error.data = {action, params, status: response.status, apiError};
            throw error;
        }
    }
    return result;
}

module.exports = invoke;