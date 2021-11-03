const path = require('path');
const { check } = require('express-validator');

const validations = [
	check('name').notEmpty().withMessage('Tienes que escribir un nombre'),
	check('lastname').notEmpty().withMessage('Tienes que escribir un apellido'),
	check('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	check('img').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	}),
	check('category').notEmpty().withMessage('Tienes que elegir una categoría'),
	check('psw').notEmpty().withMessage('Tienes que escribir una contraseña'),
]

module.exports = validations;