const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/api/apiProductsController.js');


router.get('/', apiProductsController.list);

router.get('/last-product',apiProductsController.lastProduct);

router.get('/:id',apiProductsController.product);

router.get('/:id/:productImage',apiProductsController.image);



module.exports = router;