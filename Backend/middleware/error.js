const ErrorHandler=require("../utils/errorHandler")


module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message= err.message || "Internal server error"


    if(err.name=== "CastError")
    {
        const message=`Resource not found. Invalid: ${err.path}`
        err=new ErrorHandler(message,400)
    }

    if(err.code===11000)
    {
        const message=`This ${Object.keys(err.keyValue)} already exists`
        err=new ErrorHandler(message,400)
    }

    if(err.name=== "JsonWebTokenError")
    {
        const message="Json web token is invalid. Try again!.."
        err=new ErrorHandler(message,400)
    }
    if(err.name=== "TokenExpiredError")
    {
        const message="Json web token has expired. Try again!.."
        err=new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        error:err.message
    })
}