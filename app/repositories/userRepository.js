const { Users, userRoles } = require('../models');

module.exports = {
    create(registerArgs) {
        return Users.create(registerArgs);
    },

    findUser(email) {
        return Users.findOne({ where: { email: email } });
    },

    find(id) {
        return Users.findByPk(id, {
            include: [{ model: userRoles, as: 'UserRole' }],
        });
    },

    findAll() {
        return Users.findAll({
            include: [{ model: userRoles, as: 'UserRole' }],
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
