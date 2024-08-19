import mongoose from "mongoose";

export const dbconnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM"
    }).then(()=>{
        console.log("database connection successful");
        
    }).catch(error=>{
        console.log(`fail to connect to database ${error}`);
        
    });
}