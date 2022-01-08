const fs = require("fs");
const path = require('path');

// const productsFilePath = path.join(__dirname, '../data/products.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const {validationResult} = require('express-validator');

const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Product = db.Product;
const Color = db.Color;
const Size = db.Size;
const Category = db.Category;
const Season = db.Season;
const Product_Color = db.Product_Color;
const Product_Size = db.Product_Size;

const productsController ={
    detalle: (req,res)=>{
        db.Product.findByPk(req.params.id,
            {include:[{association:'colors'}, {association:'sizes'},{association:'category'}, {association:'season'}]})
            .then(product => {
                res.render('products/productDetail',{product:product, colors:product.colors, sizes:product.sizes, category:product.category, season: product.season})
            });
        // productos.forEach(producto=>{
        //     if(req.params.id == producto.id){
        //         res.render('products/productDetail',{producto:producto})
        //     }
        // })  
    },
    carrito: (req,res)=>{
        res.render('products/productCart')
    },

    // Crear y almacenar
    create: (req,res) =>{
        let promColor = db.Color.findAll();
        let promSizes = db.Size.findAll();
        let promCategory = db.Category.findAll();
        let promSeason = db.Season.findAll();
        
        Promise
        .all([promColor, promSizes, promCategory, promSeason])
        .then(([allColors, allSizes, allCategories, allSeasons]) => {
            return res.render('products/create', {allColors, allSizes, allCategories, allSeasons})})
        .catch(error => res.send(error))
    },
    store: (req,res) =>{
        let promColor = db.Color.findAll();
        let promSizes = db.Size.findAll();
        let promCategory = db.Category.findAll();
        let promSeason = db.Season.findAll();
        
        Promise
        .all([promColor, promSizes, promCategory, promSeason])
        .then(([allColors, allSizes, allCategories, allSeasons]) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
			    return res.render('products/create', {
				    errors: errors.mapped(),
				    oldData:req.body,
                    allColors, allSizes, allCategories, allSeasons
			    });
		    }else{
                Product.create(
                    {
                    category_id: req.body.category,
                    season_id: req.body.season,
                    title: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    discount:req.body.discount,
                    gender:req.body.gender,
                    product_image: req.file.filename,
                    deleted: 0,
                    })
                .then((product)=> {
                    let colors = req.body.color;
                    let sizes = req.body.size;
                    colors.forEach(color=>{
                        Product_Color.create({
                            product_id:product.id,
                            color_id: color
                        })
                    })
                    sizes.forEach(size=>{
                        Product_Size.create({
                            product_id:product.id,
                            size_id:size
                        })
                    })
                    return res.redirect('/productos')})   
                .catch(error => res.send(error))
            }
        })
    },
    // 

    // Editar y almacenar
    edit: (req,res) =>{
        let productId = req.params.id;
        let promProduct = db.Product.findByPk(productId,{include: ['colors','sizes','category','season']});
        let promColor = db.Color.findAll();
        let promSizes = db.Size.findAll();
        let promCategory = db.Category.findAll();
        let promSeason = db.Season.findAll();
        Promise
        .all([promProduct,promColor, promSizes, promCategory, promSeason])
        .then(([Product, allColors, allSizes, allCategories, allSeasons]) => {
            return res.render('products/edit', {Product, allColors, allSizes, allCategories, allSeasons})})
        .catch(error => res.send(error))
        // productos.forEach(producto=>{
        //     if(req.params.id == producto.id){
        //         res.render('products/edit',{producto:producto})
        //     }
        // })
    },
    update: (req, res) => {
        let productId = req.params.id;
        let promProduct = Product.findByPk(productId,{include: ['sizes','colors','season','category']});
        let promColor = Color.findAll();
        let promSizes = Size.findAll();
        let promCategory = Category.findAll();
        let promSeason = Season.findAll();

        Promise
        .all([promProduct,promColor, promSizes, promCategory, promSeason])
        .then(([Product, allColors, allSizes, allCategories, allSeasons]) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
			    return res.render('products/edit', {
				    errors: errors.mapped(),
				    oldData:req.body,
                    Product, allColors, allSizes, allCategories, allSeasons
			    })
            }else{
                db.Product.update(
                    {
                        category_id: req.body.category,
                        season_id: req.body.season,
                        title: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        discount:req.body.discount,
                        gender:req.body.gender,
                        product_image: req.file.filename,
                        deleted: 0,
                    },
                    {
                        where: {id: productId}
                })
                .then(()=>{
                    Product_Color.destroy(
                        {where:
                            {product_id:productId}
                        });
                    Product_Size.destroy(
                        {where:
                            {product_id:productId}
                        })
			    })
                .then(()=>{
                    let colors = req.body.color;
                    let sizes = req.body.size;
                    colors.forEach(color=>{
                        Product_Color.create({
                            product_id:productId,
                            color_id: color
                        },
                        {
                            where:{product_id:productId}  
                        })
                    })
                    sizes.forEach(size=>{
                        Product_Size.create({
                            product_id:productId,
                            size_id:size
                        },
                        {
                            where:{product_id:productId}  
                        })
                    })
				    return res.redirect("/productos/detalle/" + productId)  
				})
				.catch(error => res.send(error));
            }
        })
	},
    // 

    list: (req,res) =>{
        let promProducts = db.Product.findAll();
        let promCategories = db.Category.findAll();

        Promise.all([promProducts, promCategories])
        .then(([products, categories]) => {
                res.render('products/list', {products:products, categories:categories})
            })
        .catch(error => res.send(error));
    },
    delete:(req, res) => {
        let productId = req.params.id;
        let productDestroy = Product.destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        let product_SizeDestroy = Product_Size.destroy({where:{product_id:productId}, force: true})
        let product_ColorDestroy = Product_Color.destroy({where:{product_id:productId}, force: true})

        Promise.all([productDestroy, product_ColorDestroy, product_SizeDestroy])
        .then(()=>{
            return res.redirect('/productos')})
        .catch(error => res.send(error)) 
	},
    search:(req,res)=>{
        return res.render("products/search")
    },
    results:(req, res) => {
        Product.findAll({
            where:{
                title:{[Op.like]:"%"+req.query.producto+"%"}
            }
        })
        .then(products => {
            if(products.length > 0){
                return res.render("products/results",{products:products})
            }
        })
    },
}
module.exports = productsController;