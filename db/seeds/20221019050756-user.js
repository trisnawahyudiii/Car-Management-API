'use strict';
const { encryptPassword } = require('../../app/services/userServices');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                userName: 'trisnawyd_',
                email: 'wayantrisna79@gmail.com',
                password: await encryptPassword('admin123'),
                role: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
