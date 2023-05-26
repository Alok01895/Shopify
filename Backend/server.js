const app=require("./app")
const dotenv=require("dotenv");
const connectDatabase=require("./config/database.js")

process.on("uncaughtException",err=>{
     console.log(`Error message: ${err.message}`)
     console.log("Shutting down the server due to unnhandled exception")
     process.exit(1)

})

dotenv.config({path:"Backend/config/config.env"})
connectDatabase();

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`) 
})


process.on("unhandledRejection",err=>{
    console.log(`Error message: ${err.message}`)
    console.log("Shutting down the server due to unnhandled promise rejection")

    server.close(()=>{
        process.exit(1)
    })
});