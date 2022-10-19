const userRepository = require('../repositories/userRepository');
const { checkPassword, encryptPassword, createToken, verifyToken } = require('../utils/authorization');

module.exports = {
    async registerMember(registerArgs) {
        try {
            const encryptedPassword = await encryptPassword(registerArgs.password);
            const body = {
                userName: registerArgs.userName,
                email: registerArgs.email,
                password: encryptPassword,
                role: 3,
            };

            return userRepository.create(body);
        } catch (err) {
            throw err;
        }
    },

    async login(email, password) {
        try {
            const user = await userRepository.findUser(email);
            if (!user) {
                return false;
            }

            const { password: encryptedPassword } = user;
            const isAuthenticated = await checkPassword(password, encryptPassword);

            if (!isAuthenticated) {
                return false;
            }

            const token = createToken({
                id: user.id,
                email: user.email,
            });

            user.dataValues.token = token;

            return user;
        } catch (err) {
            throw err;
        }
    },
};
