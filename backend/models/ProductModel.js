const {Schema, model} =require ('mongoose');
const ProductSchema = new Schema(
    {
        name:{
            type:"String",
            maxLength:150,
            unique:true
        },
        slug:{
            type:"String",
            maxLength:150,
            unique:true
        },
        // product_code:{
        //     type:"String",
        //     unique:true
        // },
        description:{
            type:"String"
        },
        original_price:{
            type: Number,
            min: 1
        },
        discount_percentage:{
            type: Number,
            default: 0
        },
        final_price:{
            type: Number,
            min: 1
        },
        category_id:{
            type : Schema.ObjectId,
            ref: "Category"
        },
        colors:[
            {
                type:Schema.ObjectId,
                ref:"Color"
            }
        ],
        main_image:{
            type: String,
            default: null
        },
        other_images:[
            {
                type: String,
                default: null
            }
        ],
        status:{
            type:Boolean,
            default:true
        },
        stock:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
)

const ProductModel =model("Product", ProductSchema);
module.exports = {ProductModel};