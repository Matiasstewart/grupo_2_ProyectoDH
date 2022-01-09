const fs = require('fs');
const path = require("path");
const db = require("../database/models")
// const userJson = path.join(__dirname, '../data/user.json');
// const users = JSON.parse(fs.readFileSync(userJson, 'utf-8'));

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailCookie = req.cookies.userEmail;

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	if(req.cookies.userEmail){
		db.User.findOne({
			where:{
				email: emailCookie
			}
		})
		.then(userFromCookie =>{
			if(userFromCookie){
				req.session.userLogged = userFromCookie;
				res.locals.isLogged = true;
				res.locals.userLogged = req.session.userLogged;
			}
	
		})
	}

	
	
	next();
}

module.exports = userLoggedMiddleware;