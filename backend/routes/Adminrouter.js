const express = require('express');
const AdminRouter = express.Router();
const AdminController = require('../controllers/AdminController');

AdminRouter.post(
    "/login",
    (req, res) => {
        const result = new AdminController().login(req.body);
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

AdminRouter.post(
    "/register",
    (req, res) => {
        const result = new AdminController().register(req.body);
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

module.exports = AdminRouter;