/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define('users', {
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
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: 'user'
        },
        remember_token: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        created_at: {
            type: DataTypes.TIME,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.TIME,
            allowNull: true
        }
    }, {
        tableName: 'users',
        timestamps: false,
        underscored: true,
        classMethods: {
            associate: function (models) {
                users.hasMany(models.products)
            }
        }
    });
    return users;
};
