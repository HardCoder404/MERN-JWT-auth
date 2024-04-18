const mongoose = require("mongoose")

const dbconnect = async ()=>{
    try {
        mongoose.connect(process.env.DB_CONNECT)
    } catch (error) {   
    }
}



module.exports=dbconnect