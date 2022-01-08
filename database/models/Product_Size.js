module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_Size';
    let cols ={
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        size_id: {
            type: dataTypes.INTEGER,
            allowNull:false
        },
        
    };
    let config ={
        tableName: 'products_sizes',
        timestamps: false
    }
    const Product_Size = sequelize.define(alias, cols, config)  

    return Product_Size;
}
