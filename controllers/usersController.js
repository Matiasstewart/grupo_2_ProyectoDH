const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const userJson = path.join(__dirname, '../data/user.json');
const users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));

const usersController = {
    registro: (req,res)=>{
        res.render('users/register')
    },
    proccesRegister: (req,res) => {
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
            
    },
    login: (req,res)=>{
        res.render('users/login')
    },
    loginProcess:(req,res)=>{
        let userFound = users.find(oneUser => oneUser.email === req.body.email);
        if(userFound) {
            let passwordHash =  userFound.password;
			let samePassword = bcrypt.compareSync(req.body.psw, passwordHash);
			if (samePassword) {
                // Por seguridad
				delete userFound.password;
				req.session.userLogged = userFound;

				if(req.body.remember_me) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/usuario/mi-cuenta');
			} 
			return res.render('users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('users/login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
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