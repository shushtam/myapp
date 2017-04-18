/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var products=sequelize.define('products', {
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
    created_at: {
      type: DataTypes.TIME,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'products',
    timestamps:false,
    
     classMethods: {
            associate: function (models) {
               products.belongsTo(models.users,
               {foreignKey:'user_id'})
                       
            }
        }
  });
  return products;
};
