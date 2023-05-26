 const Product=require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncerror=require("../middleware/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");

 exports.createProduct =catchAsyncerror(async (req,res,next)=>{

    req.body.user=req.user.id;

    const product=await Product.create(req.body)

    res.status(201).json({ 
       success:true,
       product
    })
});
 
 exports.getAllProducts = catchAsyncerror(async(req,res)=>{
    // return next(new ErrorHandler(" error which i made",500))
    const modelsPerPage=8;
    const productCount= await Product.countDocuments()
    const apifeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(modelsPerPage)
    const products=await apifeature.query

    if(!products)
    {
        return next(new ErrorHandler("No product found",404));
    }


     res.status(200).json(
        {
            success:true,
            products,
            productCount
        }
     )
 });

 exports.getProductDetails=catchAsyncerror(async (req,res,next)=>{

    let product = await Product.findById(req.params.id)
    const productCount= await Product.countDocuments()

    if(!product)
    {
        return next(new ErrorHandler("No product found",404));
    }

    res.status(200).json({
        success:true,
        product,
        productCount
    })
 });


 exports.updateProduct=catchAsyncerror(async(req,res,next)=>{

    let product=await Product.findById(req.params.id)

    if(!product)
    {
        return next(new ErrorHandler("No product found",404));
    }

    product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});

    res.status(200).json({
        success:true,
        product
    })
 });


 exports.deleteProduct=catchAsyncerror(async(req,res,next)=>{

    let product =await Product.findById(req.params.id)

    if(!product)
    {
        return next(new ErrorHandler("No product found",404));
    }

    await product.remove()

    res.status(200).json({
        success:true,
         message:"Product has been deleted succesfully"
    })
 })

 

 exports.productReview= catchAsyncerror(async(req,res,next)=>{

    const {rating,comment,productId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product= await Product.findById(productId)

    const isReviewed= product.reviews.find(element=> element.user.toString()===req.user._id.toString())
    if(isReviewed)
    {
        product.reviews.forEach(element=>{
            if(element.user.toString()===req.user._id.toString())
            {
                element.rating=rating;
                element.comment=comment
            }
        })

    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length
    }

    let avg =0;
    product.reviews.forEach(element=>{
        avg += element.rating
    })
    product.ratings= avg/product.reviews.length

    await product.save({validateBeforeSave:false})
    console.log(req.user)
    res.status(200).json({
        success:true
    })
 })

 exports.getProductReviews=catchAsyncerror(async(req,res,next)=>{

    const product=await Product.findById(req.query.id)

    if(!product)
    {
        return next(new ErrorHandler("No product found",404))
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
 })


exports.deleteProductReview=catchAsyncerror(async(req,res,next)=>{

    const product=await Product.findById(req.query.productId);

    if(!product)
    {
        return next(new ErrorHandler("No product found",404));
    }

    const reviews= product.reviews.filter((element)=> element._id.toString() !== req.query.id.toString());

    let avg =0;
    reviews.forEach((element)=>{
        avg += element.rating
    })
    let ratings;
    if(reviews.length==0)
    {
        ratings=0
    }
    else{
         ratings = avg/reviews.length
    }
    
    const numOfReviews=reviews.length
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
     
    res.status(200).json({
        success:true,
    })
 })

  