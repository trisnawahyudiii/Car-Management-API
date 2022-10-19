'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Users.belongsTo(models.userRoles, {
                foreignKey: 'role',
                as: 'UserRole',
            });

            models.Users.belongsToMany(models.Cars, {
                foreignKey: 'createdby',
                as: 'CreatedBy',
            });

            models.User.belongsToMany(models.Cars, {
                foreignKey: 'updatedby',
                as: 'UpdatedBy',
            });

            models.User.belongsToMany(models.Cars, {
                foreignKey: 'deletedby',
                as: 'DeletedBy',
            });
        }
    }
    Users.init(
        {
            userName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Users',
        }
    );
    return Users;
};
