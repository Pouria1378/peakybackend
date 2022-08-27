const jwt = require("jsonwebtoken");
const responseMessage = require("./responseMessage");


const verifyToken = (req, res, next) => {
    const dateNow = new Date();
    const token =
        req.body.token || req.query.token || req.headers["authorization"];


    if (!token) {
        return res
            .send(responseMessage(403));
    }

    try {
        const decoded = jwt.verify(token, "secret");
        if (decoded.exp < dateNow.getTime() / 1000) {
            throw new Error("Token expired");
        }
        req.user = decoded;
    } catch (err) {
        return res
            .send(responseMessage(401));
    }

    return next();
};

module.exports = verifyToken;