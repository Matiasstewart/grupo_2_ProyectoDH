const path = require('path');
const { check } = require('express-validator');
const db = require ('../database/models');
const res = require('express/lib/response');
const User = db.User;


const validations = [
	check('name').notEmpty().withMessage('Tienes que ingresar un nombre').bail()
	.isLength({min: 2}).withMessage('El nombre tiene que tener mas de 2 letras'),
	check('lastname').notEmpty().withMessage('Tienes que ingresar un apellido').bail()
	.isLength({min: 2}).withMessage('El apellido tiene que tener mas de 2 letras'),
	check('email').notEmpty().withMessage('Tienes que ingresar un correo electrónico valido').bail()
	.isEmail().withMessage('Debes ingresar un formato de correo válido'),
	
	check('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

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
	check('category').notEmpty().withMessage('Tienes que seleccionar una categoría'),
	check('psw').notEmpty().withMessage('Tienes que ingresar una contraseña').bail()
	.isLength({min: 8}).withMessage('La contraseña debe tener mas de 8 caracteres'),
]

module.exports = validations;