'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            // define association here
            models.Users.belongsTo(models.userRoles, {
                foreignKey: 'role',
                as: 'UserRole',
            });

            models.Users.belongsToMany(models.Cars, {
                foreignKey: 'createdBy',
                as: 'CreatedBy',
            });

            models.User.belongsToMany(models.Cars, {
                foreignKey: 'updatedBy',
                as: 'UpdatedBy',
            });

            models.User.belongsToMany(models.Cars, {
                foreignKey: 'deletedBy',
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
