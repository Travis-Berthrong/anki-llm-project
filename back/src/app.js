const express = require('express');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const verifyAnkiModel = require('./boot/verifyAnkiModel');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const sanitizeReqBody = require('./middleware/sanitizeReqBody');

const authRoutes = require('./routes/auth.routes');
const ankiRoutes = require('./routes/anki.routes');

dotenv.config();
const app = express();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/anki-llm';
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  }).then(
    // On successful connection, display message & mount error listener
    () => {
        logger.info(`Connected to Mongodb at ${MONGO_URI}`);
        mongoose.connection.on('error', function (err) {
            logger.error(`Mongodb error: ${err}`);
        });
     },
    err => { logger.error(`Mongodb connection error: ${err}`); }
);

try {
    // Middleware
    app.use(cors()); // Enable CORS
    app.use(helmet.contentSecurityPolicy({ // Content Security Policy to prevent XSS attacks
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
        }
    }));  
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    }));
    app.use(express.json());
    app.use(morgan('combined', { stream: logger.stream })); // Log HTTP requests
    app.use(session({
        secret: SESSION_SECRET,
        name: 'sessionId',
        resave: false,
        saveUninitialized: false,
        cookie: 
        { secure: false,
            httpOnly: true,
        },
    }));
    app.use(sanitizeReqBody);

    // Routes
    app.use('/auth', authRoutes);
    app.use('/anki', ankiRoutes);
    app.use(notFound);

    logger.info('Middleware registered');

    verifyAnkiModel();

} catch (error) {
    logger.error(`Error occured on startup: ${error}`);
    process.exit(1);
}

module.exports = app;



