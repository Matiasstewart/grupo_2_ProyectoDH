module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      category_id: {
          type: dataTypes.INTEGER,
          allowNull: false
      },
      season_id: {
        type: dataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: dataTypes.STRING(70),
        allowNull: false
      },
      description: {
        type: dataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: dataTypes.INTEGER,
        allowNull: false
      },
      discount: {
        type: dataTypes.INTEGER,
        allowNull: false
      },
      gender: {
        type: dataTypes.STRING(20),
        allowNull: false
      },
      product_image: {
        type: dataTypes.STRING(255),
        allowNull: false
      },
      deleted: {
        type: dataTypes.BOOLEAN,
        allowNull: false
      }
    }
    let config = {
        tableName: 'products',
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models){
        Product.belongsToMany(models.Size, {
            as:"sizes",
            through: "products_sizes",
            foreignKey: "product_id",
            otherKey:"size_id",
            timestamps:false
        })

        Product.belongsToMany(models.Color, {
          as:"colors",
          through: "products_colors",
          foreignKey: "product_id",
          otherKey:"color_id",
          timestamps:false    
        })
        Product.belongsToMany(models.Cart, {
          as:"carts",
          through: "carts_products",
          foreignKey: "product_id",
          otherKey:"cart_id",
          timestamps:false   
        })

        Product.belongsTo(models.Season, {
          as: 'season',
          foreignKey: 'season_id'
        })

        Product.belongsTo(models.Category, {
          as: 'category',
          foreignKey: 'category_id' 
        })
    }

    return Product;
}