const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require ('../models/User')

const userJson = path.join(__dirname, '../data/user.json');
const users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));

const usersController = {
    login: (req,res)=>{
        res.render('users/login')
    },
    registro: (req,res)=>{
        res.render('users/register')
    },
    processRegister: (req,res) => {
            const newUsers = {
                id: users[users.length -1].id + 1,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                img: req.file.filename,
                category: req.body.category,
                password: bcrypt.hashSync(req.body.psw, 10),
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
    processLogin: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email)
        
        if(userToLogin) {
            let passwordIsOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordIsOk) {
                return res.redirect('index')
            }
            return res.render('users/login', {
                errors: {
                    email: {
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
  }
}

module.exports = usersController;