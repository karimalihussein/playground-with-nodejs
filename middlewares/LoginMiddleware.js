const IsLogin = (req, res, next) => {
    const isLogin = req.userAuth;
    if (isLogin) {
        next();
    } else{
        const error = new Error("You are not authorized to access this area");
        next(error);
    }
};

module.exports = IsLogin;