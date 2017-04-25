'use strict';
module.exports = function (sequelize, DataTypes) {
    var Newproducts = sequelize.define('Newproducts', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        quality: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        pslug: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'newproducts',
        timestamps:false,
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                Newproducts.belongsTo(models.users,
                    {foreignKey: 'user_id'})
            }
        }
    });
    return Newproducts;
};