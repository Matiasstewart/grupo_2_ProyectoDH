function adminMiddleware(req, res, next) {
    if (!req.session.userLogged) {
		return res.redirect('/usuario/login');
	} 
    else if(req.session.userLogged.function_id != 1){
		return res.status(404).render("404notFound");
	}
	next();
}

module.exports = adminMiddleware;