module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
       id: {
         type: dataTypes.INTEGER(11),
         primaryKey: true,
         autoIncrement: true
       },
       first_name: {
           type: dataTypes.STRING(40),
           allowNull: false
       },
       last_name: {
        type: dataTypes.STRING(70),
        allowNull: false
       },
       email: {
        type: dataTypes.STRING(50),
        allowNull: false
       },
       password: {
        type: dataTypes.STRING(100),
        allowNull: false
       },
       function_id:{
           type: dataTypes.INTEGER(11),
           allowNull: false
       },
       image: {
           type: dataTypes.STING(255),
           allowNull: false
       },
       deleted: {
           type: dataTypes.TINYINT(4),
           allowNull: false
       }
   
    };
   
    let config = {
        tableName: 'users',
        timestamps: false
    }
   
     const User = sequelize.define(alias, cols, config); 

     User.associate = function (models){
        User.belongsTo(models.Function, {
         foreignKey: 'function_id',
         as: 'functions'
        })
    }
     
     User.associate = function (models){
         User.hasMany(models.Carts, {
             foreignKey: 'user_id',
             as: 'cartUser'
         })
     }
   }