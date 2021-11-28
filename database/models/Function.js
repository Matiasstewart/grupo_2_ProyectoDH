module.exports = (sequelize, dataTypes) => {
    let alias = 'Function';
    let cols = {
      id: {
          type: dataTypes.INTEGER(11),
          primaryKey: true,
          autoIncrement: true
      },
      admin_or_user: {
          type: dataTypes.STRING(15),
          allowNull: false
      }
    }
    let config = {
        tableName: 'functions',
        timestamps: false
    }

    const Function = sequelize.define(alias, cols, config);

    Function.associate = function (models){
        Function.hasMany(models.User, {
            foreignkey: 'function_id',
            as:'users'
        })
    }
}