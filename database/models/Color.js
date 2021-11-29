module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';
    let cols = {
       id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
       color: {
            type: dataTypes.STRING(20),
            allowNull: false
       }
    };
   
    let config = {
        tableName: 'colors',
        timestamps: false
    }
   
     const Color = sequelize.define(alias, cols, config); 

     Color.associate = function (models){
        Color.belonsToMany(models.Product, {
         as:"products",
         through: "products_colors",
         foreingKey: "color_id",
         otherKey:"product_id",
         timestamps:"false"   
        })
    }

    return Color
   }