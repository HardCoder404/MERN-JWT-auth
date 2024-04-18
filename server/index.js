const express = require("express")
const cors = require("cors")
const routes = require("./routes/routers")
const dbconnect = require("./utils/db")
const dotenv = require("dotenv")
const app = express()
const port = process.env.PORT || 5000;


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



app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})