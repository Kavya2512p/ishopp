const ColorModel =require("../models/ColorModel");

class ColorController{
    create(data) {
        return new Promise(
            (res,rej) =>{
                try{

                }catch(err){
                    rej({
                        msg:'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    read(id){
        return new Promise(
            async(res,rej) =>{
                try{
                    let color;
                    if(id){
                        colors= await ColorModel.findById(id);
                    }else{
                        colors= await ColorModel.find();
                    }
                    console.log(colors);
                    res({
                        msg:"Colors found",
                        colors,
                        status:1
                    })
                }catch(err){
                    rej({
                        msg:'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    updateStatus(id){
        return new Promise(
            (res,rej) =>{
                try{

                }catch(err){
                    rej({
                        msg:'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    edit(id,data){
        return new Promise(
            (res,rej ) =>{
                try{

                }catch(err){
                    rej({
                        msg:'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    delete(id){
        return new Promise(
            (res,rej) =>{
                try{

                }catch(err){
                    rej({
                        msg:'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = ColorController;