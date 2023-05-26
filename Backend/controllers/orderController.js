const Order= require("../models/orderModel")
const Product=require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncerror=require("../middleware/catchAsync");

exports.newOrder= catchAsyncerror(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice} =req.body;

    const order= await Order.create({
        shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice,paidAt:Date.now(),user:req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
})

exports.getOrderDetails= catchAsyncerror(async(req,res,next)=>{

    const order= await Order.findById(req.params.id).populate("user","name email")

    if(!order)
    {
        return next(new ErrorHandler("Order not found",404))
    }

    res.status(200).json({
        success:true,
        order
    })
})


exports.getMyOrderDetails= catchAsyncerror(async(req,res,next)=>{

    const orders= await Order.find({user: req.user._id});
    res.status(200).json({
        success:true,
        orders
    })
})


exports.getAllOrders= catchAsyncerror(async(req,res,next)=>{
    
    const orders= await Order.find();

    let totalPrice=0;
    orders.forEach(element => {
        totalPrice+=element.totalPrice;
    });

    res.status(200).json({
        success:true,
        orders,
        totalPrice
    })
})

exports.deleteOrder= catchAsyncerror(async(req,res,next)=>{
    console.log(4)
    const order= await Order.findById(req.params.id)
    if(!order)
    {
        return next(new ErrorHandler("Order not found",404))
    }
    await order.remove()

    res.status(200).json({
        success:true,
        
    })
})



exports.updateOrderStatus= catchAsyncerror(async(req,res,next)=>{

    const order= await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler("Order not found",404))
    }

    if(order.orderStatus === "Delivered")
    {
        return next(new ErrorHandler("Product has already been delivered",400))
    }

    order.orderItems.forEach(async(element)=>{
        await updateStock(element.product,element.quantity)
    })
    
    order.orderStatus=req.body.status;

    if(req.body.status==="Delivered")
    {
        order.deliveredAt=Date.now()
    }

    await order.save({validateBeforeSave:false})
   
    res.status(200).json({
        success:true,
        order,
    })
})

async function updateStock(id,quantity){

    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave : false}) 
}


