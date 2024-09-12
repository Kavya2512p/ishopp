const { createToken } = require("../helper");
const AdminModel = require("../models/AdminModel");

class Admincontroller{
    register(data) {
        return new Promise(
            (res, rej) => {
                try {
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    login(data){
        return new Promise(
            async (res,rej) =>{
                try{
                    // console.log(data);
                    const admin = await AdminModel.findOne({ email: data.email, password: data.password});
                    // console.log(admin);
                    if (admin) {
                        const token = createToken(admin);
                        // console.log(token);
                        res({
                            msg:"Login successful",
                            status:1,
                            admin,
                            token
                        })
                    }
                    else{
                        rej({
                            msg:"Invalid credentials",
                            status:0
                        })
                    }
                } catch(err) {
                    // console.log(err.message);
                    rej({

                        msg:"Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
    read(id) {
        return new Promise(
            (res, rej) => {
                try {
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    updateStatus(id) {
        return new Promise(
            (res, rej) => {
                try {
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    edit(id, data) {
        return new Promise(
            (res, rej) => {
                try {
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    delete(id) {
        return new Promise(
            (res, rej) => {
                try {
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = Admincontroller;