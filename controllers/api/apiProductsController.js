
const db = require('../../database/models');

const apiProductsController = {
    product:(req,res)=>{
        db.Product
        .findOne({
            where:{
                id:req.params.id,
                deleted:0
            },
            include: [{model: db.Category, as: 'category'},{model:db.Season, as:'season'}],
            attributes:{
                exclude:['season_id','category_id']}
        })
        .then(product=>{
            return res.status(200).json({
                product: product,
                imageURL:'http://localhost:3090/api/products/'+product.id + '/' + product.product_image,
                status: 200

            })
        })
        .catch(error => {console.log(error)});
    },
    lastProduct:(req,res)=>{
        db.Product.findAll({
            limit:1,
            order:[
                ['id','DESC']
            ]
        })
        .then((product)=>{
            console.log(product)
            return res.status(200).json({
                product:product,
                imageURL:'http://localhost:3090/api/products/'+product.id + '/' + product.product_image,
                status:200
            })
        })
    },
    list: (req, res) => {
        let promProducts = db.Product
        .findAll({
            include: {model: db.Category, as: 'category'},
            attributes:{
                exclude:['season_id','price','category_id','discount','gender','product_image','deleted']}
        });
        
        let promCategory = db.Category
        .count({include:[{association:'products'}],group:['category']})
        
        Promise.all([promProducts,promCategory])
        .then(([products,category])=> {
            products.forEach(product => {
                product.dataValues.detail = 'http://localhost:3090/api/products/' + product.id;
            });
            return res.status(200).json({
                count: products.length,
                countByCategory:[{
                    TablaDeSkate: category[0],
                    TablaDeSnow: category[1],
                    TablaDeSurf: category[2],
                    GafasDeSnow: category[3],
                    Pantalones: category[4],
                    Zapatillas: category[5],
                    ShortDeBabaño: category[6],
                    Camperas: category[7],
                    Remeras: category[8], 
                    Gorros: category[9],
                }],
                countCategory: category.length 
                ,
                products:products,
                status: 200

            })
        })
        .catch(error => console.log(error));
    }
}

            
module.exports = apiProductsController;