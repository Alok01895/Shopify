const User=require("../models/userModels");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncerror=require("../middleware/catchAsync");
const sendToken=require("../utils/jwtToken")
const sendEmail=require("../utils/sendEmail.js")

 exports.registerUser= catchAsyncerror(async (req,res,next)=>{

    const {name,email,password}= req.body;

    const user= await User.create({
        name , email , password,
        avatar:{
            public_id:"This is a  sample id",
            url:"Sample url"
        }
    })

    sendToken(user,201,res); 
   


 })



 exports.loginUser=catchAsyncerror(async (req,res,next)=>{


    const {email,password}=req.body
  
    if(!email || !password)
    {
        return next(new ErrorHandler("Please enter email & password!..",400))
    }

    const user=await User.findOne({email}).select("+password")

    if(!user)
    {
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const matchedPassword=  user.comparePassword(password);
    if(!matchedPassword)
    {
        return next(new ErrorHandler("Invalid email or password",401))
    }
    sendToken(user,200,res);
    
 })

 exports.logout= catchAsyncerror(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })

 })


 exports.forgotPassword= catchAsyncerror(async(req,res,next)=>{
    
    const user=await User.findOne({email:req.body.email}) 

    if(!user)
    {
        return next(new ErrorHandler("User not found",404))
    }

    const resetToken=user.getResetPassword()

    await user.save({ validateBeforeSave:false })
    const resetUrl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message=`Your reset password link is:- \n\n ${resetUrl} \n\n If you have not requested then kindly ignore it.`;
   

    try{
        await sendEmail({
            email:user.email,
            subject:"Ecommerce password reset",
            message,
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully` 
        })
    }
    catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({ validateBeforeSave:false });

        return next(new ErrorHandler(error.message,500))
    }
   
 })

 exports.resetPassword= catchAsyncerror(async(req,res,next)=>{
        
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })

    if(!user)
    {
        return next(new ErrorHandler("Reset password token is invalid or it has been expired.",400))
    }

    if(req.body.password !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password does not match",400))
    }

    user.password=req.body.password

    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    user.save();

    sendToken(user,200,res)
 })

 exports.getuserDetails= catchAsyncerror(async (req,res,next)=>{

     const user=await User.findById(req.user.id)

     res.status(200).json({
        success:true,
        user
     })
 })

 exports.updatepassword= catchAsyncerror(async (req,res,next)=>{

     const user=await User.findById(req.user.id).select("+password")

     const matchedPassword=  user.comparePassword(req.body.oldPassword);
     if(!matchedPassword)
     {
         return next(new ErrorHandler("Old Password is incorrect",400))
     }

     if(req.body.newPassword !== req.body.confirmPassword)
     {
        return next(new ErrorHandler("Password did not match",400))
     }

     user.password=req.body.password;

     user.save()

     sendToken(user,200,res)
 })


 exports.updateProfile= catchAsyncerror(async (req,res,next)=>{

    
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user
    })
})

exports.getAllUsers=catchAsyncerror(async(req,res,next)=>{

    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    })

})


exports.getUserByAdmin=catchAsyncerror(async(req,res,next)=>{

    const user=await User.findById(req.params.id);

    if(!user)
    {
        return next(new ErrorHandler(`No user exist with id: ${req.params.id}`,400))
    }

    res.status(200).json({
        success:true,
        user
    })

})



exports.updateUserRole= catchAsyncerror(async (req,res,next)=>{

    
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user
    })
})


exports.DeleteUser= catchAsyncerror(async (req,res,next)=>{

    
   const user= await User.findById(req.params.id)

   if(!user)
    {
        return next(new ErrorHandler(`No user exist with id: ${req.params.id}`,400))
    }

    await user.remove()

    res.status(200).json({
        success:true,
        message:"User deleted Successfully"
    })
})