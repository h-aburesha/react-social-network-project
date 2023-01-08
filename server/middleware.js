module.exports.requireLoggedInUser = (req, res, next) => {
    if (!req.session.user_id && req.url != "/register" && req.url != "/login") {
        return res.redirect("/register");
    }
    next();
};

module.exports.requireSigned = (req, res, next) => {
    if (!req.session.user_id && req.url != "/register" && req.url != "/login") {
        return res.redirect("/register");
    }
    next();
};
