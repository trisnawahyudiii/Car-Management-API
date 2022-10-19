'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('userRoles', [
            {
                roleName: 'superAdmin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                roleName: 'Admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                roleName: 'Member',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('userRoles', null, {});
    },
};
