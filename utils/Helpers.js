const becrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const salt = await becrypt.genSalt(10);
    return await becrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
    return await becrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };