const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("./catchAsync");
const JWT= require("jsonwebtoken")
const User=require("../models/userModels");

exports.isAuthenticated= catchAsync(async (req,res,next)=>{

    const token= req.cookies.token


    if(!token)
    {
        return next(new ErrorHandler("Please login to access the resource",401))
    }

    const data = JWT.verify(token, process.env.JWT_SECRET)

    req.user= await User.findById(data.id)

    next();
    
})

exports.authorized= (...roles)=>{

    return (req,res,next)=>{ 
        
        if(!roles.includes(req.user.role))
        {
            return next(new ErrorHandler(`Role: ${req.user.role} are not allowed to access this resource.`,403))
        }
        next();
    }
}