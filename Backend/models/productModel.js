const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter the product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the product price"],
        maxLength:[8,"Price cannot exceed 8 characters of length"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter the product stock"],
        maxLength:[4,"Stock cannot exceed 4 characters of length"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{

                type: mongoose.Schema.ObjectId,
                ref:"user",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            } 
        }
    ],
    
    user:{

        type: mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },

    createdAt:{
        type:Date,
        date:Date.now
    }
})

module.exports= mongoose.model("Products",productSchema);