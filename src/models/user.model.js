import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
export const User = mongoose.model('User', userSchema);
