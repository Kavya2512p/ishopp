// middleware

const { verifyToken } = require("../helper");


const adminAuth = (req, res, next) => {
    const authToken = req?.headers?.authorization;
    if (authToken) {
        const admin = verifyToken(authToken);
        if (admin == undefined || admin['admin_type'] == undefined) {
            console.log(admin);
            res.send({
                msg: "Invalid / expired token",
                status: 0
            })
        }
        else {
            next();
        }
    } else {
        res.send({
            msg: "Missing token",
            status: 0
        })
    }
}

module.exports = {adminAuth};

// next() -> closure function