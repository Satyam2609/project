import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,

},
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    number:{
        type:Number,
        required:true

    }, 
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    
})

userSchema.pre("save" , async function(next){

    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password)
    
}

userSchema.methods.generateAccessToken = async function() {
  return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    number:this.number

    },
    process.env.JWT_ACCESS_SECRET,

    {
        expiresIn:'1h'
        
    }

)
    
}

userSchema.methods.generateRefreshToken = async function () {

     return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    number:this.number

    },
    process.env.JWT_REFRESH_SECRET,

    {
        expiresIn:'7d'
        
    }

)

    
    
}

export const User = mongoose.model('User' ,userSchema)