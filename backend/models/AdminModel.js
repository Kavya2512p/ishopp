const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema(
    {
        name: {
            type : String,
            maxLength : 50
        },
        email:{
            type:String,
            maxLength: 50,
            unique: true
        },
        password:{
            type: String,

        },
        admin_type:{
            type: Boolean,
            default:false
            //true: Super admin
            //false: Admin
        },
        status:{
            type : Boolean,
            default : true
        }
    },
    {
        timestamps: true
    }
)

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = AdminModel;