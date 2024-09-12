const express =require('express');
const connection = require('./connection');
const mongoose = require('mongoose');
const cors = require('cors');
const ColorRouter = require('./routes/ColorRouter');
const CategoryRouter = require('./routes/CategoryRouter');
const ProductRouter = require('./routes/ProductRouter');
const AdminRouter = require('./routes/Adminrouter');
const UserRouter = require('./routes/UserRouter');

const server =express();
server.use(express.json());

const corsOptions ={
    origin: function (origin, callback){
        const allowedOrigins =['http://localhost:5173'];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin ){
            callback(null, true);
        }
        else{
            callback(new Error('Not allowed be cors'));
        }
    }
};

server.use(cors(corsOptions));
server.use(express.static("./public"));

//route grouping 
server.use("/category", CategoryRouter);
server.use("/product", ProductRouter);
server.use("/color", ColorRouter);
server.use("/admin",AdminRouter);
server.use("/user",UserRouter);


connection()
    .then(
        () => {
            console.log('DB connected');
            server.listen(
                5000,
                ()=>{
                    console.log('server started');
                }
            )
        }
    )
    .catch(
        () => {
            console.log('Unable to connect with DB');
        }
    )