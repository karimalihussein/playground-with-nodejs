const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('token');
    console.log(token);
    if(!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'You are not allowed to do that' });
        }
    });
}

function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'You are not allowed to do that, only the admins allowed to do this' });
        }
    });
}



module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };