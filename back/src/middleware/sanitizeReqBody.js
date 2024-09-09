const perfectExpressSanitizer = require('perfect-express-sanitizer');

const logger = require('../middleware/logger');
const { badRequest } = require('../constants/statusCodes');

// Iterate over each key-value pair in the request body to ensure that it does not contain any malicious code, and sanitize it if necessary
module.exports = (req, res, next) => {
    const sanitizer_options = { xss: true, noSql: true, level: 5 };

    for (const [key, value] of Object.entries(req.body)) {
        let sanitized = perfectExpressSanitizer.sanitize.prepareSanitize(value, sanitizer_options);
        
        // If the sanitized value is different from the original value, log the flagged field and return a 400 status code
        if (value != sanitized) {
            logger.warn(`Flagged field: ${key} - Original: ${value} - Sanitized: ${sanitized}`)
            return res.status(badRequest).json({ message: "Invalid input" });
        }
        req.body[key] = sanitized;
    }
    next();
}
