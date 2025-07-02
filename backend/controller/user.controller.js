import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../modules/user.module.js";
import { uloaddcloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async(req,res) => {
    const {username , email , number , password , } = req.body
    const file = req.file


    if([username , email , number , password].some((feilds) => feilds?.trim() === '')){
        return res.status(400).json({
            success:false,
            message:"all feilds are required"
        })
    }

   let avatar = {
    public_id:"",
    url:""
   }

   if(file){
    const cloudinaryresponse = await uloaddcloudinary(file.path);
    avatar={
        public_id:cloudinaryresponse.public_id,
        url:cloudinaryresponse.secure_url
    }
   }else{
    avatar ={
        public_id:"default",
        url:"https://defaultavatar.com/avatar.png"
    }
   }

    const existingUser = await User.findOne({
        $or:[{username} , {email}]
    })

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"user is already exsist"
        })
    }

    const newuser = await User.create({
        username,
        email,
        number,
        password,
        avatar
    })
    const token = newuser.generateAccessToken()

    return res.status(201).json({
        success:true,
        message:"user register successfully",
        user:{
            _id:newuser._id,
            username:newuser.username,
            email:newuser.email,
            number:newuser.number,
            avatar:newuser.avatar


        },
        token,
    })
})

export default registerUser