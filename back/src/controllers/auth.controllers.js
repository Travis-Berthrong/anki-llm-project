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
        return user;
};

const verifyUser = async (email, password) => {
        const user = await User.findOne({ email });
        if (!user) {
            logger.debug("User not found");
            return null;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            logger.debug("Invalid password");
            return null;
        }
        return user;
};

module.exports = { registerUser, verifyUser };