import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength:[3, "first name conatin atleast 3 characters"] 
    },

    lastName:{
        type: String,
        required:true,
        minLength:[3, "last name conatin atleast 3 characters"] 
    },

    email:{
        type: String,
        required:true,
        validate: [validator.isEmail, "Invalid email address"]
    },
    phone:{
        type: String,
        required:true,
        minLength:[10, "Phone must be at least 10 digits"],
    },
    nic:{
        type: String,
        required:true,
        minLength:[13, "nic must be at least 13 digits"], 
        maxLength:[13, "nic must be at max 13 digits"], 
       },
       dob:{
        type: Date,
        required:true,
       },
       gender:{
        type: String,
        required:true,
        enum:["Male", "Female", "Other"]
       },
       password:{
        type: String,
        required:true,
        minLength:[8, "Password must be at least 8 characters"],
        select:false
       },
       role:{
        type: String,
        required:true,
        enum:["Admin", "Doctor", "Nurse", "Patient"]
       },
       doctorDepartment:{
        type:String
       },
       docAvatar:{
        public_id:String,
        url: String
       }
});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 8)
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES});
}

export const User = mongoose.model("User",userSchema );