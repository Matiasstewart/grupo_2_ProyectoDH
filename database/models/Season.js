module.exports = (sequelize, dataTypes) => {
    let alias = 'Season';
    let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      season: {
          type: dataTypes.STRING(20),
          allowNull: false
      }
    }
    let config = {
        tableName: 'seasons',
        timestamps: false
    }

    const Season = sequelize.define(alias, cols, config);

    Season.associate = function (models){
        Season.hasMany(models.Product, {
            foreignKey: 'season_id',
            as:'products'
        })
    }

    return Season;
}