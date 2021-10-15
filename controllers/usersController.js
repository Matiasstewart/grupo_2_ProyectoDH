const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const userJson = path.join(__dirname, '../data/user.json');
const users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));

const usersController = {
    login: (req,res)=>{
        res.render('users/login')
    },
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
            
       }

}

module.exports = usersController;