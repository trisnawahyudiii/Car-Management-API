'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Cars.belongsTo(models.carTypes, {
                foreignKey: 'carType',
                as: 'car_type',
                onDelete: 'CASCADE',
            });

            models.Cars.belongsToMany(models.Users, {
                foreignKey: 'createdBy',
                as: 'CreatedBy',
                through: 'Users',
            });

            models.Cars.belongsToMany(models.Users, {
                foreignKey: 'updatedBy',
                as: 'UpdatedBy',
                through: 'Users',
            });

            models.Cars.belongsToMany(models.Users, {
                foreignKey: 'deletedBy',
                as: 'DeletedBy',
                through: 'Users',
            });
        }
    }
    Cars.init(
        {
            carName: DataTypes.STRING,
            rentCost: DataTypes.INTEGER,
            carImage: DataTypes.STRING,
            carType: DataTypes.INTEGER,
            createdBy: DataTypes.INTEGER,
            updatedBy: DataTypes.INTEGER,
            deletedby: DataTypes.INTEGER,
        },
        {
            sequelize,
            paranoid: true,
            deletedAt: 'destroyTime',
            modelName: 'Cars',
        }
    );
    return Cars;
};
