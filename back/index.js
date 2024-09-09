require('dotenv').config();

const app = require('./src/app');
const logger = require('./src/middleware/logger');

const PORT = process.env.PORT || 8080;

const handleError = () => {
    process.on("uncaughtException", (err) => {
        logger.error(`UNCAUGHT_EXCEPTION OCCURED : ${JSON.stringify(err.stack)}`);
    })
}

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            logger.info(`Server running at http://localhost:${PORT}`);
        });
        handleError();
    } catch (error) {
        logger.error(`Error starting server: ${error}`);
        process.exit(1);
    }
}

startServer();