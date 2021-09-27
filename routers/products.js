let express = require("express");
const { carrito } = require("../controllers/productsController");
let router = express.Router();

// CONTROLADORES
let productsController = require("../controllers/productsController")

// Listado
router.get("/",productsController.list)

// Detalle de producto
router.get("/detalle/:id", productsController.detalle)

// Carrito
router.get("/carrito", productsController.carrito)

// Crear y almacenar
router.get("/crear",productsController.create)
router.post("/detalle/:id", productsController.newProduct)

// Editar y almacenar
router.get("/editar/:id",productsController.edit)
router.put("detalle/:id", productsController.update)




module.exports = router