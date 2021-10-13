let express = require("express");
const multer = require("multer");
const path = require("path")
const { carrito } = require("../controllers/productsController");
let router = express.Router();

// CONTROLADORES
let productsController = require("../controllers/productsController")

// MULTER
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
       cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const newFileName = 'product_' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({storage: storage});

// Listado
router.get("/",productsController.list)

// Detalle de producto
router.get("/detalle/:id", productsController.detalle)

// Carrito
router.get("/carrito", productsController.carrito)

// Crear y almacenar
router.get("/crear",productsController.create)
router.post("/", productsController.store)

// Editar y almacenar
router.get("/editar/:id",productsController.edit)
router.put("/", productsController.update)

// Borrar
router.delete("/detalle/:id",productsController.delete)

module.exports = router