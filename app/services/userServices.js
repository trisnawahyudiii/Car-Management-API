const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SIGNATURE_KEY = 'GabolehTauPokoknya';
const salt = 10;

async function encryptPassword(password) {
    try {
        const encryptedPassword = await bcrypt.hash(password, salt);
        return encryptedPassword;
    } catch (error) {
        console.log(error);
    }
}

async function comparePassword(password, encryptedPassword) {
    try {
        const isValid = await bcrypt.compare(password, encryptedPassword);
        return isValid;
    } catch (error) {
        console.log(error);
    }
}

function createToken(payload) {
    return jwt.sign(payload, JWT_SIGNATURE_KEY, {
        expiresIn: '1h',
    });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SIGNATURE_KEY);
}

module.exports = {
    encryptPassword,
    verifyToken,

    async registerMember(registerArgs) {
        try {
            const encryptedPassword = await encryptPassword(registerArgs.password);
            const body = {
                userName: registerArgs.userName,
                email: registerArgs.email,
                password: encryptedPassword,
                role: 3,
            };

            return userRepository.create(body);
        } catch (err) {
            throw err;
        }
    },

    async registerAdmin(registerArgs) {
        try {
            const encryptedPassword = await encryptPassword(registerArgs.password);
            const body = {
                userName: registerArgs.userName,
                email: registerArgs.email,
                password: encryptedPassword,
                role: 2,
            };

            return userRepository.create(body);
        } catch (err) {
            throw err;
        }
    },

    async login(email, password) {
        try {
            const data = await userRepository.findUser(email);
            if (!data) {
                return false;
            }

            const encryptedPassword = data.dataValues.password;

            const isAuthenticated = await comparePassword(password, encryptedPassword);
            if (!isAuthenticated) {
                return false;
            }

            // generate JWT
            const token = createToken({
                id: data.id,
                email: data.email,
                role: data.role,
            });

            console.log(data);
            // extract only username, email, role, rolename
            const user = {
                userName: data.dataValues.userName,
                email: data.dataValues.email,
                role: data.dataValues.role,
                token: token,
            };

            return user;
        } catch (err) {
            throw err;
        }
    },
};
