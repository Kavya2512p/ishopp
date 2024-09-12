// const tokens = new Map();
// const { v1 } =require('uuid');

// {
//     "2324": { "name": "asda"},
//     "3452": { "name": "efsf"}
// }



const Cryptr = require('cryptr');
const cryptr = new Cryptr('jaipur@key123');
const jwt = require('jsonwebtoken');
const secretKey = "secrets@jaipur";

const createToken = (data) =>{

const token = jwt.sign(data.toJSON(), secretKey, {
    expiresIn: "24h"
});
return token;

    // const auth_token = v1();
    // if(tokens.get(auth_token) == undefined ){
    //     tokens.set(auth_token, data);
    //     console.log(tokens);          //clg(auth_token);
    //     return auth_token;
    // }else{
    //     return createToken(data);  //recursion
    // }
}

// console.log(tokens);
const verifyToken = (token) => {
    // return tokens.get(token);

    // return jwt.verify(token, secretKey);
    try{
        const admin = jwt.verify(token, secretKey);
        return admin;
    }catch(err){
        return undefined;
    }
}

const generateFileNames = (file_name) => {
    return  Math.floor(Math.random()* 10000000) + new Date().getTime() +file_name;
}

const encodePassword = (password) => {
    return cryptr.encrypt(password);
}

const decodePassword = (encoded_password) => {
    return cryptr.decrypt(encoded_password);
}



module.exports = { encodePassword, decodePassword, verifyToken, createToken, generateFileNames};