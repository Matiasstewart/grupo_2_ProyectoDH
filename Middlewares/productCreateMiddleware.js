const path = require('path');
const { check } = require('express-validator');

const productCreateValidations = [
	check('name')
		.notEmpty().withMessage('Tienes que escribir un nombre').bail()
		.isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
	check('description')
		.isLength({min:20}).withMessage('La descripción debe tener al menos 20 caracteres'),
	check('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.JPG', '.PNG', '.GIF', '.JPEG'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})
]

module.exports = productCreateValidations;