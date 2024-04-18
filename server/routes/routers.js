const express = require("express")
const {register,login} = require("../controllers/authControllers")
const routers = express.Router()



routers.post("/register",register)
routers.post("/login",login)

routers.get("/",(req,res)=>{
    res.send("server is ON")
})


module.exports=routers