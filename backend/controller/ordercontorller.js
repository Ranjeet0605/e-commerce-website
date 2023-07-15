const catchAsyncError = require("../middleware/catchAsyncError");
const orderSchema = require("../models/ordermodels")
const productSchema = require("../models/productmodel");
const { ErrorHandler } = require("../utils/userhandling");


// create new order
exports.newOrder = catchAsyncError(async(req,res)=>{
    const {
        shippingInfo,
        orderInfo,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    const order = await orderSchema.create({
        shippingInfo, orderInfo,paymentInfo,
        itemPrice,taxPrice,shippingPrice,
         totalPrice, 
         paidAt: Date.now(),
         user:req.user._id,
    });
res.status(200).json({
    success: true,
    order
})
})
// get single order
 exports.getsingleorder = catchAsyncError(async(req,res,next)=>{
    const order = await orderSchema.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if(!order){
        return next(new ErrorHandler(`Order not found with this id`,404))
    }
    res.status(200).json({
        success:true,
        order,
    });
 })

 //get logged in user orders
  exports.myOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await orderSchema.find({user: req.user._id});
   if(!orders){
    return next(new ErrorHandler(`oreders can't get`),404)
   }
    res.status(200).json({
        success:true,
        orders
    })
  })

  // getall orders --admin
  exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await orderSchema.find();
   if(!orders){
    return next(new ErrorHandler(`orders are not found`,404))
   }
   
    let totalAmount = 0;
  orders.forEach((order)=>{
    totalAmount+=order.totalPrice
  })
  res.status(200).json({
    success:true,
    totalAmount,                                                                                                                                                                                                                                                                                                                                                                                                                                     
    orders,
  })
  })

  // update order status --admin

  exports.updateOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await orderSchema.findById(req.params.id);
   if(!orders){
    return next(new ErrorHandler(`orders are not found`,404))
   }
   orders.orderInfo.forEach(async(order)=>{
    await updateStock(orders.Product, orders.quantity);
   })
   orders.orderSatus = req.body.status;
   if(req.body.status=== "delivered"){
    orders.deliveredAt = Date.now();
   }
   await orders.save({validateforSave:false})
  res.status(200).json({
    success:true,
  })
  })
  async function updateStock(id, quantity){
    const product = await productSchema.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave: false});
  }

  // delete orders-- admin
  exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const orders = await orderSchema.findById(req.params.id);
   if(!orders){
    return next(new ErrorHandler(`oreders can't found width this id`),404)
   }
   await orders.remove()
    res.status(200).json({
        success:true,

    })
  })