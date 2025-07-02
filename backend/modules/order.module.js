import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    address:String,
    username:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    product:[
        {
           
            productname:String,
            quantity:Number,
            price:Number

        }
    ],
    totalamount:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:["pending" , "confirmed" , "shipped" ,"deliverd" , "cancelled"],
        default:"pending"
    },
    createdBy:{
        type:Date,
        default:Date.now()

    }
    
})

export const order = mongoose.model("order" , orderSchema)