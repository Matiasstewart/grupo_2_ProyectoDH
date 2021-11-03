function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/usuario/mi-cuenta');
	}
	next();
}

module.exports = guestMiddleware;