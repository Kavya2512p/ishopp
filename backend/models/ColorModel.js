const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorSchema = new Schema(
    {
        name: {
            type : String,
            maxLength : 50
        },
        color:{
            type: String,
            maxLength:50
        },
        status:{
            type : Boolean,
            default : true
        }
    },{
        timestamps: true
    }
)

const ColorModel = mongoose.model("Color", colorSchema);

module.exports = ColorModel;