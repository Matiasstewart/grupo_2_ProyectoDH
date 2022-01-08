function authMiddleware(req, res, next) {
	if (!req.session.userLogged) {
		return res.redirect('/usuario/login');
	} else if(req.session.userLogged.id != req.params.idUsuario){
		return res.redirect('/usuario/mi-cuenta/' + req.session.userLogged.id)
	}
	next();
}

module.exports = authMiddleware;