const db = require('../database/models');
const { Op } = require("sequelize");

const mainController = {
    index: (req,res)=>{
        db.Product.findAll({
            where:{
                discount:{
                    [Op.or]:[15, 10]
                }
            },
            limit:8
        }).then(products =>{
            return res.render('index',{products})
        })
    }
    
}

module.exports = mainController;