const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const User = require ('../models/User')

const {validationResult} = require('express-validator');

const userJson = path.join(__dirname, '../data/user.json');
const users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));


const usersController = {
    registro: (req,res)=>{
        res.render('users/register')
    },
    processRegister: (req,res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('users/register', {
				errors: errors.mapped(),
				oldData: req.body
			});
        }

		let userFound = users.find(oneUser => oneUser.email === req.body.email);
		if(userFound) {
			return res.render('users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}
            const newUsers = {
                id: users[users.length -1].id + 1,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                img: req.file.filename,
                category: req.body.category,
                password: bcryptjs.hashSync(req.body.psw, 10),
            }

            users.push(newUsers);
            fs.writeFileSync(userJson, JSON.stringify(users,null, 4))
            res.redirect("/usuario/login")

            /*let userInDB = User.findByField('email', req.body.email);
            
            if (userInDB) {
                return res.render('register.ejs', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                })
            } */
    
            
    },
    login: (req,res)=>{
        return res.render('users/login')
    },
    processLogin: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email)
        
        if(userToLogin) {
            let passwordIsOk = bcryptjs.compareSync(req.body.psw, userToLogin.password);
            if (passwordIsOk) {
                delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_me) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/usuario/mi-cuenta');
            }
            return res.render('users/login', {
                errors: {
                    password: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            })
        }

       return res.render('users/login', {
           errors: {
               email: {
                   msg: 'No se encuentra este email en nuestra base de datos'
               }
           }
       })
  },
  profile: (req, res) => {
      return res.render('users/profile', {
          user: req.session.userLogged
      });
  },

  logout: (req, res) => {
      res.clearCookie('userEmail');
      req.session.destroy();
      return res.redirect('/');
  }
}

module.exports = usersController;