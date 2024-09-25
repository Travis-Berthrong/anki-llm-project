const perfectExpressSanitizer = require('perfect-express-sanitizer');

const logger = require('../middleware/logger');
const { badRequest } = require('../constants/statusCodes');

// Iterate over each key-value pair in the request body to ensure that it does not contain any malicious code, and sanitize it if necessary
const sanitizeObject = (obj, key, sanitizer_options, res) => {
    logger.info(`Sanitizing object: ${key}`);
    for (const [nestedKey, nestedValue] of Object.entries(obj)) {
        let nestedSanitized = perfectExpressSanitizer.sanitize.prepareSanitize(nestedValue, sanitizer_options);
        if (nestedValue != nestedSanitized) {
            logger.warn(`Flagged field: ${key}.${nestedKey} - Original: ${nestedValue} - Sanitized: ${nestedSanitized}`);
            return res.status(badRequest).json({ message: "Invalid input" });
        }
        obj[nestedKey] = nestedSanitized;
    }
    return obj;
};

module.exports = (req, res, next) => {
    const sanitizer_options = { xss: true, noSql: true, level: 5 };

    for (const [key, value] of Object.entries(req.body)) {
        if (typeof value === 'object') {
            req.body[key] = sanitizeObject(value, key, sanitizer_options, res);
        } else if (key === 'frontTemplate' || key === 'backTemplate') { // Skip over fields that are intended to contain html tags
            continue;
        } else {
            let sanitized = perfectExpressSanitizer.sanitize.prepareSanitize(value, sanitizer_options);
            if (value != sanitized) {
                logger.warn(`Flagged field: ${key} - Original: ${value} - Sanitized: ${sanitized}`);
                return res.status(badRequest).json({ message: "Invalid input" });
            }
            req.body[key] = sanitized;
        }
    }
    next();
};
