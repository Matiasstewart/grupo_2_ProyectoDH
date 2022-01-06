const express = require('express');
const router = express.Router();
const apiUsersController = require('../../controllers/api/apiUsersController.js');


router.get('/', apiUsersController.list);

router.get('/:id',apiUsersController.user);

router.get('/:id/:imagen', apiUsersController.img);

module.exports = router;