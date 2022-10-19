const { Users, userRoles } = require('../models');

module.exports = {
    create(registerArgs) {
        return Users.create(creaArgs);
    },

    findUser(email) {
        return User.findOne({ where: { email: email } });
    },

    find(id) {
        return Users.findByPk(id, {
            include: [{ model: userRoles, as: 'role' }],
        });
    },

    findAll() {
        return Users.findAll({
            include: [{ model: userRoles, as: 'role' }],
        });
    },

    update(id, updateArgs) {
        return Users.update(updateArgs, {
            where: {
                id: id,
            },
        });
    },

    delete(id) {
        return Users.destroy(id);
    },

    getTotalUsers() {
        return Users.count();
    },
};
