const mongoose = require('mongoose')

const productSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Plese enter the product name"]
        },
        quantity:{
            type:Number,
            required:true,
            default:0,   
        },
        price:{
            type:Number,
            required:true,

        },
        image:{
            type:String,
            require:false
        }
    },
    {
        timestamps:true
    }
)

const product = mongoose.model('Product',productSchema);
module.exports=product;