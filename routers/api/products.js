const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/api/apiProductsController.js');


router.get('/', apiProductsController.list);

router.get('/:id',apiProductsController.product)

module.exports = router;