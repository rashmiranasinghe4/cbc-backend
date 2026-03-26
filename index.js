import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"

import userRouter from "./routers/userRouters.js"
import jwt from "jsonwebtoken"
import productRouter from "./routers/productRouters.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()


app.use(bodyParser.json())
app.use(cors()) 

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value != null){
            const token = value.replace("Bearer ","")
            jwt.verify(
                token,
                "cbc-6503",
                (err,decoded)=>{
                    if(decoded == null){
                        res.status(403).json({
                            message : "Unauthorized"
                        })
                    }else{
                        req.user = decoded
                        next()
                    }                    
                }
            )
        }else{
            next()
        }        
    }                                       
)






let connectionString = "mongodb+srv://admin:1104@cluster0.kiwcsok.mongodb.net/?appName=Cluster0"


 


mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to database")
    }
).catch(
    ()=>{
        console.log("Failed to connect to the database")
    }
)




app.use("/users", userRouter)

app.use("/api/users", userRouter)
app.use("/api/products",productRouter)



app.listen(5000, 
   ()=>{
       console.log("server started")
   }                                                                                   
)                                                                                                             
