import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    avatar:{
        type:{
            url: String,
            localPath: String ,
        } ,
        default:{
            type:{
                url: `` ,
                localPath:"https://placehold.co/200x200" ,
            }

        }
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true,
    },
    email:{
        type:String,
        required:true,          
        unique: true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        //required:true,
        required:[ true , "Password is required "],

    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    },
    refreshToken:{
        type:String,   
    },
    forgotpasswordtoken:{
        type:String,
    },
    emailverificationtoken:{
        type:Date,

    }
},{
    timestamps:true,
});

//pre hook
userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
        return next();
    
   this.password = await bcrypt.hash(this.password , 10)
    next();
})

userSchema.methods.isPasswordMatched = async function (password){
  return await bcrypt.compare(password , this.password);
};

userSchema.methods.generateAccessToken= function (){
     jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,

     }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: 'ACCESS_TOKEN_EXPIRY'}

     )
}; 
userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,

     }, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: 'REFRESH_TOKEN_EXPIRY'}

     )
};
userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomeBytes(20).toString("hex");

    const HashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  
    const TokenExpiry = Date.now() + 10 * (20 *60 * 1000); //20 minutes

    return { unHashedToken , HashedToken , TokenExpiry};
                           
}
export const User = mongoose.model('User', userSchema);
