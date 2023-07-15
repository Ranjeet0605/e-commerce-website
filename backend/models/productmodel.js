const mongoose = require("mongoose");
  const  productSchema = new mongoose.Schema({
    
        name:{
            type:String,
            required:[true,"please Enter product Name"],
        },
      description:{
        type:String,
        required:[true, "Please Enter  the descption "],
      },
      price:{
        type:Number,
        required:[true,"Please Enter the product prize"],
        maxLenght:[8,"price cannot exceed 8 character"],
    },
      rating:{
        type:Number,
        default:0,
      },
      images:[{
        public_id:{
        type:String,
        required:true,
      },
      url:{
        type:String,
        required:true,
      }
    }],
  category:{
    type:String,
    required:[true,"Please Enter the category"],
  },
  stock:{
     type:Number,
     required:[true,"Please Enter Poduct Stock"],
     maxLenght:[4,"stock cannot exced 4 character"],
    default: 1,
    },
    numOfReviews:{
type:String,
 default:0,
    },
    reviews:[{
       user: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
       },
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true,

        },
        comment:{
            type:Number,
            required:true,
        },
    },
  ],
    user:{
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required:true,
    },
    creatAt:{
        type:Date,
        default:Date.now,
    }

 })
module.exports = mongoose.model("Product",productSchema)

   