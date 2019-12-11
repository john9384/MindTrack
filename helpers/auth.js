module.exports = {
  checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Not logged in");
    res.redirect("/users/login");
  }
};
