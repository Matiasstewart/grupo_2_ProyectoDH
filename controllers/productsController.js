let productos = [
    {
        id:1,
        nombre: "Remera1",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam nihil tempora aut provident dolore.",
        imagen: "remera1.jpg",
        categoria: "snow",
        colores: "Blanco, Negro, Azul",
        talles: "S, M, L",
        precio: 100
    },
    {
        id:2,
        nombre: "Remera2",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam nihil tempora aut provident dolore.",
        imagen: "remera2.jpg",
        categoria: "snow",
        colores: "Blanco, Negro, Azul",
        talles: "S, M, L",
        precio: 200
    },
    {
        id:3,
        nombre: "Remera3",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam nihil tempora aut provident dolore.",
        imagen: "remera3.jpg",
        categoria: "snow",
        colores: "Blanco, Negro, Azul",
        talles: "S, M, L",
        precio: 100
    },
    {
        id:4,
        nombre: "Remera4",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam nihil tempora aut provident dolore.",
        imagen: "remera4.jpg",
        categoria: "snow",
        colores: "Blanco, Negro, Azul",
        talles: "S, M, L",
        precio: 200
    },
    {
        id:5,
        nombre: "Remera1",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam nihil tempora aut provident dolore.",
        imagen: "remera1.jpg",
        categoria: "snow",
        colores: "Blanco, Negro, Azul",
        talles: "S, M, L",
        precio: 400
    },
    {
        id:6,
        nombre: "Remera2",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam nihil tempora aut provident dolore.",
        imagen: "remera2.jpg",
        categoria: "snow",
        colores: "Blanco, Negro, Azul",
        talles: "S, M, L",
        precio: 100
    },
    {
        id:7,
        nombre: "Remera3",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam nihil tempora aut provident dolore.",
        imagen: "remera3.jpg",
        categoria: "snow",
        colores: "Blanco, Negro, Azul",
        talles: "S, M, L",
        precio: 300
    },
    {
        id:8,
        nombre: "Remera4",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam nihil tempora aut provident dolore.",
        imagen: "remera4.jpg",
        categoria: "snow",
        colores: "Blanco, Negro, Azul",
        talles: "S, M, L",
        precio: 200
    }
]

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
    newProduct: (req,res) =>{
        res.render('products/list')
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
    update: (req,res) =>{
        res.render('products/list')
    },
    // 

    list: (req,res) =>{
        productos.forEach(producto=>{
            return producto  
        })
        res.render('products/list', {productos:productos})
    },
}
module.exports = productsController;