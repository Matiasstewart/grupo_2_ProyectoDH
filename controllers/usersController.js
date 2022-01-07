const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
/* const User = require ('../models/User') */
const db = require ('../database/models')
const {validationResult} = require('express-validator');

/* const userJson = path.join(__dirname, '../data/user.json');
const users = JSON.parse(fs.readFileSync(userJson, 'utf-8')); */

// Base de datos
const User = db.User;

const usersController = {
    registro: (req,res)=>{
        db.Function.findAll()
        .then(functions =>{
			return res.render('users/register',{functions})
		})
    },
    processRegister: (req,res) => {
		db.Function.findAll()
		.then(functions=>{
			let errors = validationResult(req);
        	if(!errors.isEmpty()){
            return res.render('users/register', {
				errors: errors.mapped(),
				oldData: req.body,
				functions
			})}
			if(req.body.number === '123456'){
                return User.create({
					first_name: req.body.name,
					last_name: req.body.lastname,
					email: req.body.email,
					password: bcryptjs.hashSync(req.body.psw, 10),
					function_id: 1,
					user_image: req.file.filename,
					deleted: 0,
				})
				.then(() => {
					return res.redirect("/usuario/login")
				})
				.catch(error => res.send(error))
            }
				User.create({
					first_name: req.body.name,
					last_name: req.body.lastname,
					email: req.body.email,
					password: bcryptjs.hashSync(req.body.psw, 10),
					function_id: 2,
					user_image: req.file.filename,
					deleted: 0,
				})
				.then(() => {
					return res.redirect("/usuario/login")
				})
				.catch(error => res.send(error))
			
		})
		.catch(error => res.send(error))
	},
    login: (req,res)=>{
        return res.render('users/login')
    },
  processLogin:(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('users/login', {
            errors: errors.mapped(),
            oldData:req.body
        });
    }else{
        return User.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(function (user){
            console.log(user)
            if(user == null){
                res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'El email ingresado no está registrado'
                        }
                    }
                })
            }
            else {
                let passwordHash =  user.password;
                let samePassword = bcryptjs.compareSync(req.body.psw, passwordHash);

                if(samePassword){
                    // Por seguridad
                    delete user.password;
                    req.session.userLogged = user;

                    if(req.body.remember_me) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }

                    return res.render('users/profile' , {user});
                }else{
                    return res.render('users/login', {
                        errors: {
                            psw: {
                                msg: 'La contraseña no es correcta'
                            }
                        },
                        oldData:req.body
                    })
                }
            }
        })
        .catch(error => res.send(error))	
    }
},
  edit:(req,res)=>{
    let users = User.findByPk(req.params.idUsuario);
    let functions = db.Function.findAll();

    Promise
    .all([users,functions])
    .then(([user,funcion]) => {
        return res.render('users/edit.ejs', {user, functions:funcion});
    })
    .catch(error => res.send(error))
    
},
update:(req,res)=>{
    let userId = req.params.idUsuario;
    let password = req.body.psw;
    console.log(password);
    User.update(
        {
            first_name: req.body.name,
            last_name: req.body.lastname,
            email: req.body.email,
            password: bcryptjs.hashSync(password, 10),
            function_id: req.body.function,
            user_image: req.file ? req.file.filename : '',
            deleted: 0,
        },
        {
            where: {id: userId}
        })
    .then(()=> {
        return res.redirect('/users/edit' + userId)})            
    .catch(error => res.send(error))

},
  profile: (req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
        return res.render('users/profile.ejs', {user});
    })
    .catch(error => res.send(error))
    //   return res.render('users/profile', {
    //       user: req.session.userLogged
    //   });
  },

  logout: (req, res) => {
      res.clearCookie('userEmail');
      req.session.destroy();
      return res.redirect('/');
  }
}

module.exports = usersController;