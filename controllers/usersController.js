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
        // let errors = validationResult(req);
        // if(!errors.isEmpty()){
        //     return res.render('users/register', {
		// 		errors: errors.mapped(),
		// 		oldData: req.body
		// 	});
        // } /* else {
        //     db.User.create({
        //         first_name: req.body.name,
        //         last_name: req.body.lastname,
        //         email: req.body.email,
        //         user_image: req.file.filename,
        //         function_id: req.body.category,
        //         password: bcryptjs.hashSync(req.body.psw, 10)
        //     })
        //     .then(() =>{
        //         return res.redirect('/usuario/login')
        //     })
        //     .catch((error) => {
        //         res.send(error)})
        // } */

		// /* let userFound = users.find(oneUser => oneUser.email === req.body.email);
		// if(userFound) {
		// 	return res.render('users/register', {
		// 		errors: {
		// 			email: {
		// 				msg: 'Este email ya está registrado'
		// 			}
		// 		},
		// 		oldData: req.body
		// 	});
		// }
        //     const newUsers = {
        //         id: users[users.length -1].id + 1,
        //         name: req.body.name,
        //         lastname: req.body.lastname,
        //         email: req.body.email,
        //         img: req.file.filename,
        //         category: req.body.category,
        //         password: bcryptjs.hashSync(req.body.psw, 10),
        //     }

        //     users.push(newUsers);
        //     fs.writeFileSync(userJson, JSON.stringify(users,null, 4))
        //     res.redirect("/usuario/login") */

        //     /*let userInDB = User.findByField('email', req.body.email);
            
        //     if (userInDB) {
        //         return res.render('register.ejs', {
        //             errors: {
        //                 email: {
        //                     msg: 'Este email ya está registrado'
        //                 }
        //             },
        //             oldData: req.body
        //         })
        //     } */
        
        User.create({
            first_name: req.body.name,
            last_name: req.body.lastname,
            email: req.body.email,
			password: bcryptjs.hashSync(req.body.psw, 10),
			function_id: req.body.function,
            user_image: req.file.filename,
            deleted: 0,
        })
		.then(() => {
            return res.redirect("/usuario/login")
        })
        .catch(error => res.send(error))
            
    },
    login: (req,res)=>{
        return res.render('users/login')
    },
    processLogin: (req, res) => {
        User.findOne({
			where:{
				email:req.body.email
			}
		})
		.then(user =>{
			if(user){
                return res.render("users/profile",{user})
            }
        })
        .catch(error => res.send(error))

    //     let userToLogin = User.findByField('email', req.body.email)
        
    //     if(userToLogin) {
    //         let passwordIsOk = bcryptjs.compareSync(req.body.psw, userToLogin.password);
    //         if (passwordIsOk) {
    //             delete userToLogin.password;
	// 			req.session.userLogged = userToLogin;

	// 			if(req.body.remember_me) {
	// 				res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
	// 			}

	// 			return res.redirect('/usuario/mi-cuenta');
    //         }
    //         return res.render('users/login', {
    //             errors: {
    //                 password: {
    //                     msg: 'Las credenciales son inválidas'
    //                 }
    //             }
    //         })
    //     }

    //    return res.render('users/login', {
    //        errors: {
    //            email: {
    //                msg: 'No se encuentra este email en nuestra base de datos'
    //            }
    //        }
    //    })
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
            user_image: req.file.filename,
            deleted: 0,
        },
        {
            where: {id: userId}
        })
    .then(()=> {
        return res.redirect('/usuario/mi-cuenta')})            
    .catch(error => res.send(error))

},
  profile: (req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
        return res.render('users/profile.ejs', {user});
    });
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