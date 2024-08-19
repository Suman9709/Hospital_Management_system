import mongoose from "mongoose";
import validator from "validator";


const messageSchema = new mongoose.Schema({
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
    message:{
        type: String,
        required:true,
        minLength:[5, "Message must be at least 5 characters"], 
       },
});

export const Message = mongoose.model("Message",messageSchema );