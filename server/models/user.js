const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const userModels = mongoose.model("usermodels",userSchema)
module.exports=userModels