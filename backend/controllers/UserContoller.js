const { createToken, encodePassword, decodePassword } = require("../helper");
const CartModel = require("../models/CartModel");
const UserModel = require("../models/UserModel");

class Usercontroller {
    register(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const { name, email, password } = data;

                    //Check if all requireed fields are provided
                    if (!name || !email || !password) {
                        return rej({ status: 0, msg: 'All fields are required ' });
                    }

                    // Check if the user already exists
                    const existingUser = await UserModel.findOne({ email });
                    if (existingUser) {
                        return rej({ msg: 'User already exists', status: 0 });
                    }

                    // Create a new user
                    const newUser = new UserModel({
                        name,
                        email,
                        password: encodePassword(password)
                    });

                    // Save the user to the database
                    await newUser.save();

                    res({ status: 1, msg: 'User registered successfully' });
                } catch (err) {
                    console.log(err.message);
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    // console.log(data);
                    const user = await UserModel.findOne({ email: data.email });
                    // console.log(user);
                    if (user && (decodePassword(user.password) == data.password)) {
                            const token = createToken(user);
                            
                            res({
                                msg: "Login successful",
                                status: 1,
                                user,
                                token
                            })
                    }
                    else {
                        rej({
                            msg: "Invalid credentials",
                            status: 0
                        })
                    }
                } catch (err) {
                    // console.log(err.message);
                    rej({

                        msg: "Internal server error",
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

    moveToCart({cartData, userId}){
        return new Promise(
            (res, rej) => {
                try {
                    const data = cartData.map(
                        (cd)=>{
                            return{
                                user_id: userId,
                                product_id: cd.pId,
                                quantity: cd.qty
                            }
                        }
                    )
                    CartModel.insertMany(data)
                    .then(
                        () =>{
                            res({
                                msg: "Moved to cart",
                                status:1
                            })
                        }
                    ).catch(
                        () =>{
                            rej({
                                msg: "Unable to move to cart",
                                status: 0
                            })
                        }
                    )
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

module.exports = Usercontroller;