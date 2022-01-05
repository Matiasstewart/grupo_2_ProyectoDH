const { body, check } = require('express-validator');
const loginValidation = [
    check('email')
        .notEmpty().withMessage('Debes ingresar tu correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un correo electrónico').bail(),
    check('psw')
		.notEmpty().withMessage('Debes ingresar tu contraseña')   
]

module.exports = loginValidation;

// 