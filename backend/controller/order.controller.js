import { order } from "../modules/order.module.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const userorder = asyncHandler(async(req,res) => {
    const {address , product } = req.body

    if(!address||!Array.isArray(product)|| product.length === 0 ){
        return res.status(400).json({
            success:false,
            message:"all feilds are required"
        })
    }
     const totalamount = product.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);


    const neworder = await order.create({
        address,
        username:req.user._id,
        phoneNumber:req.user.number,
        product,
        totalamount
    
    })

    return res.status(201).json({
        success:true,
        message:"order succesfull",
        order:neworder

    })

    
})

export {userorder}