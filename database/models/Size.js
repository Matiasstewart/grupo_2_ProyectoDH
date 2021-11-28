module.exports = (sequelize, dataTypes) => {
    let alias = 'Size';
    let cols = {
       id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
       size: {
            type: dataTypes.STRING(50),
            allowNull: false
       }
    };
   
    let config = {
        tableName: 'sizes',
        timestamps: false
    }
   
     const Size = sequelize.define(alias, cols, config); 

     Size.associate = function (models){
        Size.belonsToMany(models.Product, {
         as:"products",
         through: "products_sizes",
         foreingKey: "size_id",
         otherKey:"product_id",
         timestamps:"false"   
        })
    }

    return Size
   }