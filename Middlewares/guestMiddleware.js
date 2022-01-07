function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/usuario/mi-cuenta/' + req.session.userLogged);
	}
	next();
}

module.exports = guestMiddleware;