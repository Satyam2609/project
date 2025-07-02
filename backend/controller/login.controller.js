import { asyncHandler } from "../utils/asyncHandler.js";   
import { User } from "../modules/user.module.js";

const loginUser = asyncHandler(async(req , res) => {
    const {email, username , password} = req.body


       if([email , username , password].some((fields) => fields?.trim() === '')){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        });
    }

    const exsist = await User.findOne({
        $or:[{email} , {username}]
    })

    if(!exsist){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }

    const isMatch = await exsist.isPasswordCorrect(password)
    if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"invalied"
        })
    }

    const accesstoken = await exsist.generateAccessToken();
    const refreshtoken = await exsist.generateRefreshToken();


    return res.status(200).json({
        success:true,
        message:"login successfully",
        exsist:{
            _id: exsist._id,
      username: exsist.username,
      email: exsist.email,
      number: exsist.number,
      avatar: exsist.avatar,

        },
        token:accesstoken,
        refreshtoken:refreshtoken
    })


})

export default loginUser