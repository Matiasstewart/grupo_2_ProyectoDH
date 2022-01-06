
const db = require('../../database/models');

const apiProductsController = {
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
                product.dataValues.detail = 'http://localhost:3030/api/products/' + product.id;
            });
            return res.status(200).json({
                count: products.length,
                countByCategory:{
                    Skate: category[0].count,
                    Snow: category[1].count,
                    Surf: category[2].count    
                },
                products:products,
                status: 200

            })
        })
        .catch(error => console.log(error));
    },
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
                imageURL:'http://localhost:3030/api/products/'+product.id + '/' + product.product_image,
                status: 200

            })
        })
        .catch(error => {console.log(error)});
    }
}

            // let productsToSend = products.map((product) => {
            //     return product.dataValues;
            // })

            // let categoriesToSend = categories.map((category) => {
            //     return category.dataValues;
            // })
            
            // /* categoriesNames = [Gorras, Indumentaria, Accesorios, ...] */
            // let categoriesNames = []
            // /* categoriesCount = [1, 4, 6, ...] */
            // let categoriesCount = []
            // categoriesToSend.forEach((category) => {
            //     categoriesNames.push(category.category);
            //     categoriesCount.push(0)
            // })
        
            // productsToSend.forEach((product) => {
            //     categoriesCount[product.categories.id - 1] = categoriesCount[product.categories.id - 1] + 1
            // })

            // let countByCategoryToSend = {};
            // for (let i = 0; i < categoriesNames.length; i++) {
            //     countByCategoryToSend[categoriesNames[i]] = categoriesCount[i];
            // }


            // productsToSend.forEach((product) => {
            //     // Para acceder al product/:id
            //     product.detailURL = `api/productos/${product.id}`
            // })

            // return res.status(200).json({
            //     meta: [
            //         {count: products.length,
            //         countByCategory: countByCategoryToSend,
            //         categoriesCount: categoriesToSend.length,
            //         status: 200}
            //     ],
            //     data: products
            // })


module.exports = apiProductsController;