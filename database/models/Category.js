module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      category: {
          type: dataTypes.STRING(100),
          allowNull: false
      }
    }
    let config = {
        tableName: 'categories',
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models){
        Category.hasMany(models.Product, {
            foreignKey: 'category_id',
            as:'products'
        })
    }

    return Category;
}