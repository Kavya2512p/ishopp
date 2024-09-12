const {Schema, model} =require ('mongoose');
// const mongoose =require('mongoose');

// const CategorySchema = new mongoose.Schema
const CategorySchema = new Schema(
    {
        name:{
            type:"String",
            maxLength:100,
            unique:true,
            // capitalize,
            required:true
        },
        slug:{
            type:"String",
            maxLength:100,
            unique:true,
            required:true
        },
        image_name:{
            type:"String",
            // unique:true,
            // default:null
        },
        status:{
            type: Boolean,
            default:1 // 1: active  0: inactive
        }
    },
    {
        timestamps: true
    }
)

const CategoryModel = model("Category", CategorySchema);

module.exports = CategoryModel;