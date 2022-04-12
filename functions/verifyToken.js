const jwt = require("jsonwebtoken");

// const config = process.env;

const verifyToken = (req, res, next) => {
    const dateNow = new Date();
    const token =
        req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, "secret");
        if (decoded.exp < dateNow.getTime() / 1000) {
            throw new Error("Token expired");
        }
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};

module.exports = verifyToken;