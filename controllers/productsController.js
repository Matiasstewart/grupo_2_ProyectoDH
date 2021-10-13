const fs = require("fs");
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController ={
    detalle: (req,res)=>{
        productos.forEach(producto=>{
            if(req.params.id == producto.id){
                res.render('products/productDetail',{producto:producto})
            }
        })  
    },
    carrito: (req,res)=>{
        res.render('products/productCart')
    },

    // Crear y almacenar
    create: (req,res) =>{
        res.render('products/create')
    },
    store: (req,res) =>{
        const newProduct = {
			id: productos[productos.length - 1].id + 1,
			name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            color: [req.body.color],
            size:[req.body.size],
            image:req.file.filename,
			price: req.body.price,
		}
		productos.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, " "));
		res.redirect("/productos");
    },
    // 

    // Editar y almacenar
    edit: (req,res) =>{
        productos.forEach(producto=>{
            if(req.params.id == producto.id){
                res.render('products/edit',{producto:producto})
            }
        })
    },
    update: (req, res) => {
		const id = req.params.id;
		let productToEdit = productos.find(producto => producto.id == id);
		
		productToEdit = {
			id: productToEdit.id,
			name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            color: req.body.color,
            size:req.body.size,
            image: req.file ? req.file.filename : productToEdit.image,
			price: req.body.price,
			/* ...req.body, */
		}

		let newProducts = productos;
		newProducts[id-1] = productToEdit;

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, " "));
		res.redirect("/productos/detalle/" + productToEdit.id)
	},
    // 

    list: (req,res) =>{
        productos.forEach(producto=>{
            return producto  
        })
        res.render('products/list', {productos:productos})
    },
    delete:(req, res) => {
		let finalProducts = productos.filter(producto => producto.id != req.params.id);

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));

        res.redirect("/productos")
	}
}
module.exports = productsController;