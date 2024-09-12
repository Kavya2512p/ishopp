const mongoose = require('mongoose');

async function connection(){
    const conn = await mongoose.connect(
        "mongodb://localhost:27017",
        {
            dbName : "practicedb1"
        }
    )
    return conn;
}

module.exports = connection;