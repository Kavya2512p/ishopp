const express = require ('express');
const ColorController = require('../controllers/ColorController');

const ColorRouter =express.Router();

ColorRouter.get(
    "/:id?",
    (req,res) =>{
        const result = new ColorController().read(req.params.id ?? null); 
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (error)=>{
                res.send(error);
            }
        )
    }
)
ColorRouter.post(
    "/create",
    (req,res) =>{
        
    }
)
ColorRouter.delete(
    "/delete",
    (req,res) =>{
        
    }
)

module.exports = ColorRouter;