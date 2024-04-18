const express = require("express")
const cors = require("cors")
const routes = require("./routes/routers")
const dbconnect = require("./utils/db")
const dotenv = require("dotenv")
const app = express()


dotenv.config()
dbconnect()

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: ["set-cookie"]
};

// middleware 
app.use(express.json())
app.use(cors(corsOptions))
app.use("/api",routes)



app.listen(process.env.PORT,()=>{
    console.log("server is running");
})