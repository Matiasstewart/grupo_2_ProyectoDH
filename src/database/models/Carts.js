module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart'
    let cols = {
        id: {
          type: dataTypes.INTEGER(11),
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: dataTypes.INTEGER(11),
          allowNull: false
        },
        total_price: {
          type: dataTypes.INTEGER(11),
          allowNull: false
        },
        total_saved: {
          type: dataTypes.INTEGER(11),
          allowNull: false
        },

    }
    let config = {
        tableName: 'carts',
        timestamps: false
    }

const Carts = sequelize.define(alias, cols, config);

 Carts.associate = function (models){
     Carts.belongsTo(models.User, {
         foreignKey: 'user_id',
         as: 'userCart'
     })
 }
}