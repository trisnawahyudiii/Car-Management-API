'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userRoles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.userRoles.hasMany(models.Users, {
                foreignKey: 'role',
                as: 'UserRole',
            });
        }
    }
    userRoles.init(
        {
            roleName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'userRoles',
        }
    );
    return userRoles;
};
