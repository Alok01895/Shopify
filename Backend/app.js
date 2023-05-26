const express=require("express");
const cookieParser= require("cookie-parser")
const cors = require("cors");

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

const errorMiddleware=require("./middleware/error")

const productRoute=require("./Routes/productRoute.js")
const userRoute= require("./Routes/userRoute")
const orderRoute=require("./Routes/orderRoute")

app.use("/api/v1",productRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",orderRoute)

app.use(errorMiddleware)

module.exports= app; 