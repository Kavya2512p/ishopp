const express = require('express');
const Usercontroller = require('../controllers/UserContoller');
const UserRouter = express.Router();

UserRouter.post(
    "/login",
    (req, res) => {
        const result = new Usercontroller().login(req.body);
        result
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)

UserRouter.post(
    "/register",
    (req, res) => {
        const result = new Usercontroller().register(req.body);
        result
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)

UserRouter.post(
    "/move-to-cart",
    (req,res) => {
        const result = new Usercontroller().moveToCart(req.body);
        result
            .then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
)

module.exports = UserRouter;