const express = require('express');
const ProductController = require('../controllers/ProductController');
const fileUpload = require('express-fileupload');
const ProductRouter = express.Router();

ProductRouter.get(
    "/:id?",
    (req, res) => {
    
        const result = new ProductController().read(req.params.id, req.query);
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
ProductRouter.post(
    "/create",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const result = new ProductController().create(
            req.body,
            req.files.product_image
        );
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

ProductRouter.get(
    "/delete-image/:index/:pid",
    (req,res) => {
        const result = new ProductController().delImg(req.params.index, req.params.pid);
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

ProductRouter.post(
    "/upload-other-images/:pid",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req,res) =>{
        const result = new ProductController().uploadOtherImages(
            req.params.pid,
            req.files.other_images
        );
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

ProductRouter.delete(
    "/delete",
    (req, res) => {

    }
)

module.exports = ProductRouter;