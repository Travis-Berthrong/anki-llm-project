const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const logger = require('../middleware/logger');


const registerUser = async (email, username, password, createAdmin) => {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return null;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, username, password: hashedPassword, isAdmin: createAdmin });
        await user.save();
        logger.info(`User registered successfully`);
        return user;
};


module.exports = { registerUser };